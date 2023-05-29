import { MiddlewareArray, configureStore } from "@reduxjs/toolkit";

import { authApi } from "./api/authentication/slice";
import { accountApi } from "./api/account/slice";
import { listsApi } from "./api/lists/slice";
import { moviesApi } from "./api/movies/slice";
import { discoverApi } from "./api/discover/slice";
import { genresApi } from "./api/genres/slice";
import { searchApi } from "./api/search/slice";
import { configurationApi } from "./api/configuration/slice";
import { apiSlice } from "./api/baseApi/slice";
import paramsSlice from "./params/slice";

import { createWrapper } from "next-redux-wrapper";
import { useDispatch } from "react-redux";

const store = () =>
  configureStore({
    reducer: {
      authApi: authApi.reducer,
      [apiSlice.reducerPath]:apiSlice.reducer,
      accountApi: accountApi.reducer,
      listsApi: listsApi.reducer,
      moviesApi: moviesApi.reducer,
      genresApi: genresApi.reducer,
      discoverApi: discoverApi.reducer,
      searchApi: searchApi.reducer,
      configurationApi: configurationApi.reducer,
      paramsSlice: paramsSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware() /* as MiddlewareArray<any> */
        .concat([
          apiSlice.middleware,
          authApi.middleware,
          accountApi.middleware,
          listsApi.middleware,
          moviesApi.middleware,
          genresApi.middleware,
          discoverApi.middleware,
          searchApi.middleware,
          configurationApi.middleware,
        ]),
  });

export default store;

export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const wrapper = createWrapper<AppStore>(store, { debug: true });
