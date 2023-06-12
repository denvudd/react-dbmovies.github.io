import { baseApi } from "../baseApi/slice";
import type { TrendingAllApiResponse } from "./types/TrendingAllType";

const tmdbApiKey = "api_key=684e3f73d1ca0e692a3016c028aabf72";

export const trendingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTrendingAll: builder.query({
      query: ({ time_window, params }) =>
        `/trending/all/${time_window}?${tmdbApiKey}&${params ? params : ""}`,
      transformResponse: (response: TrendingAllApiResponse) => response,
    }),
  }),
});

export const {
  useGetTrendingAllQuery,
  useLazyGetTrendingAllQuery
} = trendingApi;
