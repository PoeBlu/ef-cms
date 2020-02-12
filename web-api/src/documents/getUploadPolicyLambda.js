const createApplicationContext = require('../applicationContext');
const {
  getUserFromAuthHeader,
  handle,
} = require('../middleware/apiGatewayHelper');

/**
 * used for getting the upload policy which is needed for users to upload directly to S3 via the UI
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
          .getUploadPolicyInteractor({
            applicationContext,
            documentId: event.pathParameters.documentId,
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
