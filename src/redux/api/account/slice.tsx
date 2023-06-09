import { baseApi } from "../baseApi/slice";
import { AccountDetailsApiResponse } from "./types/AccountDetailsType";
import { AccountListsApiResponse } from "./types/AcountListsType";
import { AccountRatedMovieListApiResponse } from "./types/AccoutRatedMovieType";
import { AccountWatchlistMoviesApiResponse } from "./types/AccoutWatchlistMovieType";
import { AccountAddToWatchlistApiResponse } from "./types/AccountAddToWatchlistType";
import { AccountAddToFavoriteApiResponse } from "./types/AccountAddToFavoriteType";

const tmdbApiKey = "api_key=684e3f73d1ca0e692a3016c028aabf72";

export const accountApi = baseApi.injectEndpoints({
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
      providesTags: ["Lists"],
    }),

    getAccountRatedMovies: builder.query({
      query: ({ session_id, account_id, params }) =>
        `/account/${
          account_id ? account_id : "account_id"
        }/rated/movies?session_id=${session_id}&${tmdbApiKey}&page=1&${params}`,
      transformResponse: (response: AccountRatedMovieListApiResponse) =>
        response,
      providesTags: ["Rates", "Watchlist"],
    }),

    getAccountWatchlistMovies: builder.query({
      query: ({ session_id, account_id, params }) =>
        `/account/${
          account_id ? account_id : "account_id"
        }/watchlist/movies?session_id=${session_id}&${tmdbApiKey}&page=1&${params}`,
      transformResponse: (response: AccountWatchlistMoviesApiResponse) =>
        response,
      providesTags: ["Watchlist", "Rates"],
    }),

    getAccountFavoriteMovies: builder.query({
      query: ({ session_id, account_id, params }) =>
        `/account/${
          account_id ? account_id : "account_id"
        }/favorite/movies?session_id=${session_id}&${tmdbApiKey}&page=1&${params}`,
      transformResponse: (response: AccountWatchlistMoviesApiResponse) =>
        response,
      providesTags: ["Favorite"],
    }),

    postAddToWatchlist: builder.mutation({
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
          dispatch(baseApi.util.invalidateTags(["Watchlist"]));
        }, 500);
      },
    }),

    postAddToFavorite: builder.mutation({
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
      transformResponse: (response: AccountAddToFavoriteApiResponse) => response,
      // manual cache update because the API doesn't always manage to process the mutation in time
      async onQueryStarted(props, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        setTimeout(() => {
          dispatch(baseApi.util.invalidateTags(["Favorite"]));
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
  useLazyGetAccountRatedMoviesQuery,
  useLazyGetAccountWatchlistMoviesQuery,
  useLazyGetAccountFavoriteMoviesQuery,
} = accountApi;
