import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SearchKeywordApiResponse } from "./types/SearchKeywordType";

const tmdbApiKey = "api_key=684e3f73d1ca0e692a3016c028aabf72";

export const searchApi = createApi({
  reducerPath: "searchApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.themoviedb.org/3",
  }),
  endpoints: (builder) => ({
    getSearchKeywords: builder.query({
      query: (query) => `/search/keyword?${tmdbApiKey}&query=${query ? query : ""}`,
      transformResponse: (response: SearchKeywordApiResponse) => response.results,
    }),
  }),
});

export const { useLazyGetSearchKeywordsQuery } = searchApi;
