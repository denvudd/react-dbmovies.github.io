import { AccountDetailsApiResponse } from "./types/AccountDetailsType";
import { AccountListsApiResponse } from "./types/AcountListsType";
import { baseApi } from "../baseApi/slice";
import { AccountRatedMovieListApiResponse } from "./types/AccoutRatedMovieType";
import { AccountWatchlistMoviesApiResponse } from "./types/AccoutWatchlistMovieType";
import { AccountAddToWatchlistType } from "./types/AccountAddToWatchlistType";

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

    postAddToWatchlist: builder.mutation({
      query: ({ session_id, account_id, media_type, media_id, watchlist }) => ({
        url: `/account/${
          account_id ? account_id : "account_id"
        }/watchlist?session_id=${session_id}&${tmdbApiKey}`,
        method: "POST",
        body: {
          media_type: media_type,
          media_id: media_id,
          watchlist: watchlist
        }
      }),
      transformResponse: (response: AccountAddToWatchlistType) =>
        response,
      invalidatesTags: ["Watchlist"],
    }),
  }),
});

export const {
  useGetAccountDetailsQuery,
  useGetAccountListsQuery,
  usePostAddToWatchlistMutation,
  useLazyGetAccountDetailsQuery,
  useLazyGetAccountListsQuery,
  useLazyGetAccountRatedMoviesQuery,
  useLazyGetAccountWatchlistMoviesQuery,
} = accountApi;
