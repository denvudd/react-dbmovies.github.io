import { SearchMovie, SearchTV } from "../../search/types";

export interface PersonCombinedCreditsApiResponse {
  cast: (CombinedCastMovie | CombinedCastTV)[];
  crew: (CombinedCrewMovie | CombinedCrewTV)[];
  id: number;
}

export interface CombinedCastMovie extends SearchMovie {
  order: number;
  character: string | null;
  credit_id: string;
}

export interface CombinedCastTV extends SearchTV {
  order: number;
  character: string | null;
  credit_id: string;
  episode_count: number;
}

export interface CombinedCrewTV extends SearchTV {
  order: number;
  credit_id: string;
  department: string;
  job: string;
}

export interface CombinedCrewMovie extends SearchMovie {
  order: number;
  credit_id: string;
  department: string;
  job: string;
}