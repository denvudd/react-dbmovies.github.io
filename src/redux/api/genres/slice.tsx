import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { MovieGenresResponseApi } from "./types/MovieListGenreType";

const tmdbApiKey = "api_key=684e3f73d1ca0e692a3016c028aabf72";

export const genresApi = createApi({
  reducerPath: "genresApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.themoviedb.org/3",
  }),
  endpoints: (builder) => ({
    getMovieListGenre: builder.query({
      query: (params) => `/genre/movie/list?${tmdbApiKey}&${params}`,
      transformResponse: (response: MovieGenresResponseApi) => response,
    }),
  }),
});

export const { useGetMovieListGenreQuery } = genresApi;
