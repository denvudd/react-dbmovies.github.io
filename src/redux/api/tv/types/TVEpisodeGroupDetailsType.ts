import { Episode } from ".";
import { Network } from "../../types/common";

export interface TVEpisodeGroupDetailsApiResponse {
  description: string;
  episode_count: number;
  group_count: number;
  groups: Group[];
  id: string;
  name: string;
  network: Network;
  type: number;
}

interface Group {
  id: string;
  name: string;
  order: number;
  episodes: Episode[];
}
