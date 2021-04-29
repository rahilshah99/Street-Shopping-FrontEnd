import {
  REQUEST_PRODUCT,
  SUCCESS_PRODUCT,
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
import { REQUEST_CHARACTERISTICS } from '../CharacteristicPage/constants';
import { REQUEST_CATEGORY } from '../CategoryPage/constants';

export const requestProduct = () => ({
  type: REQUEST_PRODUCT,
});

export const productSuccess = payload => ({
  type: SUCCESS_PRODUCT,
  payload,
});

export const productFailed = error => ({
  type: FAILED_PRODUCT,
  payload: error,
});

export const requestAddProduct = product => ({
  type: REQUEST_ADD_PRODUCT,
  payload: product,
});

export const addProductSuccess = payload => ({
  type: SUCCESS_ADD_PRODUCT,
  payload,
});

export const addProductFailed = error => ({
  type: FAILED_ADD_PRODUCT,
  payload: error,
});

export const requestCategory = () => ({
  type: REQUEST_CATEGORY,
});

export const requestCharacteristics = () => ({
  type: REQUEST_CHARACTERISTICS,
});

export const removeProduct = id => ({
  type: REMOVE_PRODUCT,
  payload: id,
});

export const removeProductSuccess = payload => ({
  type: REMOVE_PRODUCT_SUCCESS,
  payload,
});

export const removeProductFailed = error => ({
  type: REMOVE_PRODUCT_FAILED,
  payload: error,
});

export const requestEditProduct = data => ({
  type: REQUEST_EDIT_PRODUCT,
  payload: data,
});

export const editProductSuccess = payload => ({
  type: SUCCESS_EDIT_PRODUCT,
  payload,
});

export const editProductFailed = error => ({
  type: FAILED_EDIT_PRODUCT,
  payload: error,
});

export const requestGetProductById = data => ({
  type: REQUEST_GET_PRODUCT_BY_ID,
  payload: data,
});

export const getProductSuccessById = payload => ({
  type: SUCCESS_GET_PRODUCT_BY_ID,
  payload,
});

export const getProductFailedById = error => ({
  type: FAILED_GET_PRODUCT_BY_ID,
  payload: error,
});

export const requestClearSingleProduct = () => ({
  type: REQUEST_CLEAR_SINGLE_PRODUCT,
});

export const requestProductByPagination = data => ({
  type: REQUEST_PRODUCT_BY_PAGINATION,
  payload: data,
});
export const productSuccessByPagination = payload => ({
  type: SUCCESS_PRODUCT_BY_PAGINATION,
  payload,
});
export const productFailedByPagination = error => ({
  type: FAILED_PRODUCT_BY_PAGINATION,
  payload: error,
});
