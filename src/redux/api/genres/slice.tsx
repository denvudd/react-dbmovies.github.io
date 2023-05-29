import { MovieGenresResponseApi } from "./types/MovieListGenreType";
import { baseApi } from "../baseApi/slice";

const tmdbApiKey = "api_key=684e3f73d1ca0e692a3016c028aabf72";

export const genresApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMovieListGenre: builder.query({
      query: (params) => `/genre/movie/list?${tmdbApiKey}&${params ? params : ""}`,
      transformResponse: (response: MovieGenresResponseApi) => response.genres,
    }),
  }),
});

export const { useGetMovieListGenreQuery } = genresApi;
