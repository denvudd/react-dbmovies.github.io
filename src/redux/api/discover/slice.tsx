import { baseApi } from "../baseApi/slice";
import type { MovieListApiResponse } from "../movies/types";
import type { TVListApiResponse } from "../tv/types";

const tmdbApiKey = "api_key=684e3f73d1ca0e692a3016c028aabf72";

export const discoverApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMovieDiscover: builder.query<MovieListApiResponse, string | undefined>({
      query: (params) => `/discover/movie?${tmdbApiKey}&${params}`,
      transformResponse: (response: MovieListApiResponse) => response,
    }),

    getTVDiscover: builder.query<TVListApiResponse, string | undefined>({
      query: (params) => `/discover/tv?${tmdbApiKey}&${params}`,
      transformResponse: (response: TVListApiResponse) => response,
    }),
  }),
});

export const {
  useLazyGetMovieDiscoverQuery,
  useLazyGetTVDiscoverQuery,
} = discoverApi;
