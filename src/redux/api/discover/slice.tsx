import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { MovieDiscoverApiResponse } from "./types/MovieDiscoverType";

const tmdbApiKey = "api_key=684e3f73d1ca0e692a3016c028aabf72";

export const discoverApi = createApi({
  reducerPath: "discoverApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.themoviedb.org/3",
  }),
  endpoints: (builder) => ({
    getMovieDiscover: builder.query({
      query: (params) => `/discover/movie?${tmdbApiKey}&${params}`,
      transformResponse: (response: MovieDiscoverApiResponse) => response.results,
    }),
  }),
});

export const { useLazyGetMovieDiscoverQuery, useGetMovieDiscoverQuery } = discoverApi;
