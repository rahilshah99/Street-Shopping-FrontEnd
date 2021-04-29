import { put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { CONSTANT } from '../../enum';
import {
  REQUEST_PRODUCT,
  REQUEST_PRODUCT_BY_PAGINATION,
  REQUEST_ADD_PRODUCT,
  REQUEST_EDIT_PRODUCT,
  REMOVE_PRODUCT,
  REQUEST_GET_PRODUCT_BY_ID,
} from './constants';
import { REQUEST_CATEGORY } from '../CategoryPage/constants';
import { REQUEST_CHARACTERISTICS } from '../CharacteristicPage/constants';
import {
  productFailed,
  productSuccess,
  addProductSuccess,
  editProductFailed,
  editProductSuccess,
  removeProductSuccess,
  removeProductFailed,
  addProductFailed,
  getProductSuccessById,
  getProductFailedById,
  productSuccessByPagination,
  productFailedByPagination,
} from './actions';
import { categoryListData } from '../CategoryPage/saga';
import { characteristicsListData } from '../CharacteristicPage/saga';

const { API_URL } = CONSTANT;

export function* productList() {
  const requestURL = `${API_URL}/products/getProduct`;
  try {
    const productListData = yield request({
      method: 'GET',
      url: requestURL,
    });
    if (productListData) {
      yield put(productSuccess(productListData.data));
    }
  } catch (err) {
    yield put(productFailed(err));
  }
}

export function* productListPaginationData({ payload: { page, limit } }) {
  const pageNo = page === undefined ? 1 : page;
  const requestURL = `${API_URL}/products/getProduct?page=${pageNo}&limit=${limit}`;
  try {
    const productListPagination = yield request({
      method: 'GET',
      url: requestURL,
    });
    if (productListPagination) {
      yield put(productSuccessByPagination(productListPagination.data));
    }
  } catch (err) {
    yield put(productFailedByPagination(err));
  }
}

export function* addProduct({ payload }) {
  const finalPayload = payload.data;
  const requestURL = `${API_URL}/products/postProduct`;
  const formData = new FormData();
  const { data } = finalPayload;
  formData.append('data', JSON.stringify(data));
  Array.from(finalPayload.photos).forEach(image => {
    formData.append('photos', image);
  });
  try {
    const addProductData = yield request({
      method: 'POST',
      headers: { 'Content-Type': 'multipart/form-data' },
      url: requestURL,
      data: formData,
    });
    if (addProductData) {
      yield put(addProductSuccess(addProductData.data.message));
    }
  } catch (err) {
    yield put(addProductFailed('Product not inserted'));
  }
}

export function* removeProduct({ payload }) {
  const requestURL = `${API_URL}/products/deleteProduct/${payload}`;
  try {
    const removeProductRes = yield request({
      method: 'DELETE',
      url: requestURL,
    });
    if (removeProductRes.status === 200) {
      yield put(removeProductSuccess(removeProductRes.data.message));
    }
  } catch (err) {
    yield put(removeProductFailed('Product not Deleted'));
  }
}

export function* getProductById({ payload }) {
  const requestURL = `${API_URL}/products/getProductById/${payload}`;
  try {
    const getProductByIdRes = yield request({
      method: 'GET',
      url: requestURL,
    });
    if (getProductByIdRes.status === 200) {
      yield put(getProductSuccessById(getProductByIdRes.data));
    }
  } catch (err) {
    yield put(getProductFailedById(err));
  }
}

export function* updateProduct({ payload: { id, product } }) {
  const finalPayload = product;
  const formData = new FormData();
  const { data } = finalPayload;
  formData.append('data', JSON.stringify(data));
  Array.from(finalPayload.newImages).forEach(image => {
    formData.append('photos', image);
  });
  const requestURL = `${API_URL}/products/updateProduct/${id}`;
  try {
    const updateCharacteristicsRes = yield request({
      method: 'PUT',
      headers: { 'Content-Type': 'multipart/form-data' },
      url: requestURL,
      data: formData,
    });
    if (updateCharacteristicsRes.status === 200) {
      yield put(editProductSuccess(updateCharacteristicsRes.data.message));
    }
  } catch (err) {
    yield put(editProductFailed(err));
  }
}

export default function* productData() {
  yield takeLatest(REQUEST_PRODUCT, productList);
  yield takeLatest(REQUEST_ADD_PRODUCT, addProduct);
  yield takeLatest(REQUEST_EDIT_PRODUCT, updateProduct);
  yield takeLatest(REMOVE_PRODUCT, removeProduct);
  yield takeLatest(REQUEST_CATEGORY, categoryListData);
  yield takeLatest(REQUEST_CHARACTERISTICS, characteristicsListData);
  yield takeLatest(REQUEST_GET_PRODUCT_BY_ID, getProductById);
  yield takeLatest(REQUEST_PRODUCT_BY_PAGINATION, productListPaginationData);
}
