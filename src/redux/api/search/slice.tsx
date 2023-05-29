import { SearchKeywordApiResponse } from "./types/SearchKeywordType";
import { baseApi } from "../baseApi/slice";

const tmdbApiKey = "api_key=684e3f73d1ca0e692a3016c028aabf72";

export const searchApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSearchKeywords: builder.query({
      query: (query) => `/search/keyword?${tmdbApiKey}&query=${query ? query : ""}`,
      transformResponse: (response: SearchKeywordApiResponse) => response.results,
    }),
  }),
});

export const { useLazyGetSearchKeywordsQuery } = searchApi;
