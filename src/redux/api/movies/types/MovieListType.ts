export interface MovieListApiResponse {
  page: number;
  results: ListMovie[];
  total_results: number;
  total_pages: number;
}

export interface ListMovie {
  poster_path: string | null;
  adult: boolean;
  overview: string;
  release_date: string;
  genre_ids: number[];
  id: number;
  original_title: string;
  original_language: string;
  title: string;
  backdrop_path: string | null;
  popularity: number;
  vote_count: number;
  video: boolean;
  vote_average: number
}

export interface MovieListQueryArgs {
  typeList: "popular" | "now_playing" | "top_rated" | "upcoming";
  params?: string;
}