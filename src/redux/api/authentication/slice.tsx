import { AuthTokenApiResponse } from "./types/AuthTokenType";
import { AuthSessionApiResponse } from "./types/AuthSessionType";
import { baseApi } from "../baseApi/slice";

const tmdbApiKey = "api_key=684e3f73d1ca0e692a3016c028aabf72";

export const authApi = baseApi.injectEndpoints({
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
