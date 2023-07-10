import { ListMovie } from "../../movies/types/MovieListType";
import { ListTV } from "../../tv/types";
import { AccountQueryArgsDefault } from "./AccountQueryArgs";

export interface AccountRatedListApiResponse {
  page: number;
  results: ListRatedMovie[] | ListRatedTV[];
  total_pages: number;
  total_results: number;
}

export interface ListRatedMovie extends ListMovie {
  rating: number;
}

export interface ListRatedTV extends ListTV {
  rating: number;
}
