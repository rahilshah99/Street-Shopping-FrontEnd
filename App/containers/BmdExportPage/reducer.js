/* eslint-disable no-case-declarations */
/* eslint-disable no-param-reassign */
import produce from 'immer';
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

const initialState = {
  bmdexportList: {},
  exportData: {},
  bmdexportListByPagination: {},
  addBmdExport: {
    loading: false,
    error: '',
    success: '',
  },
  removeBmdExport: {
    loading: false,
    error: '',
    data: {},
  },
  editBmdExport: {
    loading: false,
    error: '',
    data: {},
  },
  singleBmdExport: {
    loading: false,
    error: '',
    data: {},
  },
  multipleAddBmdExport: {
    loading: false,
    error: '',
    data: {},
  },
  multipleUpdateBmdExport: {
    loading: false,
    error: '',
    data: {},
  },
  loading: false,
  page: 1,
  pageSize: null,
  error: '',
};

const bmdexportReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case REQUEST_BMDEXPORT:
        draft.loading = true;
        draft.error = '';
        break;
      case SUCCESS_BMDEXPORT:
        draft.loading = false;
        draft.error = '';
        draft.bmdexportList = action.payload;
        break;
      case FAILED_BMDEXPORT:
        draft.loading = false;
        draft.error = action.payload;
        draft.bmdexportList = {};
        break;
      case REMOVE_BMDEXPORT:
        draft.removeBmdExport.loading = true;
        draft.removeBmdExport.error = '';
        draft.removeBmdExport.data = {};
        break;
      case REMOVE_BMDEXPORT_SUCCESS:
        draft.removeBmdExport.loading = false;
        draft.removeBmdExport.error = '';
        draft.removeBmdExport.data = action.payload;
        break;
      case REMOVE_BMDEXPORT_FAILED:
        draft.removeBmdExport.loading = false;
        draft.removeBmdExport.error = action.payload;
        draft.removeBmdExport.data = {};
        break;
      case REQUEST_ADD_MULTIPLE_BMDEXPORT:
        draft.multipleAddBmdExport = {
          loading: true,
          error: '',
          data: {},
        };
        break;
      case SUCCESS_ADD_MULTIPLE_BMDEXPORT:
        draft.multipleAddBmdExport = {
          loading: false,
          error: '',
          data: action.payload,
        };
        break;
      case FAILED_ADD_MULTIPLE_BMDEXPORT:
        draft.multipleAddBmdExport = {
          loading: false,
          error: action.payload,
          data: {},
        };
        break;
      case REQUEST_UPDATE_MULTIPLE_BMDEXPORT:
        draft.multipleUpdateBmdExport = {
          loading: true,
          error: '',
          data: {},
        };
        break;
      case SUCCESS_UPDATE_MULTIPLE_BMDEXPORT:
        draft.multipleUpdateBmdExport = {
          loading: false,
          error: '',
          data: action.payload,
        };
        break;
      case FAILED_UPDATE_MULTIPLE_BMDEXPORT:
        draft.multipleUpdateBmdExport = {
          loading: false,
          error: action.payload,
          data: {},
        };
        break;
      case REQUEST_EXPORTDATA:
        draft.loading = true;
        draft.error = '';
        break;
      case SUCCESS_EXPORTDATA:
        draft.loading = false;
        draft.error = '';
        draft.exportData = action.payload;
        break;
      case FAILED_EXPORTDATA:
        draft.loading = false;
        draft.error = action.payload;
        draft.exportData = {};
        break;
      default:
    }
  });

export default bmdexportReducer;
