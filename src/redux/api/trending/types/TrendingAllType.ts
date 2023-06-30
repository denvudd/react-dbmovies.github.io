import { SearchMovie, SearchTV } from "../../search/types/SearchMultiType";

export interface TrendingAllApiResponse {
  page: number;
  results: SearchMovie[] | SearchTV[];
  total_pages: number;
  total_results: number;
}