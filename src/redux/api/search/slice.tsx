import { baseApi } from "../baseApi/slice";
import type {
  SearchMultiApiResponse,
  SearchMovieApiResponse,
  SearchKeywordApiResponse,
  SearchQueryArgsDefault,
} from "./types";

const tmdbApiKey = "api_key=684e3f73d1ca0e692a3016c028aabf72";

export const searchApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSearchMulti: builder.query<
      SearchMultiApiResponse,
      SearchQueryArgsDefault
    >({
      query: ({ query, params }) =>
        `/search/multi?${tmdbApiKey}&${params ? params : ""}&query=${
          query ? query : ""
        }`,
      transformResponse: (response: SearchMultiApiResponse) => response,
    }),

    getSearchMovie: builder.query<
      SearchMovieApiResponse,
      SearchQueryArgsDefault
    >({
      query: ({ query, params }) =>
        `/search/movie?${tmdbApiKey}&${params ? params : ""}&query=${
          query ? query : ""
        }`,
      transformResponse: (response: SearchMovieApiResponse) => response,
    }),

    getSearchKeywords: builder.query<
      SearchKeywordApiResponse["results"],
      string
    >({
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
