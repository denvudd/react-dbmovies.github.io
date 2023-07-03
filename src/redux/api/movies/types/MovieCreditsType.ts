import { CastMember, CrewMember } from "../../types/common";

export interface MovieCreditsApiResponse {
  id: number;
  cast: CastMember[];
  crew: CrewMember[];
}



