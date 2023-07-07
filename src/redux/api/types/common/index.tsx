export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface ReleaseInfo {
  certification: string;
  iso_639_1: string;
  release_date: string;
  type: number;
  note: string;
}

export interface CreditPerson {
  adult: boolean;
  gender: number | null;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
}

export interface CastMember extends CreditPerson {
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}

export interface CrewMember extends CreditPerson {
  credit_id: string;
  department: string;
  job: string;
}

export interface Image {
  aspect_ratio: number;
  file_path: string;
  height: number;
  iso_639_1: string | null;
  vote_average: number;
  vote_count: number;
  width: number;
}

export interface Video {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
}

export interface ReviewResult {
  author: string;
  author_details: ReviewAuthorDetails;
  content: string;
  created_at: string;
  id: string;
  updated_at: string;
  url: string;
}

export interface ReviewAuthorDetails {
  name: string | null;
  username: string;
  avatar_path: string | null;
  rating: number | null;
}

export interface Keyword {
  id: number;
  name: string;
}

export interface Network {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}