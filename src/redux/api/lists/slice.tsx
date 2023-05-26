import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ListDetailsApiResponse } from "./types/ListDetailsType";

const tmdbApiKey = "api_key=684e3f73d1ca0e692a3016c028aabf72";

export const listsApi = createApi({
  reducerPath: "listsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.themoviedb.org/3",
  }),
  endpoints: (builder) => ({
    getListDetails: builder.query({
      query: ({ id, params }) =>
        `/list/${id}?${tmdbApiKey}&${params ? params : ""}`,
      transformResponse: (response: ListDetailsApiResponse) => response,
    }),
  }),
});

export const { useGetListDetailsQuery } = listsApi;
