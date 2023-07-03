import {
  Genre,
  ProductionCompany,
  ProductionCountry,
  SpokenLanguage,
} from "../../types/common";

export type TVDetailsApiResponse = TVDetails;

export interface TVDetails {
  adult: boolean;
  backdrop_path: string | null;
  created_by: Creator[];
  episode_run_time: number[];
  first_air_date: string;
  genres: Genre[];
  homepage: string;
  id: number;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: LastEpisodeToAir;
  name: string;
  next_episode_to_air: string | null;
  networks: Network[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  seasons: Season[];
  spoken_languages: SpokenLanguage[];
  status:
    | "Returning Series"
    | "Planned"
    | "In Production"
    | "Ended"
    | "Canceled"
    | "Pilot";
  tagline: string;
  type:
    | "Documentary"
    | "News"
    | "Miniseries"
    | "Reality"
    | "Scripted"
    | "Talk Show"
    | "Video";
  vote_average: number;
  vote_count: number;
}

export interface LastEpisodeToAir {
  id: number;
  name: string;
  overview: string;
  air_date: string;
  episode_number: number;
  production_code: string;
  season_number: number;
  still_path: string;
  vote_average: number;
  vote_count: number;
  runtime: number;
  show_id: number;
}

export interface Season {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  season_number: number;
  vote_average: number;
}

interface Creator {
  id: number;
  credit_id: string;
  name: string;
  gender: number;
  profile_path: string;
}

export interface Network {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}
