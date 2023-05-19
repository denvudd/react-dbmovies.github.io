import { MiddlewareArray, configureStore } from "@reduxjs/toolkit";
import { moviesApi } from "./api/movies/slice";
import { discoverApi } from "./api/discover/slice";
import { genresApi } from "./api/genres/slice";
import paramsSlice from "./params/slice";
import { useDispatch } from "react-redux";

const store = configureStore({
  reducer: {
    moviesApi: moviesApi.reducer,
    genresApi: genresApi.reducer,
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

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
