import { CreditPerson } from "../../types/common";

export interface TVAggregateCreditsApiResponse {
  cast: AggregateCastMember[];
  crew: AggregateCrewMember[];
  id: number;
}

export interface AggregateCastMember extends CreditPerson {
  roles: Role[];
  total_episode_count: number;
  order: number;
}

export interface AggregateCrewMember extends CreditPerson {
  jobs: Job[];
  total_episode_count: number;
  order: number;
  department: string;
}

interface Role {
  credit_id: string;
  character: string;
  episode_count: number;
  total_episode_count: number;
  order: number;
}

interface Job {
  credit_id: string;
  job: string;
  episode_count: number;
}
