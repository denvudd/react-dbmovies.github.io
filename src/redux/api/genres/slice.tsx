import { baseApi } from "../baseApi/slice";
import type {
  GenresListApiResponse,
  GenresListQueryArgs,
} from "./types/MovieListGenreType";

const tmdbApiKey = "api_key=684e3f73d1ca0e692a3016c028aabf72";

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
