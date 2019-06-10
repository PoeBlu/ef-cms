import { state } from 'cerebral';

/**
 * sets a scanner source
 *
 * @param {object} providers the providers object
 * @param {object} providers.applicationContext the application context used for getting the scanner API
 * @param {Function} providers.props the cerebral props object used for getting the props.scannerSourceName
 * @param {Function} providers.store the cerebral store used for setting state.scanner.scannerSourceName
 */
export const setScannerSourceAction = async ({
  applicationContext,
  props,
  store,
}) => {
  if (props.scannerSourceName) {
    const scanner = applicationContext.getScanner();
    scanner.setSourceByName(props.scannerSourceName);

    await applicationContext.getUseCases().setItem({
      applicationContext,
      key: 'scannerSourceName',
      value: props.scannerSourceName,
    });

    // also need to keep track of the index due to some scanners showing up twice as a source with duplicate name
    await applicationContext.getUseCases().setItem({
      applicationContext,
      key: 'scannerSourceIndex',
      value: props.scannerSourceIndex,
    });

    // This may not be necessary
    store.set(state.scanner.scannerSourceName, props.scannerSourceName);
  } else {
    // you didn't pick a scanner source
  }
};
