import { ListMovie } from "../../movies/types/ListMovieType";

export interface SearchMovieApiResponse {
  page: number;
  results: ListMovie[];
  total_pages: number;
  total_results: number;
}
