/* eslint-disable no-param-reassign */
import produce from 'immer';
import {
  SUCCESS_PRODUCT,
  REQUEST_PRODUCT,
  FAILED_PRODUCT,
  REQUEST_ADD_PRODUCT,
  SUCCESS_ADD_PRODUCT,
  FAILED_ADD_PRODUCT,
  REMOVE_PRODUCT,
  REMOVE_PRODUCT_SUCCESS,
  REMOVE_PRODUCT_FAILED,
  REQUEST_EDIT_PRODUCT,
  SUCCESS_EDIT_PRODUCT,
  FAILED_EDIT_PRODUCT,
  REQUEST_GET_PRODUCT_BY_ID,
  SUCCESS_GET_PRODUCT_BY_ID,
  FAILED_GET_PRODUCT_BY_ID,
  REQUEST_CLEAR_SINGLE_PRODUCT,
  REQUEST_PRODUCT_BY_PAGINATION,
  SUCCESS_PRODUCT_BY_PAGINATION,
  FAILED_PRODUCT_BY_PAGINATION,
} from './constants';

const initialState = {
  productList: {},
  productListByPagination: {},
  addProduct: {
    loading: false,
    error: '',
    success: '',
  },
  removeProduct: {
    loading: false,
    error: '',
    data: {},
  },
  editProduct: {
    loading: false,
    error: '',
    data: {},
  },
  singleProduct: {
    loading: false,
    error: '',
    data: {},
  },
  loading: false,
  page: 1,
  pageSize: null,
  error: '',
};

const productReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case REQUEST_PRODUCT:
        draft.loading = true;
        draft.error = '';
        draft.productList = {};
        break;
      case SUCCESS_PRODUCT:
        draft.loading = false;
        draft.error = '';
        draft.productList = action.payload;
        break;
      case FAILED_PRODUCT:
        draft.loading = false;
        draft.error = action.payload;
        draft.productList = {};
        break;
      case REQUEST_ADD_PRODUCT:
        draft.addProduct = {
          success: '',
          loading: true,
          error: '',
        };
        break;
      case SUCCESS_ADD_PRODUCT:
        draft.addProduct = {
          success: action.payload,
          loading: false,
          error: '',
        };
        break;
      case FAILED_ADD_PRODUCT:
        draft.addProduct = {
          success: '',
          loading: false,
          error: action.payload,
        };
        break;
      case REMOVE_PRODUCT:
        draft.removeProduct.loading = true;
        draft.removeProduct.error = '';
        draft.removeProduct.data = {};
        break;
      case REMOVE_PRODUCT_SUCCESS:
        draft.removeProduct.loading = false;
        draft.removeProduct.error = '';
        draft.removeProduct.data = action.payload;
        break;
      case REMOVE_PRODUCT_FAILED:
        draft.removeProduct.loading = false;
        draft.removeProduct.error = action.payload;
        draft.removeProduct.data = {};
        break;
      case REQUEST_EDIT_PRODUCT:
        draft.editProduct = {
          success: '',
          loading: true,
          error: '',
        };
        break;
      case SUCCESS_EDIT_PRODUCT:
        draft.editProduct = {
          success: action.payload,
          loading: false,
          error: '',
        };
        break;
      case FAILED_EDIT_PRODUCT:
        draft.editProduct = {
          success: '',
          loading: false,
          error: action.payload,
        };
        break;
      case REQUEST_GET_PRODUCT_BY_ID:
        draft.singleProduct = {
          loading: true,
          error: '',
          data: {},
        };
        break;
      case SUCCESS_GET_PRODUCT_BY_ID:
        draft.singleProduct = {
          loading: false,
          error: '',
          data: action.payload,
        };
        break;
      case FAILED_GET_PRODUCT_BY_ID:
        draft.singleProduct = {
          loading: false,
          error: action.payload,
          data: {},
        };
        break;
      case REQUEST_CLEAR_SINGLE_PRODUCT:
        draft.singleProduct = {
          data: {},
        };
        break;
      case REQUEST_PRODUCT_BY_PAGINATION:
        draft.loading = true;
        draft.error = '';
        break;
      case SUCCESS_PRODUCT_BY_PAGINATION:
        draft.loading = false;
        draft.error = '';
        draft.productListByPagination = action.payload;
        draft.page = action.payload.page || 1;
        break;
      case FAILED_PRODUCT_BY_PAGINATION:
        draft.loading = false;
        draft.error = action.payload;
        draft.productListByPagination = {};
        break;
      default:
    }
  });

export default productReducer;
