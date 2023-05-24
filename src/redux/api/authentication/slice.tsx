import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AuthTokenApiResponse } from "./types/AuthTokenType";
import { AuthSessionApiResponse } from "./types/AuthSessionType";

const tmdbApiKey = "api_key=684e3f73d1ca0e692a3016c028aabf72";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.themoviedb.org/3",
  }),
  endpoints: (builder) => ({
    getAuthToken: builder.query({
      query: () => `/authentication/token/new?${tmdbApiKey}`,
      transformResponse: (response: AuthTokenApiResponse) => response,
    }),
    postCreateSession: builder.mutation({
      query: (request_token) => ({
        url: `/authentication/session/new?${tmdbApiKey}`,
        method: "POST",
        body: request_token
      }),
      transformResponse: (response: AuthSessionApiResponse) => response,
    }),
  }),
});

export const { useLazyGetAuthTokenQuery, usePostCreateSessionMutation } = authApi;
