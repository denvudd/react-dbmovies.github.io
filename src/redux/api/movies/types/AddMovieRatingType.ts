export interface AddMovieRatingApiResponse {
  success: boolean;
  status_code: number;
  status_message: string;
}

export interface AddMovieRatingQueryArgs {
  session_id: string;
  movie_id: number;
  rating: number;
}