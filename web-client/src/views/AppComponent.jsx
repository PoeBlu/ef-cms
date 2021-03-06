import { AddDocketEntry } from './AddDocketEntry/AddDocketEntry';
import { AddTrialSession } from './TrialSessions/AddTrialSession';
import { AdvancedSearch } from './AdvancedSearch/AdvancedSearch';
import { BatchDownloadProgress } from './TrialSessionWorkingCopy/BatchDownloadProgress';
import { BeforeStartingCase } from './BeforeStartingCase';
import { BeforeYouFileADocument } from './FileDocument/BeforeYouFileADocument';
import { BlockedCasesReport } from './BlockedCasesReport/BlockedCasesReport';
import { CaseDeadlines } from './CaseDeadlines/CaseDeadlines';
import { CaseDetail } from './CaseDetail/CaseDetail';
import { CaseDetailInternal } from './CaseDetail/CaseDetailInternal';
import { CaseSearchNoMatches } from './CaseSearchNoMatches';
import { CourtIssuedDocketEntry } from './CourtIssuedDocketEntry/CourtIssuedDocketEntry';
import { CreateOrder } from './CreateOrder/CreateOrder';
import { DashboardChambers } from './Dashboards/DashboardChambers';
import { DashboardJudge } from './Dashboards/DashboardJudge';
import { DashboardPetitioner } from './Dashboards/DashboardPetitioner';
import { DashboardPractitioner } from './Dashboards/DashboardPractitioner';
import { DashboardRespondent } from './Dashboards/DashboardRespondent';
import { DocumentDetail } from './DocumentDetail/DocumentDetail';
import { EditDocketEntry } from './EditDocketEntry/EditDocketEntry';
import { EditDocketEntryMeta } from './EditDocketEntry/EditDocketEntryMeta';
import { EditPetitionDetails } from './CaseDetail/EditPetitionDetails';
import { EditPetitionerInformation } from './CaseDetail/EditPetitionerInformation';
import { EditTrialSession } from './TrialSessions/EditTrialSession';
import { EditUploadCourtIssuedDocument } from './EditUploadCourtIssuedDocument/EditUploadCourtIssuedDocument';
import { Error } from './Error';
import { FileCompressionErrorModal } from './TrialSessionWorkingCopy/FileCompressionErrorModal';
import { FileDocumentWizard } from './FileDocument/FileDocumentWizard';
import { Footer } from './Footer';
import { Header } from './Header/Header';
import { IdleLogout } from './IdleLogout';
import { Interstitial } from './Interstitial';
import { Loading } from './Loading';
import { LogIn } from './LogIn';
import { Messages } from './Messages/Messages';
import { OrdersNeededSummary } from './CaseDetailEdit/OrdersNeededSummary';
import { PendingReport } from './PendingReport/PendingReport';
import { PrimaryContactEdit } from './PrimaryContactEdit';
import { PrintPreview } from './CourtIssuedDocketEntry/PrintPreview';
import { PrintableDocketRecord } from './DocketRecord/PrintableDocketRecord';
import { PrintableTrialCalendar } from './TrialSessionDetail/PrintableTrialCalendar';
import { RequestAccessWizard } from './RequestAccess/RequestAccessWizard';
import { ReviewPetitionFromPaper } from './StartCaseInternal/ReviewPetitionFromPaper';
import { ReviewSavedPetition } from './CaseDetailEdit/ReviewSavedPetition';
import { SecondaryContactEdit } from './SecondaryContactEdit';
import { SelectDocumentType } from './FileDocument/SelectDocumentType';
import { SignOrder } from './SignOrder';
import { SignStipDecision } from './SignStipDecision';
import { SimplePdfPreviewPage } from './PendingReport/SimplePdfPreviewPage';
import { StartCaseInternal } from './StartCaseInternal/StartCaseInternal';
import { StartCaseWizard } from './StartCase/StartCaseWizard';
import { StyleGuide } from './StyleGuide/StyleGuide';
import { TrialSessionDetail } from './TrialSessionDetail/TrialSessionDetail';
import { TrialSessionPlanningModal } from './TrialSessionPlanningModal';
import { TrialSessionPlanningReport } from './TrialSessions/TrialSessionPlanningReport';
import { TrialSessionWorkingCopy } from './TrialSessionWorkingCopy/TrialSessionWorkingCopy';
import { TrialSessions } from './TrialSessions/TrialSessions';
import { UploadCourtIssuedDocument } from './UploadCourtIssuedDocument/UploadCourtIssuedDocument';
import { UsaBanner } from './UsaBanner';
import { UserContactEdit } from './UserContactEdit';
import { connect } from '@cerebral/react';
import { state } from 'cerebral';
import React, { useEffect } from 'react';

const pages = {
  AddDocketEntry,
  AddTrialSession,
  AdvancedSearch,
  BeforeStartingCase,
  BeforeYouFileADocument,
  BlockedCasesReport,
  CaseDeadlines,
  CaseDetail,
  CaseDetailInternal,
  CaseSearchNoMatches,
  CourtIssuedDocketEntry,
  CreateOrder,
  DashboardChambers,
  DashboardJudge,
  DashboardPetitioner,
  DashboardPractitioner,
  DashboardRespondent,
  DocumentDetail,
  EditDocketEntry,
  EditDocketEntryMeta,
  EditPetitionDetails,
  EditPetitionerInformation,
  EditTrialSession,
  EditUploadCourtIssuedDocument,
  Error,
  FileDocumentWizard,
  IdleLogout,
  Interstitial,
  Loading,
  LogIn,
  Messages,
  OrdersNeededSummary,
  PendingReport,
  PrimaryContactEdit,
  PrintPreview,
  PrintableDocketRecord,
  PrintableTrialCalendar,
  RequestAccessWizard,
  ReviewPetitionFromPaper,
  ReviewSavedPetition,
  SecondaryContactEdit,
  SelectDocumentType,
  SignOrder,
  SignStipDecision,
  SimplePdfPreviewPage,
  StartCaseInternal,
  StartCaseWizard,
  StyleGuide,
  TrialSessionDetail,
  TrialSessionPlanningReport,
  TrialSessionWorkingCopy,
  TrialSessions,
  UploadCourtIssuedDocument,
  UserContactEdit,
};

/**
 * Root application component
 */
export const AppComponent = connect(
  {
    currentPage: state.currentPage,
    currentPageHeader: state.currentPageHeader,
    showModal: state.showModal,
    zipInProgress: state.batchDownloads.zipInProgress,
  },
  ({ currentPage, showModal, zipInProgress }) => {
    const focusMain = e => {
      e && e.preventDefault();
      const header = document.querySelector('#main-content h1');
      if (header) header.focus();
      return false;
    };

    useEffect(() => {
      focusMain();
    });

    const CurrentPage = pages[currentPage];
    return (
      <>
        <a
          className="usa-skipnav"
          href="#main-content"
          tabIndex="0"
          onClick={focusMain}
        >
          Skip to main content
        </a>
        <UsaBanner />
        <Header />
        <main id="main-content" role="main">
          <CurrentPage />
          {zipInProgress && <BatchDownloadProgress />}
        </main>
        <Footer />
        <Loading />
        {showModal === 'TrialSessionPlanningModal' && (
          <TrialSessionPlanningModal />
        )}
        {showModal === 'FileCompressionErrorModal' && (
          <FileCompressionErrorModal />
        )}
      </>
    );
  },
);
