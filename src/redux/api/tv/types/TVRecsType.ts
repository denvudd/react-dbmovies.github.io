import { ListTV } from ".";

export interface TVRecsApiResponse {
  page: number;
  results: ListTV[];
  total_pages: number;
  total_results: number;
}

