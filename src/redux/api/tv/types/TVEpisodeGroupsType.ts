import { Network } from "../../types/common";

export interface TVEpisodeGroupsApiResponse {
  results: EpisodeGroup[];
  id: number;
}

export interface EpisodeGroup {
  description: string;
  episode_count: number;
  group_count: number;
  id: string;
  name: string;
  network: Network;
  type: number;
}