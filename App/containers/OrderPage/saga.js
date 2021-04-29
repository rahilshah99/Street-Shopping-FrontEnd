import { put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { CONSTANT } from '../../enum';
import {
  REQUEST_ORDER,
  REQUEST_ORDER_BY_PAGINATION,
  REQUEST_EDIT_ORDER,
  REQUEST_GET_ORDER_BY_ID,
  REQUEST_STATUS_COUNT,
  REQUEST_PDF_INVOICE,
  REQUEST_EMAIL_GENERATE,
} from './constants';
import {
  orderSuccess,
  orderFailed,
  editOrderSuccess,
  editOrderFailed,
  getOrderSuccessById,
  getOrderFailedById,
  orderSuccessByPagination,
  orderFailedByPagination,
  statusCountSuccess,
  statusCountFailed,
  pdfInvoiceSuccess,
  pdfInvoiceFailed,
  emailGenerateSuccess,
  emailGenerateFailed,
} from './actions';

const { API_URL, INVOICE_URL } = CONSTANT;

export function* orderListData() {
  const requestURL = `${API_URL}/orders/getOrder`;
  try {
    const orderList = yield request({
      method: 'GET',
      url: requestURL,
    });
    if (orderList) {
      yield put(orderSuccess(orderList.data));
    }
  } catch (err) {
    yield put(orderFailed(err));
  }
}

export function* orderListPaginationData({
  payload: { page, limit, sortBy, paymentFilter },
}) {
  const pageNo = page === undefined ? 1 : page;
  const sort = sortBy === undefined || null ? '' : sortBy;
  const paymentMethod = paymentFilter === 'ALL_PAYMENT' ? '' : paymentFilter;
  const query = {
    paymentVia: paymentMethod,
  };
  const encodedQuery = encodeURIComponent(JSON.stringify(query));
  const requestURL = `${API_URL}/orders/getOrder?page=${pageNo}&limit=${limit}&sortBy=${sort}&query=${encodedQuery}`;
  try {
    const orderListPagination = yield request({
      method: 'GET',
      url: requestURL,
    });
    if (orderListPagination) {
      yield put(orderSuccessByPagination(orderListPagination.data));
    }
  } catch (err) {
    yield put(orderFailedByPagination(err));
  }
}

export function* getOrderById({ payload }) {
  const requestURL = `${API_URL}/orders/getOrderById/${payload}`;
  try {
    const getOrderByIdRes = yield request({
      method: 'GET',
      url: requestURL,
    });
    if (getOrderByIdRes.status === 200) {
      yield put(getOrderSuccessById(getOrderByIdRes.data));
    }
  } catch (err) {
    yield put(getOrderFailedById(err));
  }
}

export function* updateOrder({ payload: { id, order } }) {
  const requestURL = `${API_URL}/masterTable/updateOrder/${id}`;
  try {
    const updateOrderRes = yield request({
      method: 'PUT',
      url: requestURL,
      data: order,
    });
    if (updateOrderRes.status === 200) {
      yield put(editOrderSuccess(updateOrderRes.data.message));
    }
  } catch (err) {
    yield put(editOrderFailed(err));
  }
}

export function* statusCountData() {
  const requestURL = `${API_URL}/orders/getStatusCount`;
  try {
    const statusCount = yield request({
      method: 'GET',
      url: requestURL,
    });
    if (statusCount) {
      yield put(statusCountSuccess(statusCount.data));
    }
  } catch (err) {
    yield put(statusCountFailed(err));
  }
}

export function* getPDFGenerate({ payload }) {
  const requestURL = `${API_URL}/pdf/create?_id=${payload}`;
  try {
    const getPDFGenerateRes = yield request({
      method: 'POST',
      url: requestURL,
    });
    if (getPDFGenerateRes.status === 200) {
      window.open(`${INVOICE_URL}/${getPDFGenerateRes.data.path}`, '_blank');
      yield put(pdfInvoiceSuccess(getPDFGenerateRes.data));
    }
  } catch (err) {
    yield put(pdfInvoiceFailed(err));
  }
}

export function* getEmailGenerate({ payload: { sendorder, _id } }) {
  const requestURL = `${API_URL}/email/status=${sendorder}&_id=${_id}`;
  try {
    const getEmailGenerateRes = yield request({
      method: 'POST',
      url: requestURL,
    });
    if (getEmailGenerateRes.status === 200) {
      yield put(emailGenerateSuccess(getEmailGenerateRes.data));
    }
  } catch (err) {
    yield put(emailGenerateFailed(err));
  }
}

export default function* orderData() {
  yield takeLatest(REQUEST_ORDER, orderListData);
  yield takeLatest(REQUEST_ORDER_BY_PAGINATION, orderListPaginationData);
  yield takeLatest(REQUEST_EDIT_ORDER, updateOrder);
  yield takeLatest(REQUEST_GET_ORDER_BY_ID, getOrderById);
  yield takeLatest(REQUEST_STATUS_COUNT, statusCountData);
  yield takeLatest(REQUEST_PDF_INVOICE, getPDFGenerate);
  yield takeLatest(REQUEST_EMAIL_GENERATE, getEmailGenerate);
}
