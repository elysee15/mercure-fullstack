import { combineReducers } from "redux";
import { products } from "./productReducer";

const reducers = combineReducers({
  products,
});

export default reducers;
