import { baseApi } from "../baseApi/slice";
import type {
  SearchMultiApiResponse,
  SearchMovieApiResponse,
  SearchKeywordApiResponse,
} from "./types";

const tmdbApiKey = "api_key=684e3f73d1ca0e692a3016c028aabf72";

export const searchApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSearchMulti: builder.query({
      query: ({ query, params }) =>
        `/search/multi?${tmdbApiKey}&${params ? params : ""}&query=${
          query ? query : ""
        }`,
      transformResponse: (response: SearchMultiApiResponse) => response,
    }),

    getSearchMovie: builder.query({
      query: ({ query, params }) =>
        `/search/movie?${tmdbApiKey}&${params ? params : ""}&query=${
          query ? query : ""
        }`,
      transformResponse: (response: SearchMovieApiResponse) => response,
    }),

    getSearchKeywords: builder.query({
      query: (query) =>
        `/search/keyword?${tmdbApiKey}&query=${query ? query : ""}`,
      transformResponse: (response: SearchKeywordApiResponse) =>
        response.results,
    }),
  }),
});

export const {
  useLazyGetSearchMultiQuery,
  useLazyGetSearchMovieQuery,
  useLazyGetSearchKeywordsQuery,
} = searchApi;
