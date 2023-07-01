import { SearchMovie, SearchTV } from "../../search/types";

export interface PersonList {
  adult: boolean;
  also_known_as: string[];
  biography: string;
  birthday: string;
  deathday: string | null;
  gender: number;
  homepage: string | null;
  id: number;
  imdb_id: string | null;
  known_for_department: string;
  known_for: SearchMovie[] | SearchTV[];
  name: string;
  place_of_birth: string;
  popularity: number;
  profile_path: string | null;
}
