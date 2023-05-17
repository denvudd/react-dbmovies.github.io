export interface MovieCreditsApiResponse {
  id: number;
  cast: CastMember[];
  crew: CrewMember[];
}

interface MoviePerson {
  adult: boolean;
  gender: number | null;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
}

interface CastMember extends MoviePerson {
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}

interface CrewMember extends MoviePerson {
  credit_id: string;
  department: string;
  job: string;
}

