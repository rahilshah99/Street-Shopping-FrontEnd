import {
  REQUEST_CATEGORY,
  SUCCESS_CATEGORY,
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

export const requestCategory = () => ({
  type: REQUEST_CATEGORY,
});

export const categorySuccess = payload => ({
  type: SUCCESS_CATEGORY,
  payload,
});

export const categoryFailed = error => ({
  type: FAILED_CATEGORY,
  payload: error,
});

export const requestAddCategory = product => ({
  type: REQUEST_ADD_CATEGORY,
  payload: product,
});

export const addCategorySuccess = payload => ({
  type: SUCCESS_ADD_CATEGORY,
  payload,
});

export const addCategoryFailed = error => ({
  type: FAILED_ADD_CATEGORY,
  payload: error,
});

export const removeCategory = id => ({
  type: REMOVE_CATEGORY,
  payload: id,
});

export const removeCategorySuccess = payload => ({
  type: REMOVE_CATEGORY_SUCCESS,
  payload,
});

export const removeCategoryFailed = error => ({
  type: REMOVE_CATEGORY_FAILED,
  payload: error,
});

export const requestEditCategory = data => ({
  type: REQUEST_EDIT_CATEGORY,
  payload: data,
});

export const editCategorySuccess = payload => ({
  type: SUCCESS_EDIT_CATEGORY,
  payload,
});

export const editCategoryFailed = error => ({
  type: FAILED_EDIT_CATEGORY,
  payload: error,
});

export const requestGetCategoryById = data => ({
  type: REQUEST_GET_CATEGORY_BY_ID,
  payload: data,
});

export const getCategorySuccessById = payload => ({
  type: SUCCESS_GET_CATEGORY_BY_ID,
  payload,
});

export const getCategoryFailedById = error => ({
  type: FAILED_GET_CATEGORY_BY_ID,
  payload: error,
});

export const requestCategoryByPagination = data => ({
  type: REQUEST_CATEGORY_BY_PAGINATION,
  payload: data,
});
export const categorySuccessByPagination = payload => ({
  type: SUCCESS_CATEGORY_BY_PAGINATION,
  payload,
});
export const categoryFailedByPagination = error => ({
  type: FAILED_CATEGORY_BY_PAGINATION,
  payload: error,
});

export const requestClearSingleCategory = () => ({
  type: REQUEST_CLEAR_SINGLE_CATEGORY,
});
