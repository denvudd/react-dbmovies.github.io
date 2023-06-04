import { configureStore } from "@reduxjs/toolkit";

import { baseApi } from "./api/baseApi/slice";
import paramsSlice from "./params/slice";

import { createWrapper } from "next-redux-wrapper";
import { useDispatch } from "react-redux";

const store = 
  configureStore({
    reducer: {
      baseApi: baseApi.reducer,
      paramsSlice: paramsSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware() /* as MiddlewareArray<any> */
        .concat(baseApi.middleware),
  });

export default store;

// export type AppStore = ReturnType<typeof store>;
// export type RootState = ReturnType<AppStore["getState"]>;
// // export type AppDispatch = AppStore["dispatch"];
// export const useAppDispatch = () => useDispatch<AppDispatch>();
// export const wrapper = createWrapper<AppStore>(store, { debug: true });
