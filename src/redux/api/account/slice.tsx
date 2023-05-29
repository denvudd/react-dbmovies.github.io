import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AccountDetailsApiResponse } from "./types/AccountDetailsType";
import { AccountListsApiResponse } from "./types/AcountListsType";
import { apiSlice } from "../baseApi/slice";

const tmdbApiKey = "api_key=684e3f73d1ca0e692a3016c028aabf72";

export const accountApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAccountDetails: builder.query({
      query: ({ session_id, account_id }) =>
        `/account/${
          account_id ? account_id : "account_id"
        }?session_id=${session_id}&${tmdbApiKey}`,
      transformResponse: (response: AccountDetailsApiResponse) => response,
    }),
    getAccountLists: builder.query({
      query: ({ session_id, account_id }) =>
        `/account/${
          account_id ? account_id : "account_id"
        }/lists?page=1&session_id=${session_id}&${tmdbApiKey}`,
      transformResponse: (response: AccountListsApiResponse) => response,
    }),
  })
});

export const {
  useGetAccountDetailsQuery,
  useGetAccountListsQuery,
  useLazyGetAccountDetailsQuery,
  useLazyGetAccountListsQuery,
} = accountApi;


