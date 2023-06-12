import { ListMovie } from ".";

export interface MovieRecsApiResponse {
  page: number;
  results: MovieRecs[];
  total_pages: number;
  total_results: number;
}


type MovieRecs = ListMovie;