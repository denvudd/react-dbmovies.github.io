import { baseApi } from "../baseApi/slice";
import type {
  GenresListApiResponse,
  GenresListQueryArgs,
} from "./types/MovieListGenreType";

const tmdbApiKey = `api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`;

export const genresApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getGenresList: builder.query<
      GenresListApiResponse["genres"],
      GenresListQueryArgs
    >({
      query: ({ mediaType, params }) =>
        `/genre/${mediaType === "movies" ? "movie" : "tv"}/list?${tmdbApiKey}&${
          params ? params : ""
        }`,
      transformResponse: (response: GenresListApiResponse) => response.genres,
    }),
  }),
});

export const { useGetGenresListQuery } = genresApi;
