import {
  ProductionCompany,
  ProductionCountry,
  SpokenLanguage,
  Genre,
} from "../../types/common";

export type MovieDetailsApiResponse = MovieDetails;

export interface MovieDetails {
  adult: boolean;
  backdrop_path: string | null;
  belongs_to_collection: Collection | null;
  budget: number;
  genres: Genre[];
  id: number;
  imdb_id: string | null;
  homepage: string | null;
  original_language: string;
  original_title: string;
  overview: string | null;
  popularity: number;
  poster_path: string | null;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number | null;
  spoken_languages: SpokenLanguage[];
  status:
    | "Rumored"
    | "Planned"
    | "In Production"
    | "Post Production"
    | "Released"
    | "Canceled";
  tagline: string | null;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface Collection {
  id: number;
  name: string;
  poster_path: string | null;
  backdrop_path: string | null;
}
