import { SearchMovie, SearchTV, SearchPerson } from "../../search/types/SearchMultiType";

export interface TrendingAllApiResponse {
  page: number;
  results: SearchMovie[] | SearchTV[] | SearchPerson[];
  total_pages: number;
  total_results: number;
}