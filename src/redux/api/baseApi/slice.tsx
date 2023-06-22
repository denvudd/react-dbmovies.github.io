import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.themoviedb.org/3",
  }),
  tagTypes: ["Lists", "Rates", "Watchlist", "Favorite"],
  endpoints: (_) => ({}),
});
