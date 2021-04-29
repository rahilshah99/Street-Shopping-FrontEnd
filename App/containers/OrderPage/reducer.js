/* eslint-disable no-param-reassign */
import produce from 'immer';
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
} from './constants';

const initialState = {
  orderList: {},
  orderListByPagination: {},
  editOrder: {
    loading: false,
    error: '',
    data: {},
  },
  singleOrder: {
    loading: false,
    error: '',
    data: {},
  },
  statusCount: {},
  loading: false,
  page: 1,
  pageSize: null,
  error: '',
};

const orderReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case REQUEST_ORDER:
        draft.loading = true;
        draft.error = '';
        draft.orderList = {};
        break;
      case SUCCESS_ORDER:
        draft.loading = false;
        draft.error = '';
        draft.orderList = action.payload;
        break;
      case FAILED_ORDER:
        draft.loading = false;
        draft.error = action.payload;
        draft.orderList = {};
        break;
      case REQUEST_EDIT_ORDER:
        draft.editOrder = {
          success: '',
          loading: true,
          error: '',
        };
        break;
      case SUCCESS_EDIT_ORDER:
        draft.editOrder = {
          success: action.payload,
          loading: false,
          error: '',
        };
        break;
      case FAILED_EDIT_ORDER:
        draft.editOrder = {
          success: '',
          loading: false,
          error: action.payload,
        };
        break;
      case REQUEST_GET_ORDER_BY_ID:
        draft.singleOrder = {
          loading: true,
          error: '',
          data: {},
        };
        break;
      case SUCCESS_GET_ORDER_BY_ID:
        draft.singleOrder = {
          loading: false,
          error: '',
          data: action.payload,
        };
        break;
      case FAILED_GET_ORDER_BY_ID:
        draft.singleOrder = {
          loading: false,
          error: action.payload,
          data: {},
        };
        break;
      case REQUEST_ORDER_BY_PAGINATION:
        draft.loading = true;
        draft.error = '';
        break;
      case SUCCESS_ORDER_BY_PAGINATION:
        draft.loading = false;
        draft.error = '';
        draft.orderListByPagination = action.payload;
        draft.page = action.payload.page || 1;
        break;
      case FAILED_ORDER_BY_PAGINATION:
        draft.loading = false;
        draft.error = action.payload;
        draft.orderListByPagination = {};
        break;
      case REQUEST_CLEAR_SINGLE_ORDER:
        draft.singleOrder = {
          data: {},
        };
        break;
      case REQUEST_STATUS_COUNT:
        draft.loading = true;
        draft.error = '';
        draft.statusCount = {};
        break;
      case SUCCESS_STATUS_COUNT:
        draft.loading = false;
        draft.error = '';
        draft.statusCount = action.payload;
        break;
      case FAILED_STATUS_COUNT:
        draft.loading = false;
        draft.error = action.payload;
        draft.statusCount = {};
        break;
      default:
    }
  });

export default orderReducer;
