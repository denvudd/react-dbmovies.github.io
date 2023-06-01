import { ListMovie } from "../../movies/types/ListMovieType";

export interface SearchMultiApiResponse {
  page: number;
  results: ListMovie[];
  total_pages: number;
  total_results: number;
}
