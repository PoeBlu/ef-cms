const { post } = require('../requests');

/**
 * associatePractitionerWithCaseInteractorProxy
 *
 * @param applicationContext
 * @param associatePractitionerWithCase
 * @returns {Promise<*>}
 */
exports.associatePractitionerWithCaseInteractor = ({
  applicationContext,
  caseId,
  userId,
}) => {
  return post({
    applicationContext,
    body: { caseId, userId },
    endpoint: `/cases/${caseId}/associate-practitioner`,
  });
};