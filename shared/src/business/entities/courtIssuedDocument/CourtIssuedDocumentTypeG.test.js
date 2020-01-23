const { CourtIssuedDocumentFactory } = require('./CourtIssuedDocumentFactory');
const { VALIDATION_ERROR_MESSAGES } = require('./CourtIssuedDocumentConstants');

describe('CourtIssuedDocumentTypeG', () => {
  describe('validation', () => {
    it('should have error messages for missing fields', () => {
      const document = CourtIssuedDocumentFactory.get({
        scenario: 'Type G',
      });
      expect(document.getFormattedValidationErrors()).toEqual({
        attachments: VALIDATION_ERROR_MESSAGES.attachments,
        date: VALIDATION_ERROR_MESSAGES.date[1],
        documentType: VALIDATION_ERROR_MESSAGES.documentType,
        trialLocation: VALIDATION_ERROR_MESSAGES.trialLocation,
      });
    });

    it('should have error message for invalid formatted date', () => {
      const extDoc = CourtIssuedDocumentFactory.get({
        attachments: false,
        date: '04/10/2025',
        documentTitle: 'Notice of Trial on [Date] at [Place]',
        documentType: 'NTD - Notice of Trial',
        scenario: 'Type G',
        trialLocation: 'Seattle, Washington',
      });
      expect(extDoc.getFormattedValidationErrors()).toEqual({
        date: VALIDATION_ERROR_MESSAGES.date[1],
      });
    });

    it('should be valid when all fields are present', () => {
      const document = CourtIssuedDocumentFactory.get({
        attachments: false,
        date: '2025-04-10T00:00:00-05:00',
        documentTitle: 'Notice of Trial on [Date] at [Place]',
        documentType: 'NTD - Notice of Trial',
        scenario: 'Type G',
        trialLocation: 'Seattle, Washington',
      });
      expect(document.getFormattedValidationErrors()).toEqual(null);
    });
  });

  describe('title generation', () => {
    it('should generate valid title', () => {
      const extDoc = CourtIssuedDocumentFactory.get({
        attachments: false,
        date: '2025-04-10T00:00:00-05:00',
        documentTitle: 'Notice of Trial on [Date] at [Place]',
        documentType: 'NTD - Notice of Trial',
        scenario: 'Type G',
        trialLocation: 'Seattle, Washington',
      });
      expect(extDoc.getDocumentTitle()).toEqual(
        'Notice of Trial on 04-10-2025 at Seattle, Washington',
      );
    });
  });
});