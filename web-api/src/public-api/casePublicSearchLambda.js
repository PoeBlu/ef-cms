const createApplicationContext = require('../applicationContext');
const { handle } = require('../middleware/apiGatewayHelper');

/**
 * used for fetching cases matching the given name, country, state, and/or year filed range for the general public
 *
 * @param {object} event the AWS event object
 * @returns {Promise<*|undefined>} the api gateway response object containing the statusCode, body, and headers
 */
exports.handler = event => {
  const applicationContext = createApplicationContext({});
  return handle(
    event,
    async () => {
      try {
        const results = await applicationContext
          .getUseCases()
          .casePublicSearchInteractor({
            applicationContext,
            ...event.queryStringParameters,
          });
        applicationContext.logger.info('User', 'Public User');
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
