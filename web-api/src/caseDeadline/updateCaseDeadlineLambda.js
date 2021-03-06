const { genericHandler } = require('../genericHandler');

/**
 * update case deadline
 *
 * @param {object} event the AWS event object
 * @returns {Promise<*|undefined>} the api gateway response object containing the statusCode, body, and headers
 */
exports.handler = event =>
  genericHandler(event, async ({ applicationContext }) => {
    return await applicationContext.getUseCases().updateCaseDeadlineInteractor({
      ...JSON.parse(event.body),
      applicationContext,
    });
  });
