import { call, put, takeEvery } from "redux-saga/effects";
import { instance } from "../api";
import * as types from "../store/constants/actionTypes";

function* fetchProducts() {
  try {
    const { data } = yield call(instance.get, "http://localhost:3500/products");
    yield put({ type: types.FETCH_PRODUCT_SUCCESS, payload: data });
  } catch (e) {
    yield put({ type: types.FETCH_PRODUCT_FAILED, error: e.message });
  }
}

function* productSaga() {
  yield takeEvery([types.FETCH_PRODUCT], fetchProducts);
}

export default productSaga;
