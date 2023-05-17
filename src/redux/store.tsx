import { MiddlewareArray, configureStore } from "@reduxjs/toolkit";
import { moviesApi } from "./api/movies/slice";
import { discoverApi } from "./api/discover/slice";
import { genresApi } from "./api/genres/slice";
import paramsSlice from "./params/slice";

const store = configureStore({
  reducer: {
    moviesApi: moviesApi.reducer,

    discoverApi: discoverApi.reducer,
    paramsSlice: paramsSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    (getDefaultMiddleware() /* as MiddlewareArray<any> */).concat([
      moviesApi.middleware,
      discoverApi.middleware,
    ]),
});

export default store;
