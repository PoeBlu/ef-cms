const createApplicationContext = require('../applicationContext');
const {
  getUserFromAuthHeader,
  handle,
} = require('../middleware/apiGatewayHelper');

/**
 * generate the printable pending report and return url
 *
 * @param {object} event the AWS event object
 * @returns {Promise<*|undefined>} the api gateway response object containing the statusCode, body, and headers
 */
exports.handler = event => {
  const user = getUserFromAuthHeader(event);
  const applicationContext = createApplicationContext(user);
  return handle(
    event,
    async () => {
      try {
        const results = await applicationContext
          .getUseCases()
          .generatePrintablePendingReportInteractor({
            applicationContext,
            ...event.queryStringParameters,
          });
        applicationContext.logger.info('User', user);
        applicationContext.logger.info('Results', results);
        return results;
      } catch (e) {
        applicationContext.logger.error(e);
        throw e;
      }
    },
    applicationContext,
  );
};
