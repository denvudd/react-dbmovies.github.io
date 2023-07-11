import { baseApi } from "../baseApi/slice";
import type { MovieListApiResponse } from "../movies/types";
import type { TVListApiResponse } from "../tv/types";
import type { NetworkDetailsApiResponse } from "./types/NetworkDetailsType";
import type {
  WatchProvidersApiResponse,
  WatchProvidersQueryArgs,
} from "./types/WatchProvidersType";

const tmdbApiKey = "api_key=684e3f73d1ca0e692a3016c028aabf72";

export const discoverApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMovieDiscover: builder.query<MovieListApiResponse, string | undefined>({
      query: (params) => `/discover/movie?${tmdbApiKey}&${params}`,
      transformResponse: (response: MovieListApiResponse) => response,
    }),

    getTVDiscover: builder.query<TVListApiResponse, string | undefined>({
      query: (params) => `/discover/tv?${tmdbApiKey}&${params}`,
      transformResponse: (response: TVListApiResponse) => response,
    }),

    getKeywordDetails: builder.query<{ name: string; id: number }, number>({
      query: (id) => `/keyword/${id}?${tmdbApiKey}`,
      transformResponse: (response: { name: string; id: number }) => response,
    }),

    getNetworkDetails: builder.query<NetworkDetailsApiResponse, number>({
      query: (id) => `/network/${id}?${tmdbApiKey}`,
      transformResponse: (response: NetworkDetailsApiResponse) => response,
    }),

    getWatchProviders: builder.query<
      WatchProvidersApiResponse,
      WatchProvidersQueryArgs
    >({
      query: ({ language, watch_region, type }) =>
        `/watch/providers/${type}?language=${language}&watch_region=${watch_region}&${tmdbApiKey}`,
      transformResponse: (response: WatchProvidersApiResponse) => response,
    }),
  }),
});

export const {
  useGetWatchProvidersQuery,
  useLazyGetMovieDiscoverQuery,
  useLazyGetTVDiscoverQuery,
  useLazyGetKeywordDetailsQuery,
  useLazyGetNetworkDetailsQuery,
} = discoverApi;
