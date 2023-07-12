import { ListMovie } from "../../movies/types/MovieListType";
import { ListTV } from "../../tv/types/TVListType";
import { ListPerson } from "../../people/types";
export interface SearchMovie extends ListMovie {
  media_type: "movie";
}

export interface SearchTV extends ListTV {
  media_type: "tv";
}

export interface SearchPerson extends ListPerson {
  media_type: "person";
}
export interface SearchMultiApiResponse {
  page: number;
  results: SearchMovie[] | SearchTV[] | SearchPerson[];
  total_pages: number;
  total_results: number;
}
