import { Keyword } from "../../types/common";

export interface SearchKeywordApiResponse {
  page: number;
  results: Keyword[];
  total_pages: number;
  total_results: number;
}
