import {
  REQUEST_BMDEXPORT,
  SUCCESS_BMDEXPORT,
  FAILED_BMDEXPORT,
  REMOVE_BMDEXPORT,
  REMOVE_BMDEXPORT_SUCCESS,
  REMOVE_BMDEXPORT_FAILED,
  REQUEST_ADD_MULTIPLE_BMDEXPORT,
  SUCCESS_ADD_MULTIPLE_BMDEXPORT,
  FAILED_ADD_MULTIPLE_BMDEXPORT,
  REQUEST_UPDATE_MULTIPLE_BMDEXPORT,
  SUCCESS_UPDATE_MULTIPLE_BMDEXPORT,
  FAILED_UPDATE_MULTIPLE_BMDEXPORT,
  REQUEST_EXPORTDATA,
  SUCCESS_EXPORTDATA,
  FAILED_EXPORTDATA,
} from './constants';

import { REQUEST_COUNTRIES } from '../CountryPage/constants';
import { REQUEST_VAT } from '../VatPage/constants';

export const requestBmdExport = () => ({
  type: REQUEST_BMDEXPORT,
});

export const bmdexportSuccess = payload => ({
  type: SUCCESS_BMDEXPORT,
  payload,
});

export const bmdexportFailed = error => ({
  type: FAILED_BMDEXPORT,
  payload: error,
});

export const removeBmdExport = id => ({
  type: REMOVE_BMDEXPORT,
  payload: id,
});

export const removeBmdExportSuccess = payload => ({
  type: REMOVE_BMDEXPORT_SUCCESS,
  payload,
});

export const removeBmdExportFailed = error => ({
  type: REMOVE_BMDEXPORT_FAILED,
  payload: error,
});

export const requestCountries = () => ({
  type: REQUEST_COUNTRIES,
});

export const requestVat = () => ({
  type: REQUEST_VAT,
});

export const requestAddMultipleBmdExportData = obj => ({
  type: REQUEST_ADD_MULTIPLE_BMDEXPORT,
  payload: obj,
});

export const successAddMultipleBmdExportData = obj => ({
  type: SUCCESS_ADD_MULTIPLE_BMDEXPORT,
  payload: obj,
});

export const failedAddMultipleBmdExportData = error => ({
  type: FAILED_ADD_MULTIPLE_BMDEXPORT,
  payload: error,
});

export const requestUpdateMultipleBmdExportData = obj => ({
  type: REQUEST_UPDATE_MULTIPLE_BMDEXPORT,
  payload: obj,
});

export const successUpdateMultipleBmdExportData = obj => ({
  type: SUCCESS_UPDATE_MULTIPLE_BMDEXPORT,
  payload: obj,
});

export const failedUpdateMultipleBmdExportData = error => ({
  type: FAILED_UPDATE_MULTIPLE_BMDEXPORT,
  payload: error,
});

export const requestExportData = data => ({
  type: REQUEST_EXPORTDATA,
  payload: data,
});

export const exportDataSuccess = payload => ({
  type: SUCCESS_EXPORTDATA,
  payload,
});

export const exportDataFailed = error => ({
  type: FAILED_EXPORTDATA,
  payload: error,
});
