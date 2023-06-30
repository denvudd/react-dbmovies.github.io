import { SearchMovie } from "../../search/types";

export interface TrendingMoviesApiResponse {
  page: number;
  results: SearchMovie[];
  total_pages: number;
  total_results: number;
}