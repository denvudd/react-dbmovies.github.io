import { baseApi } from "../baseApi/slice";
import type {
  AddTVRatingApiResponse,
  AddTVRatingQueryArgs,
  TVAccountStatesApiResponse,
  TVAccountStatesQueryArgs,
  TVContentRatingApiResponse,
  TVLastCreditsApiResponse,
  TVDetailsApiResponse,
  TVImagesApiResponse,
  TVListApiResponse,
  TVListQueryArgs,
  TVVideosApiResponse,
  TVReviewsApiResponse,
  TVRecsApiResponse,
  TVKeywordApiResponse,
  TVExternalIDsApiResponse,
  TVAggregateCreditsApiResponse
} from "./types";

import type { Video } from "../types/common";

const tmdbApiKey = "api_key=684e3f73d1ca0e692a3016c028aabf72";

export const tvApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTV: builder.query<TVListApiResponse, TVListQueryArgs>({
      query: ({ typeList, params }) =>
        `/tv/${typeList}?${tmdbApiKey}&${params ? params : ""}`,
      transformResponse: (response: TVListApiResponse) => response,
    }),

    getTVDetails: builder.query<
      TVDetailsApiResponse,
      { id: number; params?: string }
    >({
      query: ({ id, params }) =>
        `/tv/${id}?${tmdbApiKey}&${params ? params : ""}`,
      transformResponse: (response: TVDetailsApiResponse) => response,
    }),

    getTVAccoutStates: builder.query<
      TVAccountStatesApiResponse,
      TVAccountStatesQueryArgs
    >({
      query: ({ tv_id, session_id }) =>
        `/tv/${tv_id}/account_states?${tmdbApiKey}&session_id=${
          session_id ? session_id : ""
        }`,
      transformResponse: (response: TVAccountStatesApiResponse) => response,
      providesTags: [
        { type: "Rates", id: "LIST" },
        { type: "Watchlist", id: "LIST" },
        { type: "Favorite", id: "LIST" },
      ],
    }),

    getTVCreditsCast: builder.query<
    TVLastCreditsApiResponse,
      { id: number; params?: string }
    >({
      query: ({ id, params }) =>
        `/tv/${id}/credits?${tmdbApiKey}&${params ? params : ""}`,
      transformResponse: (response: TVLastCreditsApiResponse) => response,
    }),

    getTVAggregateCreditsCast: builder.query<
    TVAggregateCreditsApiResponse,
      { id: number; params?: string }
    >({
      query: ({ id, params }) =>
        `/tv/${id}/aggregate_credits?${tmdbApiKey}&${params ? params : ""}`,
      transformResponse: (response: TVAggregateCreditsApiResponse) => response,
    }),

    getTVExternalIds: builder.query<TVExternalIDsApiResponse, number>({
      query: (id) => `/tv/${id}/external_ids?${tmdbApiKey}`,
      transformResponse: (response: TVExternalIDsApiResponse) => response,
    }),

    getTVCertificate: builder.query<string | undefined, number>({
      query: (id) => `/tv/${id}/content_ratings?${tmdbApiKey}`,
      transformResponse: (response: TVContentRatingApiResponse) => {
        const certificates = response.results;

        // get only one certificate else return undefined
        if (certificates) {
          const usCertificate = certificates.find(
            (certificate) => certificate.iso_3166_1 === "US"
          );

          return usCertificate ? usCertificate.rating : undefined;
        } else {
          return undefined;
        }
      },
    }),

    getTVImages: builder.query<
      TVImagesApiResponse,
      { id: number; params?: string }
    >({
      query: ({ id, params }) =>
        `/tv/${id}/images?${tmdbApiKey}&${params ? params : ""}`,
      transformResponse: (response: TVImagesApiResponse) => response,
    }),

    getTVVideos: builder.query<
      Video[] | undefined,
      { id: number; params?: string }
    >({
      query: ({ id, params }) =>
        `/tv/${id}/videos?${tmdbApiKey}&${params ? params : ""}`,
      transformResponse: (response: TVVideosApiResponse) => {
        const videos = response.results;

        // get only youtube videos else retun undefined
        if (videos) {
          const youtubeVideos = videos.filter((video) => {
            return video.site === "YouTube";
          });

          return youtubeVideos;
        } else {
          return undefined;
        }
      },
    }),

    getTVRecs: builder.query<
      TVRecsApiResponse["results"],
      { id: number; params?: string }
    >({
      query: ({ id, params }) =>
        `/tv/${id}/recommendations?${tmdbApiKey}&${params ? params : ""}`,
      transformResponse: (response: TVRecsApiResponse) => response.results,
    }),

    getTVReviews: builder.query<
      TVReviewsApiResponse,
      { id: number; params?: string }
    >({
      query: ({ id, params }) =>
        `/tv/${id}/reviews?${tmdbApiKey}&${params ? params : ""}`,
      transformResponse: (response: TVReviewsApiResponse) => response,
    }),

    getTVKeywords: builder.query<
      TVKeywordApiResponse["results"],
      number
    >({
      query: (id) =>
        `/tv/${id}/keywords?${tmdbApiKey}`,
      transformResponse: (response: TVKeywordApiResponse) =>
        response.results,
    }),

    postAddTVRating: builder.mutation<
      AddTVRatingApiResponse,
      AddTVRatingQueryArgs
    >({
      query: ({ session_id, series_id, rating }) => ({
        url: `/tv/${series_id}/rating?session_id=${session_id}&${tmdbApiKey}`,
        method: "POST",
        body: {
          value: rating,
        },
      }),
      transformResponse: (response: AddTVRatingApiResponse) => response,
      // manual cache update because the API doesn't always manage to process the mutation in time
      async onQueryStarted(props, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        setTimeout(() => {
          dispatch(
            baseApi.util.invalidateTags([
              { type: "Rates", id: "LIST" },
              { type: "Watchlist", id: "LIST" },
            ])
          );
        }, 500);
      },
    }),
  }),
});

export const {
  useGetTVQuery,
  useGetTVDetailsQuery,
  useGetTVCreditsCastQuery,
  useGetTVAggregateCreditsCastQuery,
  useGetTVCertificateQuery,
  useGetTVRecsQuery,
  useGetTVReviewsQuery,
  useGetTVKeywordsQuery,
  useGetTVExternalIdsQuery,
  useLazyGetTVQuery,
  useLazyGetTVImagesQuery,
  useLazyGetTVVideosQuery,
  useLazyGetTVAccoutStatesQuery,
  usePostAddTVRatingMutation,
} = tvApi;
