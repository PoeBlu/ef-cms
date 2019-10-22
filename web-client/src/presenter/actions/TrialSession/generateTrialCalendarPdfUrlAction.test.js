import { generateTrialCalendarPdfUrlAction } from './generateTrialCalendarPdfUrlAction';
import { presenter } from '../../presenter';
import { runAction } from 'cerebral/test';

const fakeData =
  'JVBERi0xLjEKJcKlwrHDqwoKMSAwIG9iagogIDw8IC9UeXBlIC9DYXRhbG9nCiAgICAgL1BhZ2VzIDIgMCBSCiAgPj4KZW5kb2JqCgoyIDAgb2JqCiAgPDwgL1R5cGUgL1BhZ2VzCiAgICAgL0tpZHMgWzMgMCBSXQogICAgIC9Db3VudCAxCiAgICAgL01lZGlhQm94IFswIDAgMzAwIDE0NF0KICA+PgplbmRvYmoKCjMgMCBvYmoKICA8PCAgL1R5cGUgL1BhZ2UKICAgICAgL1BhcmVudCAyIDAgUgogICAgICAvUmVzb3VyY2VzCiAgICAgICA8PCAvRm9udAogICAgICAgICAgIDw8IC9GMQogICAgICAgICAgICAgICA8PCAvVHlwZSAvRm9udAogICAgICAgICAgICAgICAgICAvU3VidHlwZSAvVHlwZTEKICAgICAgICAgICAgICAgICAgL0Jhc2VGb250IC9UaW1lcy1Sb21hbgogICAgICAgICAgICAgICA+PgogICAgICAgICAgID4+CiAgICAgICA+PgogICAgICAvQ29udGVudHMgNCAwIFIKICA+PgplbmRvYmoKCjQgMCBvYmoKICA8PCAvTGVuZ3RoIDg0ID4+CnN0cmVhbQogIEJUCiAgICAvRjEgMTggVGYKICAgIDUgODAgVGQKICAgIChDb25ncmF0aW9ucywgeW91IGZvdW5kIHRoZSBFYXN0ZXIgRWdnLikgVGoKICBFVAplbmRzdHJlYW0KZW5kb2JqCgp4cmVmCjAgNQowMDAwMDAwMDAwIDY1NTM1IGYgCjAwMDAwMDAwMTggMDAwMDAgbiAKMDAwMDAwMDA3NyAwMDAwMCBuIAowMDAwMDAwMTc4IDAwMDAwIG4gCjAwMDAwMDA0NTcgMDAwMDAgbiAKdHJhaWxlcgogIDw8ICAvUm9vdCAxIDAgUgogICAgICAvU2l6ZSA1CiAgPj4Kc3RhcnR4cmVmCjU2NQolJUVPRgo=';

const generateTrialCalendarPdfInteractorMock = jest.fn();
const mockCreateObjectUrl = jest.fn();

describe('generateTrialCalendarPdfUrlAction', () => {
  beforeEach(() => {
    global.window = global;
    global.Blob = () => {};

    presenter.providers.applicationContext = {
      getUseCases: () => ({
        generateTrialCalendarPdfInteractor: () => {
          generateTrialCalendarPdfInteractorMock();
          return fakeData;
        },
      }),
    };

    presenter.providers.router = {
      createObjectURL: () => {
        mockCreateObjectUrl();
        return 'pdf-url-123';
      },
    };
  });

  it('generates trial calendar pdf url', async () => {
    const result = await runAction(generateTrialCalendarPdfUrlAction, {
      modules: {
        presenter,
      },
      state: {
        trialSession: {
          trialSessionId: 'trial-session-id-123',
        },
      },
    });

    expect(generateTrialCalendarPdfInteractorMock).toHaveBeenCalled();
    expect(mockCreateObjectUrl).toHaveBeenCalled();
    expect(result.output).toMatchObject({
      pdfUrl: 'pdf-url-123',
    });
  });
});
