export interface DeleteMovieRatingApiResponse {
  success: boolean;
  status_code: number;
  status_message: string;
}

export interface DeleteMovieRatingQueryArgs {
  session_id: string;
  movie_id: number;
}