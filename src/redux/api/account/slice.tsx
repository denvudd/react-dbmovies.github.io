import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AccountDetailsApiResponse } from "./types/AccountDetailsType";
import { AccountListsApiResponse } from "./types/AcountListsType";

const tmdbApiKey = "api_key=684e3f73d1ca0e692a3016c028aabf72";

export const accountApi = createApi({
  reducerPath: "accountApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.themoviedb.org/3",
  }),
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
  }),
});

export const { useLazyGetAccountDetailsQuery, useLazyGetAccountListsQuery } =
  accountApi;
