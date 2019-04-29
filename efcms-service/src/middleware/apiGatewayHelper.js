const jwt = require('jsonwebtoken');
const {
  UnauthorizedError,
  NotFoundError,
} = require('../../../shared/src/errors/errors');

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Cache-Control': 'max-age=0, private, no-cache, no-store, must-revalidate',
  'Content-Type': 'application/json',
  Pragma: 'no-cache',
  'X-Content-Type-Options': 'nosniff',
};

exports.headers = headers;

/**
 * invokes the param fun and returns a lambda specific object containing error messages and status codes depending on any caught exceptions (or none)
 *
 * @param {Function} event the api gateway event
 * @param {Function} fun an function which either returns a promise containing payload data, or throws an exception
 * @returns {Object} the api gateway response object containing the statusCode, body, and headers
 */
exports.handle = async (event, fun) => {
  if (event.source === 'serverless-plugin-warmup') {
    return exports.sendOk('Lambda is warm!');
  }
  try {
    const response = await fun();
    return exports.sendOk(response);
  } catch (err) {
    console.error('err', err);
    if (err instanceof NotFoundError) {
      err.statusCode = 404;
      return exports.sendError(err);
    } else if (err instanceof UnauthorizedError) {
      err.statusCode = 403;
      return exports.sendError(err);
    } else {
      return exports.sendError(err);
    }
  }
};

/**
 * @param {Function} event the api gateway event
 * @param {Function} fun an async function which returns an object containing a url property to redirect the user to
 * @param {number} statusCode the statusCode to return in the api gateway response object (deaults to 302)
 * @returns {Object} the api gateway response object with the Location set to the url returned from fun
 */
exports.redirect = async (event, fun, statusCode = 302) => {
  if (event.source === 'serverless-plugin-warmup') {
    return exports.sendOk('Lambda is warm!');
  }
  try {
    const { url } = await fun();
    return {
      headers: {
        Location: url,
      },
      statusCode,
    };
  } catch (err) {
    return exports.sendError(err);
  }
};

/**
 * creates and returns a 400 status lambda api gateway object containing the error message
 *
 * @param {Error} err the error to convert to the api gateway response event
 * @returns {Object} an api gateway response object
 */
exports.sendError = err => {
  return {
    body: JSON.stringify(err.message),
    headers,
    statusCode: err.statusCode || '400',
  };
};

/**
 * returns a lambda api-gateway object with a 400 status code and the response payload passed in
 *
 * @param {Object} response the object to send back from the api
 * @param {number} statusCode the statusCode of the request
 * @returns {Object} an api gateway response object
 */
exports.sendOk = (response, statusCode = '200') => {
  return {
    body: JSON.stringify(response),
    headers,
    statusCode,
  };
};

/**
 * Extracts and validates the auth header from the api-gateway event's header or query string.
 *
 * This assumes the auth header is formatted with either:
 *  - Authorization: "Bearer SOME_TOKEN"
 *  - authorization: "Bearer SOME_TOKEN"
 *  - http://example.com?token=SOME_TOKEN
 *
 * @param {Object} event the API gateway request event with would contain headers, params, or query string, etc.
 * @returns {string} the token found in either the header or ?token query string
 */
exports.getAuthHeader = event => {
  let usernameTokenArray;
  const authorizationHeader =
    event.headers &&
    (event.headers.Authorization || event.headers.authorization);
  if ((event.queryStringParameters || {}).token) {
    return (event.queryStringParameters || {}).token;
  }
  if (authorizationHeader) {
    usernameTokenArray = authorizationHeader.split(' ');
    if (!usernameTokenArray || !usernameTokenArray[1]) {
      throw new UnauthorizedError(
        'Error: Authorization Bearer token is required',
      ); //temp until actual auth is added
    }
  } else {
    throw new UnauthorizedError('Error: Authorization is required'); //temp until actual auth is added
  }

  return usernameTokenArray[1];
};

/**
 * extracts and decodes the JWT token from the gateway response event's header / query string and returns the decoded user object
 *
 * @param {Object} event the api gateway request event
 * @returns {Object} the user decoded from the JWT token
 */
exports.getUserFromAuthHeader = event => {
  const token = exports.getAuthHeader(event);
  const decoded = jwt.decode(token);
  if (decoded) {
    decoded.token = token;
    decoded.role = decoded['custom:role'];
    decoded.userId = decoded.sub;
    return decoded;
  } else {
    return null;
  }
};
