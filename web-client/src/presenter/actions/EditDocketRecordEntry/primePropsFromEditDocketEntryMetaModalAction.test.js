import { applicationContext } from '../../../applicationContext';
import { presenter } from '../../presenter';
import { primePropsFromEditDocketEntryMetaModalAction } from './primePropsFromEditDocketEntryMetaModalAction';
import { runAction } from 'cerebral/test';

describe('primePropsFromEditDocketEntryMetaModalAction', () => {
  beforeEach(() => {
    presenter.providers.applicationContext = applicationContext;
  });

  it('should update the props from state', async () => {
    const result = await runAction(
      primePropsFromEditDocketEntryMetaModalAction,
      {
        modules: { presenter },
        state: {
          modal: {
            caseId: '456',
            docketRecordIndex: 1,
            form: { something: '123' },
          },
        },
      },
    );

    expect(result.output).toEqual({
      caseId: '456',
      docketRecordEntry: { something: '123' },
      docketRecordIndex: 1,
      fromModal: true,
    });
  });

  it('should filter empty strings from the given params in state.modal.form', async () => {
    const result = await runAction(
      primePropsFromEditDocketEntryMetaModalAction,
      {
        modules: { presenter },
        state: {
          modal: {
            caseId: '456',
            docketRecordIndex: 1,
            form: {
              someEmptyString: '', // should be removed
              someObj: {
                someNestedEmptyString: '', // should be removed
              },
              something: '123',
            },
            fromModal: true,
          },
        },
      },
    );

    expect(result.output).toEqual({
      caseId: '456',
      docketRecordEntry: { someObj: {}, something: '123' },
      docketRecordIndex: 1,
      fromModal: true,
    });
  });
});