import { CrewMember } from "../../types/common";
import { GuestStar } from ".";

export interface TVEpisodeDetailsApiResponse {
  air_date: string;
  crew: CrewMember[];
  id: number;
  name: string;
  overview: string | null;
  production_code: string;
  runtime: number;
  season_number: number;
  still_path: string | null;
  vote_average: number;
  vote_count: number;
  episode_number: number;
  guest_stars: GuestStar[];
}