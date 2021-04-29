import { defineMessages } from 'react-intl';

export const scope = 'boilerplate.containers.BmdExportPage';
export const Commonscope = 'boilerplate.containers';

export default defineMessages({
  name: {
    id: `${scope}.header`,
    defaultMessage: 'BmdExport List',
  },
  bmdexportGkonto: {
    id: `${scope}.bmdexport.gkonto`,
    defaultMessage: 'gkonto',
  },
  bmdexportCountry: {
    id: `${scope}.bmdexport.country`,
    defaultMessage: 'Country',
  },
  bmdexportTaxRate: {
    id: `${scope}.bmdexport.taxrate`,
    defaultMessage: 'Tax Rate',
  },
  bmdexportAddButton: {
    id: `${scope}.bmdexport.add.button`,
    defaultMessage: 'Add Country code',
  },
  bmdexportSaveButton: {
    id: `${scope}.bmdexport.save.button`,
    defaultMessage: 'Save',
  },
  bmdexportDeleteHeader: {
    id: `${scope}.bmdexport.delete.header`,
    defaultMessage: 'Delete Your BmdExport',
  },
  bmdexportDeleteText: {
    id: `${scope}.bmdexport.delete.text`,
    defaultMessage: 'Are you sure you want to delete your BmdExport',
  },
  bmdexportError: {
    id: `${scope}.bmdexport.error.message`,
    defaultMessage: 'All Field must require gknoto and country selected',
  },
  ButtonYES: {
    id: `${Commonscope}.ModalBox.yes`,
    defaultMessage: 'Yes',
  },
  ButtonNO: {
    id: `${Commonscope}.ModalBox.no`,
    defaultMessage: 'No',
  },
  Tooltip : {
    id: `${Commonscope}.tooltip`,
    defaultMessage: 'Please fill out this field',
  },
});
