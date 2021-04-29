import { put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { CONSTANT } from '../../enum';
import {
  REQUEST_CATEGORY,
  REQUEST_CATEGORY_BY_PAGINATION,
  REQUEST_ADD_CATEGORY,
  REMOVE_CATEGORY,
  REQUEST_EDIT_CATEGORY,
  REQUEST_GET_CATEGORY_BY_ID,
} from './constants';
import {
  categoryFailed,
  categorySuccess,
  addCategorySuccess,
  addCategoryFailed,
  removeCategorySuccess,
  removeCategoryFailed,
  editCategorySuccess,
  editCategoryFailed,
  getCategorySuccessById,
  getCategoryFailedById,
  categorySuccessByPagination,
  categoryFailedByPagination,
} from './actions';

const { API_URL } = CONSTANT;

export function* categoryListPaginationData() {

  const requestURL = `${API_URL}/categories`;
  console.log(requestURL);
  try {
    const categoryList = yield request({
      method: 'GET',
      url: requestURL,
    });
    if (categoryList) {
      yield put(categorySuccess(categoryList.data));
    }
  } catch (err) {
    yield put(categoryFailed(err));
  }
}

// export function* categoryListPaginationData({ payload: { page, limit } }) {
//   const pageNo = page === undefined ? 1 : page;
//   const requestURL = `${API_URL}/masterTable/getCategory?page=${pageNo}&limit=${limit}`;
//   try {
//     const categoryListPagination = yield request({
//       method: 'GET',
//       url: requestURL,
//     });
//     if (categoryListPagination) {
//       yield put(categorySuccessByPagination(categoryListPagination.data));
//     }
//   } catch (err) {
//     yield put(categoryFailedByPagination(err));
//   }
// }

export function* addCategory({ payload }) {
  const requestURL = `${API_URL}/category`;
  try {
    const addCategoryRes = yield request({
      method: 'POST',
      url: requestURL,
      data: payload,
    });
    if (addCategoryRes.status === 200) {
      yield put(addCategorySuccess(addCategoryRes.data.message));
    }
  } catch (err) {
    yield put(addCategoryFailed('Category Not Inserted'));
  }
}

export function* removeCategory({ payload }) {
  const requestURL = `${API_URL}/category/${payload}`;
  try {
    const removeCategoryRes = yield request({
      method: 'DELETE',
      url: requestURL,
    });
    if (removeCategoryRes.status === 200) {
      yield put(removeCategorySuccess(removeCategoryRes.data.message));
    }
  } catch (err) {
    yield put(removeCategoryFailed('Category Not Deleted'));
  }
}

export function* getCategoryById({ payload }) {
  const requestURL = `${API_URL}/category/${payload}`;
  try {
    const getCategoryByIdRes = yield request({
      method: 'GET',
      url: requestURL,
    });
    if (getCategoryByIdRes.status === 200) {
      yield put(getCategorySuccessById(getCategoryByIdRes.data));
    }
  } catch (err) {
    yield put(getCategoryFailedById(err));
  }
}

export function* updateCategory({ payload: { id, category } }) {
  const requestURL = `${API_URL}/category/${id}`;
  try {
    const updateCategoryRes = yield request({
      method: 'PUT',
      url: requestURL,
      data: category,
    });
    if (updateCategoryRes.status === 200) {
      yield put(editCategorySuccess(updateCategoryRes.data.message));
    }
  } catch (err) {
    yield put(editCategoryFailed(err));
  }
}

export default function* categoryData() {
  //yield takeLatest(REQUEST_CATEGORY, categoryListData);
  yield takeLatest(REQUEST_CATEGORY_BY_PAGINATION, categoryListPaginationData);
  yield takeLatest(REQUEST_ADD_CATEGORY, addCategory);
  yield takeLatest(REMOVE_CATEGORY, removeCategory);
  yield takeLatest(REQUEST_EDIT_CATEGORY, updateCategory);
  yield takeLatest(REQUEST_GET_CATEGORY_BY_ID, getCategoryById);
}
