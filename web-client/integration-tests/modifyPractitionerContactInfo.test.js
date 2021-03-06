import { loginAs, setupTest, uploadPetition } from './helpers';
import practitionerSignsOut from './journey/practitionerSignsOut';
import practitionerUpdatesAddress from './journey/practitionerUpdatesAddress';
import practitionerViewsCaseDetailNoticeOfChangeOfAddress from './journey/practitionerViewsCaseDetailNoticeOfChangeOfAddress';

const test = setupTest();

describe('Modify Practitioner Contact Information', () => {
  beforeAll(() => {
    jest.setTimeout(30000);
  });

  let caseDetail;
  test.createdDocketNumbers = [];

  for (let i = 0; i < 3; i++) {
    it(`login as a practitioner and create case #${i}`, async () => {
      await loginAs(test, 'practitioner');
      caseDetail = await uploadPetition(test);
      test.createdDocketNumbers.push(caseDetail.docketNumber);
    });
  }

  practitionerUpdatesAddress(test);
  for (let i = 0; i < 3; i++) {
    practitionerViewsCaseDetailNoticeOfChangeOfAddress(test, i);
  }
  practitionerSignsOut(test);
});
