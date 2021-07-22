import * as types from "../constants/actionTypes";
import { createAction } from "@reduxjs/toolkit";

export const getProducts = createAction(types.FETCH_PRODUCT);
export const getProductsSucess = createAction(types.FETCH_PRODUCT_SUCCESS);
export const getProductsError = createAction(types.FETCH_PRODUCT_FAILED);

export const createProduct = createAction(types.CREATE_PRODUCT);
export const createProductSuccess = createAction(types.CREATE_PRODUCT_SUCCESS);
export const createProductFailed = createAction(types.CREATE_PRODUCT_FAILED);
