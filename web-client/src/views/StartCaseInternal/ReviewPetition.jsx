import { AddressDisplay } from '../CaseDetail/PetitionerInformation';
import { Button } from '../../ustc-ui/Button/Button';
import { CaseDifferenceModalOverlay } from '../StartCase/CaseDifferenceModalOverlay';
import { ConfirmServeToIrsModal } from './ConfirmServeToIrsModal';
import { FileUploadErrorModal } from '../FileUploadErrorModal';
import { FileUploadStatusModal } from '../FileUploadStatusModal';
import { Focus } from '../../ustc-ui/Focus/Focus';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormCancelModalDialog } from '../FormCancelModalDialog';
import { OrdersNeededSummary } from './OrdersNeededSummary';
import { PDFPreviewButton } from '../PDFPreviewButton';
import { connect } from '@cerebral/react';
import { sequences, state } from 'cerebral';
import React from 'react';

export const ReviewPetition = connect(
  {
    constants: state.constants,
    form: state.form,
    formCancelToggleCancelSequence: sequences.formCancelToggleCancelSequence,
    goBackToStartCaseInternalSequence:
      sequences.goBackToStartCaseInternalSequence,
    openConfirmServeToIrsModalSequence:
      sequences.openConfirmServeToIrsModalSequence,
    reviewPetitionHelper: state.reviewPetitionHelper,
    serveToIrsSequence: sequences.serveToIrsSequence,
    showModal: state.showModal,
    startCaseHelper: state.startCaseHelper,
  },
  ({
    constants,
    form,
    formCancelToggleCancelSequence,
    goBackToStartCaseInternalSequence,
    openConfirmServeToIrsModalSequence,
    reviewPetitionHelper,
    serveToIrsSequence,
    showModal,
    startCaseHelper,
  }) => {
    return (
      <>
        <section
          className="usa-section grid-container"
          id="ustc-start-a-case-form"
        >
          <Focus>
            <h2 id="file-a-document-header" tabIndex="-1">
              Review The Petition
            </h2>
          </Focus>

          <OrdersNeededSummary data={form} />

          <div className="grid-container padding-x-0 create-case-review">
            <div className="grid-row grid-gap">
              <div className="tablet:grid-col-7 margin-bottom-4">
                <div className="card height-full margin-bottom-0">
                  <div className="content-wrapper">
                    <h3 className="underlined">Parties</h3>
                    <div className="grid-row grid-gap">
                      <div className="tablet:grid-col-4 margin-bottom-1">
                        <label
                          className="usa-label usa-label-display"
                          htmlFor="filing-parties"
                        >
                          Party type
                        </label>
                        {form.partyType}
                      </div>
                      <div className="tablet:grid-col-4 margin-bottom-1">
                        <label
                          className="usa-label usa-label-display"
                          htmlFor="filing-contact-primary"
                        >
                          Petitioner’s contact information
                        </label>
                        {form.contactPrimary && (
                          <address aria-labelledby="primary-label">
                            {AddressDisplay(form.contactPrimary, constants, {
                              nameOverride:
                                startCaseHelper.showCaseNameForPrimary &&
                                startCaseHelper.caseName,
                            })}
                          </address>
                        )}
                      </div>
                      <div className="tablet:grid-col-4 margin-bottom-1">
                        {startCaseHelper.hasContactSecondary && (
                          <>
                            <label
                              className="usa-label usa-label-display"
                              htmlFor="filing-contact-secondary"
                            >
                              Spouse’s contact information
                            </label>
                            {AddressDisplay(form.contactSecondary, constants)}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="tablet:grid-col-5 margin-bottom-4">
                <div className="card height-full margin-bottom-0">
                  <div className="content-wrapper">
                    <h3 className="underlined">Case Information</h3>
                    <div className="grid-row grid-gap">
                      <div className="tablet:grid-col-6 margin-bottom-05">
                        <div className="margin-top-3 margin-bottom-2">
                          <label
                            className="usa-label usa-label-display"
                            htmlFor="filing-type"
                          >
                            Date recieved
                          </label>
                          {reviewPetitionHelper.receivedAtFormatted}
                        </div>
                        <div className="margin-top-3 margin-bottom-2">
                          <label
                            className="usa-label usa-label-display"
                            htmlFor="filing-type"
                          >
                            Case caption
                          </label>
                          {form.caseCaption}
                        </div>
                        <div className="margin-top-3 margin-bottom-2">
                          <label
                            className="usa-label usa-label-display"
                            htmlFor="filing-location"
                          >
                            Requested trial location
                          </label>
                          {form.preferredTrialCity}
                        </div>
                      </div>
                      <div className="tablet:grid-col-6 margin-bottom-1">
                        <div className="margin-top-3 margin-bottom-2">
                          <label
                            className="usa-label usa-label-display"
                            htmlFor="filing-location"
                          >
                            Mailing date
                          </label>
                          {reviewPetitionHelper.mailingDateFormatted}
                        </div>

                        <div className="margin-top-3 margin-bottom-2">
                          <label
                            className="usa-label usa-label-display"
                            htmlFor="filing-procedure"
                          >
                            Case procedure
                          </label>
                          {form.procedureType}
                        </div>

                        <div className="margin-top-3 margin-bottom-2">
                          <label
                            className="usa-label usa-label-display"
                            htmlFor="filing-location"
                          >
                            Filing fee
                          </label>
                          {reviewPetitionHelper.petitionPaymentStatusFormatted}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid-container padding-x-0 create-case-review">
            <div className="grid-row grid-gap">
              <div className="tablet:grid-col-7 margin-bottom-4">
                <div className="card height-full margin-bottom-0">
                  <div className="content-wrapper">
                    <h3 className="underlined">IRS Notice</h3>
                    <div className="grid-row grid-gap">
                      <div className="tablet:grid-col-4 margin-bottom-1">
                        <div>
                          <label
                            className="usa-label usa-label-display"
                            htmlFor="filing-type"
                          >
                            Notice attached to petition?
                          </label>
                          {reviewPetitionHelper.hasIrsNoticeFormatted}
                        </div>
                        <div className="margin-top-3 margin-bottom-2">
                          <label
                            className="usa-label usa-label-display"
                            htmlFor="filing-type"
                          >
                            Type of notice/case
                          </label>
                          {form.caseType}
                        </div>
                      </div>
                      <div className="tablet:grid-col-4 margin-bottom-1">
                        {reviewPetitionHelper.shouldShowIrsNoticeDate && (
                          <div>
                            <label
                              className="usa-label usa-label-display"
                              htmlFor="filing-type"
                            >
                              Date of notice
                            </label>
                            {reviewPetitionHelper.irsNoticeDateFormatted}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="tablet:grid-col-5 margin-bottom-4">
                <div className="card height-full margin-bottom-0">
                  <div className="content-wrapper">
                    <h3 className="underlined">Attachments</h3>
                    <div>
                      <div className="margin-top-3 margin-bottom-2">
                        <label
                          className="usa-label usa-label-display"
                          htmlFor="filing-petition"
                        >
                          Petition
                        </label>
                        <div className="grid-row">
                          <div className="grid-col flex-auto">
                            <FontAwesomeIcon
                              className="fa-icon-blue"
                              icon={['fas', 'file-pdf']}
                            />
                          </div>
                          <div className="grid-col flex-fill">
                            <PDFPreviewButton
                              file={form.petitionFile}
                              title="Petition"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="margin-top-3 margin-bottom-2">
                        <label
                          className="usa-label usa-label-display"
                          htmlFor="filing-parties"
                        >
                          Statement of Taxpayer Identification
                        </label>
                        <div>
                          <div className="grid-row">
                            <div className="grid-col flex-auto">
                              <FontAwesomeIcon
                                className="fa-icon-blue"
                                icon={['fas', 'file-pdf']}
                              />
                            </div>
                            <div className="grid-col flex-fill">
                              <PDFPreviewButton
                                file={form.stinFile}
                                title="Statement of Taxpayer Identification"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      {form.requestForPlaceOfTrialFile && (
                        <div className="margin-top-3 margin-bottom-3">
                          <label
                            className="usa-label usa-label-display margin-top-3"
                            htmlFor="filing-parties"
                          >
                            Request for Place of Trial
                          </label>
                          <div>
                            <div className="grid-row">
                              <div className="grid-col flex-auto">
                                <FontAwesomeIcon
                                  className="fa-icon-blue"
                                  icon={['fas', 'file-pdf']}
                                />
                              </div>
                              <div className="grid-col flex-fill">
                                <PDFPreviewButton
                                  file={form.requestForPlaceOfTrialFile}
                                  title="Request for Place of Trial"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      {form.ownershipDisclosureFile && (
                        <div className="margin-top-3 margin-bottom-3">
                          <label
                            className="usa-label usa-label-display margin-top-3"
                            htmlFor="filing-parties"
                          >
                            Ownership Disclosure Statement
                          </label>
                          <div>
                            <div className="grid-row">
                              <div className="grid-col flex-auto">
                                <FontAwesomeIcon
                                  className="fa-icon-blue"
                                  icon={['fas', 'file-pdf']}
                                />
                              </div>
                              <div className="grid-col flex-fill">
                                <PDFPreviewButton
                                  file={form.ownershipDisclosureFile}
                                  title="Ownership Disclosure Statement"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="margin-top-5">
            <Button
              id="submit-case"
              onClick={() => {
                openConfirmServeToIrsModalSequence();
              }}
            >
              Serve to IRS
            </Button>
            <Button
              secondary
              onClick={() => goBackToStartCaseInternalSequence()}
            >
              Back
            </Button>
            <Button
              link
              onClick={() => {
                formCancelToggleCancelSequence();
              }}
            >
              Cancel
            </Button>
          </div>
        </section>
        {showModal === 'CaseDifferenceModalOverlay' && (
          <CaseDifferenceModalOverlay />
        )}
        {showModal === 'FileUploadStatusModal' && <FileUploadStatusModal />}
        {showModal === 'FileUploadErrorModal' && (
          <FileUploadErrorModal confirmSequence={serveToIrsSequence} />
        )}
        {showModal == 'FormCancelModalDialog' && (
          <FormCancelModalDialog onCancelSequence="closeModalAndReturnToDashboardSequence" />
        )}
        {showModal == 'ConfirmServeToIrsModal' && <ConfirmServeToIrsModal />}
      </>
    );
  },
);