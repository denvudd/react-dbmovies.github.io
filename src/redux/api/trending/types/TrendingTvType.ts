import { SearchTV } from "../../search/types";

export interface TrendingTVApiResponse {
  page: number;
  results: SearchTV[];
  total_pages: number;
  total_results: number;
}
