import { configureStore } from "@reduxjs/toolkit";

import { baseApi } from "./api/baseApi/slice";
import paramsSlice from "./params/slice";

import { useDispatch } from "react-redux";

const store = configureStore({
  reducer: {
    baseApi: baseApi.reducer,
    paramsSlice: paramsSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware() /* as MiddlewareArray<any> */
      .concat(baseApi.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
