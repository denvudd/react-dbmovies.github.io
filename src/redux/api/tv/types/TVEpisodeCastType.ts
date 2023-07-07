import { CastMember, CrewMember } from "../../types/common";
import { GuestStar } from "./common";

export interface TVEpisodeCastApiResponse {
  id: number;
  cast: CastMember[];
  crew: CrewMember[];
  guest_stars: GuestStar[];
}