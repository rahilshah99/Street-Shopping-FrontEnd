import {
  REQUEST_ORDER,
  SUCCESS_ORDER,
  FAILED_ORDER,
  REQUEST_EDIT_ORDER,
  SUCCESS_EDIT_ORDER,
  FAILED_EDIT_ORDER,
  REQUEST_GET_ORDER_BY_ID,
  SUCCESS_GET_ORDER_BY_ID,
  FAILED_GET_ORDER_BY_ID,
  REQUEST_ORDER_BY_PAGINATION,
  SUCCESS_ORDER_BY_PAGINATION,
  FAILED_ORDER_BY_PAGINATION,
  REQUEST_CLEAR_SINGLE_ORDER,
  REQUEST_STATUS_COUNT,
  SUCCESS_STATUS_COUNT,
  FAILED_STATUS_COUNT,
  REQUEST_PDF_INVOICE,
  SUCCESS_PDF_INVOICE,
  FAILED_PDF_INVOICE,
  REQUEST_EMAIL_GENERATE,
  SUCCESS_EMAIL_GENERATE,
  FAILED_EMAIL_GENERATE,
} from './constants';

export const requestOrder = () => ({
  type: REQUEST_ORDER,
});

export const orderSuccess = payload => ({
  type: SUCCESS_ORDER,
  payload,
});

export const orderFailed = error => ({
  type: FAILED_ORDER,
  payload: error,
});

export const requestEditOrder = data => ({
  type: REQUEST_EDIT_ORDER,
  payload: data,
});

export const editOrderSuccess = payload => ({
  type: SUCCESS_EDIT_ORDER,
  payload,
});

export const editOrderFailed = error => ({
  type: FAILED_EDIT_ORDER,
  payload: error,
});

export const requestGetOrderById = data => ({
  type: REQUEST_GET_ORDER_BY_ID,
  payload: data,
});

export const getOrderSuccessById = payload => ({
  type: SUCCESS_GET_ORDER_BY_ID,
  payload,
});

export const getOrderFailedById = error => ({
  type: FAILED_GET_ORDER_BY_ID,
  payload: error,
});

export const requestOrderByPagination = data => ({
  type: REQUEST_ORDER_BY_PAGINATION,
  payload: data,
});

export const orderSuccessByPagination = payload => ({
  type: SUCCESS_ORDER_BY_PAGINATION,
  payload,
});

export const orderFailedByPagination = error => ({
  type: FAILED_ORDER_BY_PAGINATION,
  payload: error,
});

export const requestClearSingleOrder = () => ({
  type: REQUEST_CLEAR_SINGLE_ORDER,
});

export const requestStatusCount = () => ({
  type: REQUEST_STATUS_COUNT,
});

export const statusCountSuccess = payload => ({
  type: SUCCESS_STATUS_COUNT,
  payload,
});

export const statusCountFailed = error => ({
  type: FAILED_STATUS_COUNT,
  payload: error,
});

export const requestPDFInvoice = data => ({
  type: REQUEST_PDF_INVOICE,
  payload: data,
});

export const pdfInvoiceSuccess = payload => ({
  type: SUCCESS_PDF_INVOICE,
  payload,
});

export const pdfInvoiceFailed = error => ({
  type: FAILED_PDF_INVOICE,
  payload: error,
});

export const requestEmailGenerate = data => ({
  type: REQUEST_EMAIL_GENERATE,
  payload: data,
});

export const emailGenerateSuccess = payload => ({
  type: SUCCESS_EMAIL_GENERATE,
  payload,
});

export const emailGenerateFailed = error => ({
  type: FAILED_EMAIL_GENERATE,
  payload: error,
});
