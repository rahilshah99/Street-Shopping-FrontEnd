import { put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { CONSTANT } from '../../enum';
import {
  REQUEST_BMDEXPORT,
  REMOVE_BMDEXPORT,
  REQUEST_ADD_MULTIPLE_BMDEXPORT,
  REQUEST_UPDATE_MULTIPLE_BMDEXPORT,
  REQUEST_EXPORTDATA,
} from './constants';

import { REQUEST_COUNTRIES } from '../CountryPage/constants';
import { REQUEST_VAT } from '../VatPage/constants';

import {
  bmdexportSuccess,
  bmdexportFailed,
  removeBmdExportSuccess,
  removeBmdExportFailed,
  successAddMultipleBmdExportData,
  failedAddMultipleBmdExportData,
  successUpdateMultipleBmdExportData,
  failedUpdateMultipleBmdExportData,
  exportDataSuccess,
  exportDataFailed,
} from './actions';

import { countriesListData } from '../CountryPage/saga';
import { vatListData } from '../VatPage/saga';

const { API_URL } = CONSTANT;

export function* bmdexportListData() {
  const requestURL = `${API_URL}/masterTable/getBmdExport`;
  try {
    const bmdexportList = yield request({
      method: 'GET',
      url: requestURL,
    });
    if (bmdexportList) {
      yield put(bmdexportSuccess(bmdexportList.data));
    }
  } catch (err) {
    yield put(bmdexportFailed(err));
  }
}

export function* removeBmdExport({ payload }) {
  const requestURL = `${API_URL}/masterTable/deleteBmdExport/${payload}`;
  try {
    const removeBmdExportRes = yield request({
      method: 'DELETE',
      url: requestURL,
    });
    if (removeBmdExportRes.status === 200) {
      yield put(removeBmdExportSuccess(removeBmdExportRes.data.message));
    }
  } catch (err) {
    yield put(removeBmdExportFailed('BmdExport Not Deleted'));
  }
}

export function* addMultipleBmdExports({ payload }) {
  const requestURL = `${API_URL}/masterTable/postBmdExport`;
  try {
    const addMultipleBmdExportRes = yield request({
      method: 'POST',
      url: requestURL,
      data: payload,
    });
    if (addMultipleBmdExportRes.status === 200) {
      yield put(
        successAddMultipleBmdExportData(addMultipleBmdExportRes.data.message),
      );
    }
  } catch (err) {
    yield put(failedAddMultipleBmdExportData('Bmd Export not saved'));
  }
}

export function* updateMultipleBmdExports({ payload }) {
  const requestURL = `${API_URL}/masterTable/updateBmdExport`;
  try {
    const updateMultipleBmdExportRes = yield request({
      method: 'PUT',
      url: requestURL,
      data: payload,
    });
    if (updateMultipleBmdExportRes.status === 200) {
      yield put(
        successUpdateMultipleBmdExportData(
          updateMultipleBmdExportRes.data.message,
        ),
      );
    }
  } catch (err) {
    yield put(failedUpdateMultipleBmdExportData('Bmd Export not Updated'));
  }
}

export function* exportListData({ payload }) {
  const requestURL = `${API_URL}/exports/getExportData`;
  try {
    const bmdexportList = yield request({
      method: 'POST',
      url: requestURL,
      data: payload,
    });
    if (bmdexportList) {
      yield put(exportDataSuccess(bmdexportList.data));
    }
  } catch (err) {
    yield put(exportDataFailed(err));
  }
}

export default function* bmdexportData() {
  yield takeLatest(REQUEST_BMDEXPORT, bmdexportListData);
  yield takeLatest(REMOVE_BMDEXPORT, removeBmdExport);
  yield takeLatest(REQUEST_COUNTRIES, countriesListData);
  yield takeLatest(REQUEST_VAT, vatListData);
  yield takeLatest(REQUEST_ADD_MULTIPLE_BMDEXPORT, addMultipleBmdExports);
  yield takeLatest(REQUEST_UPDATE_MULTIPLE_BMDEXPORT, updateMultipleBmdExports);
  yield takeLatest(REQUEST_EXPORTDATA, exportListData);
}
