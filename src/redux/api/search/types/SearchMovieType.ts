import { ListMovie } from "../../movies/types/MovieListType";

export interface SearchMovieApiResponse {
  page: number;
  results: ListMovie[];
  total_pages: number;
  total_results: number;
}
