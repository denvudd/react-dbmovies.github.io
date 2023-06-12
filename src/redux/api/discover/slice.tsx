import { baseApi } from "../baseApi/slice";
import type { MovieDiscoverApiResponse } from "./types/MovieDiscoverType";

const tmdbApiKey = "api_key=684e3f73d1ca0e692a3016c028aabf72";

export const discoverApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMovieDiscover: builder.query<
      MovieDiscoverApiResponse,
      string | undefined
    >({
      query: (params) => `/discover/movie?${tmdbApiKey}&${params}`,
      transformResponse: (response: MovieDiscoverApiResponse) => response,
    }),
  }),
});

export const { useLazyGetMovieDiscoverQuery, useGetMovieDiscoverQuery } =
  discoverApi;
