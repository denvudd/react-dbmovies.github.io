import { ListMovie } from "../../movies/types/ListMovieType";

export interface AccountRatedMovieListApiResponse {
  page: number;
  results: ListRatedItem[];
  total_pages: number;
  total_results: number;
}

export interface ListRatedItem extends ListMovie {
  rating: number;
}