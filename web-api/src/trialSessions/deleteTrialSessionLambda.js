const createApplicationContext = require('../applicationContext');
const {
  getUserFromAuthHeader,
  handle,
} = require('../middleware/apiGatewayHelper');

/**
 * deletes a trial session and all associated working session copies and puts any attached cases back to general docket.
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
        const { trialSessionId } = event.pathParameters || {};
        const results = await applicationContext
          .getUseCases()
          .deleteTrialSessionInteractor({
            applicationContext,
            trialSessionId,
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
