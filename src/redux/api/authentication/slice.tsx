import { AuthTokenApiResponse } from "./types/AuthTokenType";
import { AuthSessionApiResponse } from "./types/AuthSessionType";
import { baseApi } from "../baseApi/slice";
import { AuthDeleteSessionApiResponse } from "./types/AuthDeleteSessionType";

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
        body: request_token,
      }),
      transformResponse: (response: AuthSessionApiResponse) => response,
    }),

    deleteSession: builder.mutation({
      query: (session_id) => ({
        url: `/authentication/session?${tmdbApiKey}`,
        method: "DELETE",
        body: session_id,
      }),
      transformResponse: (response: AuthDeleteSessionApiResponse) => response,
    }),
  }),
});

export const {
  useLazyGetAuthTokenQuery,
  usePostCreateSessionMutation,
  useDeleteSessionMutation,
} = authApi;
