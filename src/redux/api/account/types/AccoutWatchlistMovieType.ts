import { ListMovie } from "../../movies/types/MovieListType";
import { ListTV } from "../../tv/types";

export interface AccountWatchlistMoviesApiResponse {
  page: number;
  results: ListMovie[] | ListTV[];
  total_pages: number;
  total_results: number;
}
