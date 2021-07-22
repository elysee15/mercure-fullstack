import { createReducer } from "@reduxjs/toolkit";
import * as types from "../constants/actionTypes";

const initialState = {
  data: [],
  isLoading: false,
};

export const products = createReducer(initialState, (builder) => {
  builder
    .addCase(types.FETCH_PRODUCT, (state) => {
      return {
        ...state,
        isLoading: true,
      };
    })
    .addCase(types.FETCH_PRODUCT_SUCCESS, (state, { payload }) => {
      return {
        data: [...payload],
        isLoading: false,
      };
    })
    .addCase(types.FETCH_PRODUCT_FAILED, (state, { error }) => {
      return {
        error,
        isLoading: true,
      };
    })
    .addCase(types.CREATE_PRODUCT_SUCCESS, (state, { payload }) => {
      const data = JSON.parse(payload).data;
      console.log("[Reducer]", data);
      return {
        ...state,
        data: [...state.data, data],
        isLoading: false,
      };
    });
});

export const createProduct = createReducer(
  {
    data: [],
    isLoading: false,
  },
  (builder) => {
    builder
      .addCase(types.CREATE_PRODUCT, (state) => {
        return {
          ...state,
          isLoading: true,
        };
      })
      .addCase(types.CREATE_PRODUCT_SUCCESS, (state, { payload }) => {
        console.log("[Reducer]", payload);
        return {
          data: [...payload],
          isLoading: false,
        };
      })
      .addCase(types.CREATE_PRODUCT_FAILED, (state, { error }) => {
        return {
          error,
          isLoading: true,
        };
      });
  }
);
