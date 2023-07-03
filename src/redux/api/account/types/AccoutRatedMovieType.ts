import { ListMovie } from "../../movies/types/MovieListType";

export interface AccountRatedMovieListApiResponse {
  page: number;
  results: ListRatedItem[];
  total_pages: number;
  total_results: number;
}

export interface ListRatedItem extends ListMovie {
  rating: number;
}

