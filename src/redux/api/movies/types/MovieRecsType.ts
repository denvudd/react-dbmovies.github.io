import { ListMovie } from ".";
export interface MovieRecsApiResponse {
  page: number;
  results: ListMovie[];
  total_pages: number;
  total_results: number;
}

