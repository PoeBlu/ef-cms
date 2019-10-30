import { clearScreenMetadataAction } from '../actions/clearScreenMetadataAction';
import { closeMobileMenuAction } from '../actions/closeMobileMenuAction';
import { getCaseAction } from '../actions/getCaseAction';
import { getCaseAssociationAction } from '../actions/getCaseAssociationAction';
import { getCaseDeadlinesForCaseAction } from '../actions/CaseDeadline/getCaseDeadlinesForCaseAction';
import { getCaseNoteForCaseAction } from '../actions/TrialSession/getCaseNoteForCaseAction';
import { runPathForUserRoleAction } from '../actions/runPathForUserRoleAction';
import { setBaseUrlAction } from '../actions/setBaseUrlAction';
import { setCaseAction } from '../actions/setCaseAction';
import { setCaseAssociationAction } from '../actions/setCaseAssociationAction';
import { setCaseNoteOnCaseDetailAction } from '../actions/TrialSession/setCaseNoteOnCaseDetailAction';
import { setCurrentPageAction } from '../actions/setCurrentPageAction';
import { setDefaultCaseDetailTabAction } from '../actions/setDefaultCaseDetailTabAction';
import { setDefaultDocketRecordSortAction } from '../actions/DocketRecord/setDefaultDocketRecordSortAction';
import { setDocumentEditEntryPointAction } from '../actions/setDocumentEditEntryPointAction';
import { takePathForRoles } from './takePathForRoles';

const gotoCaseDetailInternal = [setCurrentPageAction('CaseDetailInternal')];
const gotoCaseDetailExternal = [
  getCaseAssociationAction,
  setCaseAssociationAction,
  setCurrentPageAction('CaseDetail'),
];

const gotoCaseDetailInternalWithNotes = [
  getCaseNoteForCaseAction,
  setCaseNoteOnCaseDetailAction,
  ...gotoCaseDetailInternal,
];

export const gotoCaseDetailSequence = [
  setCurrentPageAction('Interstitial'),
  clearScreenMetadataAction,
  closeMobileMenuAction,
  setDefaultCaseDetailTabAction,
  getCaseAction,
  setCaseAction,
  getCaseDeadlinesForCaseAction,
  setDefaultDocketRecordSortAction,
  setBaseUrlAction,
  setDocumentEditEntryPointAction,
  runPathForUserRoleAction,
  {
    ...takePathForRoles(
      [
        'adc',
        'admissionsclerk',
        'calendarclerk',
        'clerkofcourt',
        'docketclerk',
        'petitionsclerk',
        'trialclerk',
      ],
      gotoCaseDetailInternal,
    ),
    ...takePathForRoles(
      ['petitioner', 'practitioner', 'respondent'],
      gotoCaseDetailExternal,
    ),
    chambers: gotoCaseDetailInternalWithNotes,
    judge: gotoCaseDetailInternalWithNotes,
  },
];
