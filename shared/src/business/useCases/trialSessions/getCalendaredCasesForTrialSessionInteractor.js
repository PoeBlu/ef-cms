const {
  isAuthorized,
  ROLE_PERMISSIONS,
} = require('../../../authorization/authorizationClientService');
const { Case } = require('../../entities/cases/Case');
const { UnauthorizedError } = require('../../../errors/errors');

/**
 * getCalendaredCasesForTrialSessionInteractor
 *
 * @param {object} providers the providers object
 * @param {object} providers.applicationContext the application context
 * @param {string} providers.trialSessionId the id of the trial session to get the calendared cases
 * @returns {Promise} the promise of the getCalendaredCasesForTrialSession call
 */
exports.getCalendaredCasesForTrialSessionInteractor = async ({
  applicationContext,
  trialSessionId,
}) => {
  const user = applicationContext.getCurrentUser();
  if (!isAuthorized(user, ROLE_PERMISSIONS.TRIAL_SESSIONS)) {
    throw new UnauthorizedError('Unauthorized');
  }

  const judgeUser = await applicationContext
    .getUseCases()
    .getJudgeForUserChambersInteractor({ applicationContext, user });

  // any user with permission can fetch the calendared cases, but a judge
  // userId is required for case notes.
  const userId = judgeUser ? judgeUser.userId : user.userId;

  const casesWithNotes = await applicationContext
    .getPersistenceGateway()
    .getCalendaredCasesForTrialSession({
      applicationContext,
      trialSessionId,
      userId,
    });

  return casesWithNotes.map(caseWithAdditionalProperties => {
    // TODO: revisit this approach.  I think our persistence layer is returning more than it should?
    const {
      disposition,
      isManuallyAdded,
      notes,
      removedFromTrial,
      removedFromTrialDate,
    } = caseWithAdditionalProperties;

    return {
      ...new Case(caseWithAdditionalProperties, { applicationContext })
        .validate()
        .toRawObject(),
      disposition,
      isManuallyAdded,
      notes,
      removedFromTrial,
      removedFromTrialDate,
    };
  });
};
