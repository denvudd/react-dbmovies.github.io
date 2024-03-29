import { baseApi } from "../baseApi/slice";
import type {
  TrendingAllApiResponse,
  TrendingMoviesApiResponse,
  TrendingTVApiResponse,
} from "./types";

const tmdbApiKey = `api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`;

export const trendingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTrendingAll: builder.query<
      TrendingAllApiResponse,
      { time_window: "day" | "week"; params?: string }
    >({
      query: ({ time_window, params }) =>
        `/trending/all/${time_window}?${tmdbApiKey}&${params ? params : ""}`,
      transformResponse: (response: TrendingAllApiResponse) => response,
    }),

    getTrendingMovies: builder.query<
      TrendingMoviesApiResponse,
      { time_window: "day" | "week"; params?: string }
    >({
      query: ({ time_window, params }) =>
        `/trending/movie/${time_window}?${tmdbApiKey}&${params ? params : ""}`,
      transformResponse: (response: TrendingMoviesApiResponse) => response,
    }),

    getTrendingTV: builder.query<
      TrendingTVApiResponse,
      { time_window: "day" | "week"; params?: string }
    >({
      query: ({ time_window, params }) =>
        `/trending/tv/${time_window}?${tmdbApiKey}&${params ? params : ""}`,
      transformResponse: (response: TrendingTVApiResponse) => response,
    }),
  }),
});

export const {
  useGetTrendingAllQuery,
  useLazyGetTrendingAllQuery,
  useLazyGetTrendingMoviesQuery,
  useLazyGetTrendingTVQuery,
} = trendingApi;
