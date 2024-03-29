import { baseApi } from "../baseApi/slice";

// API Responses Types
import type {
  MovieListApiResponse,
  MovieDetailsApiResponse,
  MovieAccountStatesApiResponse,
  MovieCreditsApiResponse,
  MovieExternalIDsApiResponse,
  MovieReleaseDatesApiResponse,
  MovieImagesApiResponse,
  MovieVideosApiResponse,
  MovieReviewsApiResponse,
  MovieRecsApiResponse,
  MovieKeywordApiResponse,
  AddMovieRatingApiResponse,
  DeleteMovieRatingApiResponse,
  MovieListQueryArgs,
} from "./types";
// Query Args Types
import type {
  ListQueryArgsDefault,
  AddMovieRatingQueryArgs,
  DeleteMovieRatingQueryArgs,
  MovieReviewsQueryArgs,
} from "./types";
// Utility types
import type { Video } from "../types/common";

const tmdbApiKey = `api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`;

export const moviesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMovies: builder.query<MovieListApiResponse, MovieListQueryArgs>({
      query: ({ typeList, params }) =>
        `/movie/${typeList}?${tmdbApiKey}&${params ? params : ""}`,
      transformResponse: (response: MovieListApiResponse) => response,
    }),

    getMovieDetails: builder.query<
      MovieDetailsApiResponse,
      { id: number; params?: string }
    >({
      query: ({ id, params }) =>
        `/movie/${id}?${tmdbApiKey}&${params ? params : ""}`,
      transformResponse: (response: MovieDetailsApiResponse) => response,
    }),

    getMovieAccoutStates: builder.query({
      query: ({ movie_id, session_id }) =>
        `/movie/${movie_id}/account_states?${tmdbApiKey}&session_id=${
          session_id ? session_id : ""
        }`,
      transformResponse: (response: MovieAccountStatesApiResponse) => response,
      providesTags: [
        { type: "Rates", id: "LIST" },
        { type: "Watchlist", id: "LIST" },
        { type: "Favorite", id: "LIST" },
      ],
    }),

    getMovieCreditsCast: builder.query<
      MovieCreditsApiResponse,
      ListQueryArgsDefault
    >({
      query: ({ id, params }) =>
        `/movie/${id}/credits?${tmdbApiKey}&${params ? params : ""}`,
      transformResponse: (response: MovieCreditsApiResponse) => response,
    }),

    getMovieExternalIds: builder.query<MovieExternalIDsApiResponse, number>({
      query: (id) => `/movie/${id}/external_ids?${tmdbApiKey}`,
      transformResponse: (response: MovieExternalIDsApiResponse) => response,
    }),

    getMovieCertificate: builder.query<string | undefined, number>({
      query: (id) => `/movie/${id}/release_dates?${tmdbApiKey}`,
      transformResponse: (response: MovieReleaseDatesApiResponse) => {
        const certificates = response.results;

        // get only one certificate else return undefined
        if (certificates) {
          const usReleaseDate = certificates.find(
            (certificate) => certificate.iso_3166_1 === "US"
          );
          const usCertificate = usReleaseDate?.release_dates.find(
            (rd) => rd.type === 3
          )?.certification;

          return usCertificate;
        } else {
          return undefined;
        }
      },
    }),

    getMovieReleaseDates: builder.query<MovieReleaseDatesApiResponse, number>({
      query: (id) => `/movie/${id}/release_dates?${tmdbApiKey}`,
      transformResponse: (response: MovieReleaseDatesApiResponse) => response,
    }),

    getMovieImages: builder.query<MovieImagesApiResponse, ListQueryArgsDefault>(
      {
        query: ({ id, params }) =>
          `/movie/${id}/images?${tmdbApiKey}&${params ? params : ""}`,
        transformResponse: (response: MovieImagesApiResponse) => response,
      }
    ),

    getMovieVideos: builder.query<Video[] | undefined, ListQueryArgsDefault>({
      query: ({ id, params }) =>
        `/movie/${id}/videos?${tmdbApiKey}&${params ? params : ""}`,
      transformResponse: (response: MovieVideosApiResponse) => {
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

    getMovieRecs: builder.query<
      MovieRecsApiResponse["results"],
      ListQueryArgsDefault
    >({
      query: ({ id, params }) =>
        `/movie/${id}/recommendations?${tmdbApiKey}&${params ? params : ""}`,
      transformResponse: (response: MovieRecsApiResponse) => response.results,
    }),

    getMovieReviews: builder.query<
      MovieReviewsApiResponse,
      MovieReviewsQueryArgs
    >({
      query: ({ id, params }) =>
        `/movie/${id}/reviews?${tmdbApiKey}&${params ? params : ""}`,
      transformResponse: (response: MovieReviewsApiResponse) => response,
    }),

    getMovieKeywords: builder.query<
      MovieKeywordApiResponse["keywords"],
      number
    >({
      query: (id) => `/movie/${id}/keywords?${tmdbApiKey}`,
      transformResponse: (response: MovieKeywordApiResponse) =>
        response.keywords,
    }),

    postAddMovieRating: builder.mutation<
      AddMovieRatingApiResponse,
      AddMovieRatingQueryArgs
    >({
      query: ({ session_id, movie_id, rating }) => ({
        url: `/movie/${movie_id}/rating?session_id=${session_id}&${tmdbApiKey}`,
        method: "POST",
        body: {
          value: rating,
        },
      }),
      transformResponse: (response: AddMovieRatingApiResponse) => response,
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

    deleteMovieRating: builder.mutation<
      DeleteMovieRatingApiResponse,
      DeleteMovieRatingQueryArgs
    >({
      query: ({ session_id, movie_id }) => ({
        url: `/movie/${movie_id}/rating?session_id=${session_id}&${tmdbApiKey}`,
        method: "DELETE",
      }),
      transformResponse: (response: DeleteMovieRatingApiResponse) => response,
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

// Export hooks for usage in functional components
export const {
  useGetMoviesQuery,
  useGetMovieDetailsQuery,
  useGetMovieCertificateQuery,
  useGetMovieCreditsCastQuery,
  useGetMovieExternalIdsQuery,
  useGetMovieRecsQuery,
  useGetMovieKeywordsQuery,
  useGetMovieReviewsQuery,
  usePostAddMovieRatingMutation,
  useDeleteMovieRatingMutation,
  useLazyGetMovieAccoutStatesQuery,
  useLazyGetMoviesQuery,
  useLazyGetMovieImagesQuery,
  useLazyGetMovieVideosQuery,
  util: { getRunningQueriesThunk },
} = moviesApi;

// // export endpoints for use in SSR
// export const { getMovieDetails } = moviesApi.endpoints;
