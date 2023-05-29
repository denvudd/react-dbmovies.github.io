import { MovieDiscoverApiResponse } from "./types/MovieDiscoverType";
import { baseApi } from "../baseApi/slice";

const tmdbApiKey = "api_key=684e3f73d1ca0e692a3016c028aabf72";

export const discoverApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMovieDiscover: builder.query({
      query: (params) => `/discover/movie?${tmdbApiKey}&${params}`,
      transformResponse: (response: MovieDiscoverApiResponse) => response,
    }),
  }),
});

export const { useLazyGetMovieDiscoverQuery, useGetMovieDiscoverQuery } = discoverApi;
