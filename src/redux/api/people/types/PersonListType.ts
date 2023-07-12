import { SearchMovie, SearchTV } from "../../search/types";

export interface PersonListApiResponse {
  page: number;
  results: ListPerson[];
  total_pages: number;
  total_results: number;
}

export interface ListPerson {
  adult: boolean;
  gender: number;
  id: number;
  known_for: SearchMovie[] | SearchTV[];
  known_for_department: string;
  name: string;
  popularity: number;
  profile_path: string | null;
}
