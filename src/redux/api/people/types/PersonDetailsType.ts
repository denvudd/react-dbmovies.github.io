export type PersonDetailsApiResponse = PersonDetails;

export interface PersonDetails {
  adult: boolean;
  also_known_as: string[];
  biography: string | null;
  birthday: string;
  deathday: string | null;
  gender: 0 | 1 | 2 | 3;
  homepage: string | null;
  id: number;
  imdb_id: string;
  known_for_department: string;
  name: string;
  place_of_birth: string;
  popularity: number;
  profile_path: string | null;
}
