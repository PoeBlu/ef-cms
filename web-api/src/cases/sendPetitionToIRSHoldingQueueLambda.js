const createApplicationContext = require('../applicationContext');
const {
  getUserFromAuthHeader,
  handle,
} = require('../middleware/apiGatewayHelper');

/**
 * used for sending the case to the irs
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
          .sendPetitionToIRSHoldingQueueInteractor({
            applicationContext,
            caseId: event.pathParameters.caseId,
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
