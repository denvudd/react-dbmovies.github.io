export interface TVListApiResponse {
  page: number;
  results: ListTV[];
  total_results: number;
  total_pages: number;
}

export interface ListTV {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  first_air_date: string;
  name: string;
  vote_average: number;
  vote_count: number;
}

export interface TVListQueryArgs {
  typeList: "popular" | "airing_today" | "on_the_air" | "top_rated";
  params?: string;
}
