/* eslint-disable no-param-reassign */
import produce from 'immer';
import {
  SUCCESS_CATEGORY,
  REQUEST_CATEGORY,
  FAILED_CATEGORY,
  REQUEST_ADD_CATEGORY,
  SUCCESS_ADD_CATEGORY,
  FAILED_ADD_CATEGORY,
  REMOVE_CATEGORY,
  REMOVE_CATEGORY_SUCCESS,
  REMOVE_CATEGORY_FAILED,
  REQUEST_EDIT_CATEGORY,
  SUCCESS_EDIT_CATEGORY,
  FAILED_EDIT_CATEGORY,
  REQUEST_GET_CATEGORY_BY_ID,
  SUCCESS_GET_CATEGORY_BY_ID,
  FAILED_GET_CATEGORY_BY_ID,
  REQUEST_CATEGORY_BY_PAGINATION,
  SUCCESS_CATEGORY_BY_PAGINATION,
  FAILED_CATEGORY_BY_PAGINATION,
  REQUEST_CLEAR_SINGLE_CATEGORY,
} from './constants';

const initialState = {
  categoryList: {},
  categoryListByPagination: {},
  addCategory: {
    loading: false,
    error: '',
    success: '',
  },
  removeCategory: {
    loading: false,
    error: '',
    data: {},
  },
  editCategory: {
    loading: false,
    error: '',
    data: {},
  },
  singleCategory: {
    loading: false,
    error: '',
    data: {},
  },
  loading: false,
  page: 1,
  pageSize: null,
  error: '',
};

const categoryReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case REQUEST_CATEGORY:
        draft.loading = true;
        draft.error = '';
        draft.categoryList = {};
        break;
      case SUCCESS_CATEGORY:
        draft.loading = false;
        draft.error = '';
        draft.categoryList = action.payload;
        break;
      case FAILED_CATEGORY:
        draft.loading = false;
        draft.error = action.payload;
        draft.categoryList = {};
        break;
      case REQUEST_ADD_CATEGORY:
        draft.addCategory = {
          success: '',
          loading: true,
          error: '',
        };
        break;
      case SUCCESS_ADD_CATEGORY:
        draft.addCategory = {
          success: action.payload,
          loading: false,
          error: '',
        };
        break;
      case FAILED_ADD_CATEGORY:
        draft.addCategory = {
          success: '',
          loading: false,
          error: action.payload,
        };
        break;
      case REMOVE_CATEGORY:
        draft.removeCategory.loading = true;
        draft.removeCategory.error = '';
        draft.removeCategory.data = {};
        break;
      case REMOVE_CATEGORY_SUCCESS:
        draft.removeCategory.loading = false;
        draft.removeCategory.error = '';
        draft.removeCategory.data = action.payload;
        break;
      case REMOVE_CATEGORY_FAILED:
        draft.removeCategory.loading = false;
        draft.removeCategory.error = action.payload;
        draft.removeCategory.data = {};
        break;
      case REQUEST_EDIT_CATEGORY:
        draft.editCategory = {
          success: '',
          loading: true,
          error: '',
        };
        break;
      case SUCCESS_EDIT_CATEGORY:
        draft.editCategory = {
          success: action.payload,
          loading: false,
          error: '',
        };
        break;
      case FAILED_EDIT_CATEGORY:
        draft.editCategory = {
          success: '',
          loading: false,
          error: action.payload,
        };
        break;
      case REQUEST_GET_CATEGORY_BY_ID:
        draft.singleCategory = {
          loading: true,
          error: '',
          data: {},
        };
        break;
      case SUCCESS_GET_CATEGORY_BY_ID:
        draft.singleCategory = {
          loading: false,
          error: '',
          data: action.payload,
        };
        break;
      case FAILED_GET_CATEGORY_BY_ID:
        draft.singleCategory = {
          loading: false,
          error: action.payload,
          data: {},
        };
        break;
      case REQUEST_CATEGORY_BY_PAGINATION:
        draft.loading = true;
        draft.error = '';
        break;
      case SUCCESS_CATEGORY_BY_PAGINATION:
        draft.loading = false;
        draft.error = '';
        draft.categoryListByPagination = action.payload;
        draft.page = action.payload.page || 1;
        break;
      case FAILED_CATEGORY_BY_PAGINATION:
        draft.loading = false;
        draft.error = action.payload;
        draft.categoryListByPagination = {};
        break;
      case REQUEST_CLEAR_SINGLE_CATEGORY:
        draft.singleCategory = {
          data: {},
        };
        break;
      default:
    }
  });

export default categoryReducer;
