import { ListMoviesApiResponse } from "./types/ListMovieType";
import { MovieDetailsApiResponse } from "./types/MovieDetailsType";
import { MovieReleaseDatesApiResponse } from "./types/MovieReleaseDates";
import { MovieCreditsApiResponse } from "./types/MovieCreditsType";
import { MovieImagesApiResponse } from "./types/MovieImagesType";
import { MovieVideosApiResponse } from "./types/MovieVideosType";
import { MovieRecsApiResponse } from "./types/MovieRecsType";
import { MovieKeywordApiResponse } from "./types/MovieKeywordsType";
import { baseApi } from "../baseApi/slice";
import { AddMovieRatingApiResponse } from "./types/AddMovieRatingType";
import { MovieAccountStatesApiResponse } from "./types/MovieAccountStatesType";
import { DeleteMovieRatingApiResponse } from "./types/DeleteMovieRatingType";

const tmdbApiKey = "api_key=684e3f73d1ca0e692a3016c028aabf72";

export const moviesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMovies: builder.query({
      query: ({ typeList, params }) =>
        `/movie/${typeList}?${tmdbApiKey}&${params ? params : ""}`,
      transformResponse: (response: ListMoviesApiResponse) => response,
    }),

    getMovieDetails: builder.query({
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
      providesTags: ["Watchlist", "Rates", "Favorite"],
    }),

    getMovieGenre: builder.query({
      query: ({ id, params }) =>
        `/movie/${id}?${tmdbApiKey}&${params ? params : ""}`,
      transformResponse: (response: MovieDetailsApiResponse) => response,
    }),

    getMovieCreditsCast: builder.query({
      query: ({ id, params }) =>
        `/movie/${id}/credits?${tmdbApiKey}&${params ? params : ""}`,
      transformResponse: (response: MovieCreditsApiResponse) => response.cast,
    }),

    getMovieReleaseDates: builder.query({
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

    getMovieImages: builder.query({
      query: ({ id, params }) =>
        `/movie/${id}/images?${tmdbApiKey}&${params ? params : ""}`,
      transformResponse: (response: MovieImagesApiResponse) => response,
    }),

    getMovieVideos: builder.query({
      query: ({ id, params }) =>
        `/movie/${id}/videos?${tmdbApiKey}&${params ? params : ""}`,
      transformResponse: (response: MovieVideosApiResponse) => {
        const videos = response.results;

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

    getMovieRecs: builder.query({
      query: ({ id, params }) =>
        `/movie/${id}/recommendations?${tmdbApiKey}&${params ? params : ""}`,
      transformResponse: (response: MovieRecsApiResponse) => response.results,
    }),

    getMovieKeywords: builder.query({
      query: ({ id, params }) =>
        `/movie/${id}/keywords?${tmdbApiKey}&${params ? params : ""}`,
      transformResponse: (response: MovieKeywordApiResponse) =>
        response.keywords,
    }),

    postAddMovieRating: builder.mutation({
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
          dispatch(baseApi.util.invalidateTags(["Rates", "Watchlist"]));
        }, 500);
      },
    }),

    deleteMovieRating: builder.mutation({
      query: ({ session_id, movie_id }) => ({
        url: `/movie/${movie_id}/rating?session_id=${session_id}&${tmdbApiKey}`,
        method: "DELETE",
      }),
      transformResponse: (response: DeleteMovieRatingApiResponse) => response,
      // manual cache update because the API doesn't always manage to process the mutation in time
      async onQueryStarted(props, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        setTimeout(() => {
          dispatch(baseApi.util.invalidateTags(["Rates", "Watchlist"]));
        }, 500);
      },
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useGetMoviesQuery,
  useGetMovieDetailsQuery,
  useGetMovieReleaseDatesQuery,
  useGetMovieCreditsCastQuery,
  useGetMovieRecsQuery,
  useGetMovieKeywordsQuery,
  usePostAddMovieRatingMutation,
  useDeleteMovieRatingMutation,
  useLazyGetMovieAccoutStatesQuery,
  useLazyGetMoviesQuery,
  useLazyGetMovieImagesQuery,
  useLazyGetMovieVideosQuery,
  util: { getRunningQueriesThunk },
} = moviesApi;

// export endpoints for use in SSR
export const { getMovieDetails } = moviesApi.endpoints;
