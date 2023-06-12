import { baseApi } from "../baseApi/slice";
import type { MovieGenresResponseApi } from "./types/MovieListGenreType";

const tmdbApiKey = "api_key=684e3f73d1ca0e692a3016c028aabf72";

export const genresApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMovieListGenre: builder.query<
      MovieGenresResponseApi["genres"],
      string | undefined
    >({
      query: (params) =>
        `/genre/movie/list?${tmdbApiKey}&${params ? params : ""}`,
      transformResponse: (response: MovieGenresResponseApi) => response.genres,
    }),
  }),
});

export const { useGetMovieListGenreQuery } = genresApi;
