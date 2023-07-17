import { baseApi } from "../baseApi/slice";
import type {
  AuthTokenApiResponse,
  AuthSessionApiResponse,
  AuthDeleteSessionApiResponse,
} from "./types";

const tmdbApiKey = `api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`;

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAuthToken: builder.query<AuthTokenApiResponse, null>({
      query: () => `/authentication/token/new?${tmdbApiKey}`,
      transformResponse: (response: AuthTokenApiResponse) => response,
    }),

    postCreateSession: builder.mutation<AuthSessionApiResponse, string>({
      query: (request_token) => ({
        url: `/authentication/session/new?${tmdbApiKey}`,
        method: "POST",
        body: {
          request_token: request_token,
        },
      }),
      transformResponse: (response: AuthSessionApiResponse) => response,
    }),

    deleteSession: builder.mutation<AuthDeleteSessionApiResponse, string>({
      query: (session_id) => ({
        url: `/authentication/session?${tmdbApiKey}`,
        method: "DELETE",
        body: {
          session_id: session_id,
        },
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
