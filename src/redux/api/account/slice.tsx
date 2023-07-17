import { baseApi } from "../baseApi/slice";
import type {
  AccountAddToFavoriteApiResponse,
  AccountAddToWatchlistApiResponse,
  AccountDetailsApiResponse,
  AccountListsApiResponse,
  AccountRatedListApiResponse,
  AccountWatchlistMoviesApiResponse,
  AccountFavoriteMoviesApiResponse,
  AccountQueryArgsDefault,
  AccountQueryArgsWithParams,
  AccountAddToWatchlistQueryArgs,
  AccountAddFavoriteQueryArgs,
} from "./types";

const tmdbApiKey = `api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`;

export const accountApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAccountDetails: builder.query<
      AccountDetailsApiResponse,
      AccountQueryArgsDefault
    >({
      query: ({ session_id, account_id }) =>
        `/account/${
          account_id ? account_id : "account_id"
        }?session_id=${session_id}&${tmdbApiKey}`,
      transformResponse: (response: AccountDetailsApiResponse) => response,
    }),

    getAccountLists: builder.query<
      AccountListsApiResponse,
      AccountQueryArgsDefault
    >({
      query: ({ session_id, account_id }) =>
        `/account/${
          account_id ? account_id : "account_id"
        }/lists?page=1&session_id=${session_id}&${tmdbApiKey}`,
      transformResponse: (response: AccountListsApiResponse) => response,
      providesTags: (response) =>
        response
          ? [
              ...response.results.map(({ id }) => ({
                type: "Lists" as const,
                id,
              })),
              { type: "Lists", id: "LIST" },
            ]
          : [{ type: "Lists", id: "LIST" }],
    }),

    getAccountRated: builder.query<
      AccountRatedListApiResponse,
      AccountQueryArgsWithParams
    >({
      query: ({ session_id, account_id, params, type }) =>
        `/account/${
          account_id ? account_id : "account_id"
        }/rated/${type}?session_id=${session_id}&${tmdbApiKey}&page=1&${params}`,
      transformResponse: (response: AccountRatedListApiResponse) => response,
      providesTags: (response) =>
        response
          ? [
              ...response.results.map(({ id }) => ({
                type: "Rates" as const,
                id,
              })),
              ...response.results.map(({ id }) => ({
                type: "Watchlist" as const,
                id,
              })),
              { type: "Rates", id: "LIST" },
              { type: "Watchlist", id: "LIST" },
            ]
          : [
              { type: "Rates", id: "LIST" },
              { type: "Watchlist", id: "LIST" },
            ],
    }),

    getAccountWatchlist: builder.query<
      AccountWatchlistMoviesApiResponse,
      AccountQueryArgsWithParams
    >({
      query: ({ session_id, account_id, params, type }) =>
        `/account/${
          account_id ? account_id : "account_id"
        }/watchlist/${type}?session_id=${session_id}&${tmdbApiKey}&page=1&${params}`,
      transformResponse: (response: AccountWatchlistMoviesApiResponse) =>
        response,
      providesTags: (response) =>
        response
          ? [
              ...response.results.map(({ id }) => ({
                type: "Rates" as const,
                id,
              })),
              ...response.results.map(({ id }) => ({
                type: "Watchlist" as const,
                id,
              })),
              { type: "Rates", id: "LIST" },
              { type: "Watchlist", id: "LIST" },
            ]
          : [
              { type: "Rates", id: "LIST" },
              { type: "Watchlist", id: "LIST" },
            ],
    }),

    getAccountFavorite: builder.query<
      AccountFavoriteMoviesApiResponse,
      AccountQueryArgsWithParams
    >({
      query: ({ session_id, account_id, params, type }) =>
        `/account/${
          account_id ? account_id : "account_id"
        }/favorite/${type}?session_id=${session_id}&${tmdbApiKey}&page=1&${params}`,
      transformResponse: (response: AccountFavoriteMoviesApiResponse) =>
        response,
      providesTags: (response) =>
        response
          ? [
              ...response.results.map(({ id }) => ({
                type: "Favorite" as const,
                id,
              })),
              { type: "Favorite", id: "LIST" },
            ]
          : [{ type: "Favorite", id: "LIST" }],
    }),

    postAddToWatchlist: builder.mutation<
      AccountAddToWatchlistApiResponse,
      AccountAddToWatchlistQueryArgs
    >({
      query: ({ session_id, account_id, media_type, media_id, watchlist }) => ({
        url: `/account/${
          account_id ? account_id : "account_id"
        }/watchlist?session_id=${session_id}&${tmdbApiKey}`,
        method: "POST",
        body: {
          media_type: media_type,
          media_id: media_id,
          watchlist: watchlist,
        },
      }),
      transformResponse: (response: AccountAddToWatchlistApiResponse) =>
        response,
      // manual cache update because the API doesn't always manage to process the mutation in time
      async onQueryStarted(props, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        setTimeout(() => {
          dispatch(
            baseApi.util.invalidateTags([{ type: "Watchlist", id: "LIST" }])
          );
        }, 500);
      },
    }),

    postAddToFavorite: builder.mutation<
      AccountAddToFavoriteApiResponse,
      AccountAddFavoriteQueryArgs
    >({
      query: ({ session_id, account_id, media_type, media_id, favorite }) => ({
        url: `/account/${
          account_id ? account_id : "account_id"
        }/favorite?session_id=${session_id}&${tmdbApiKey}`,
        method: "POST",
        body: {
          media_type: media_type,
          media_id: media_id,
          favorite: favorite,
        },
      }),
      transformResponse: (response: AccountAddToFavoriteApiResponse) =>
        response,
      // manual cache update because the API doesn't always manage to process the mutation in time
      async onQueryStarted(props, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        setTimeout(() => {
          dispatch(
            baseApi.util.invalidateTags([{ type: "Favorite", id: "LIST" }])
          );
        }, 500);
      },
    }),
  }),
});

export const {
  useGetAccountDetailsQuery,
  useGetAccountListsQuery,
  usePostAddToWatchlistMutation,
  usePostAddToFavoriteMutation,
  useLazyGetAccountDetailsQuery,
  useLazyGetAccountListsQuery,
  useLazyGetAccountRatedQuery,
  useLazyGetAccountFavoriteQuery,
  useLazyGetAccountWatchlistQuery,
} = accountApi;
