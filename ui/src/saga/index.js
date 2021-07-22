import { all } from "redux-saga/effects";
import watchOnNewEvents from "./eventsSaga";
import productSaga from "./productSaga";

export default function* rootSaga() {
  yield all([productSaga(), watchOnNewEvents()]);
}
