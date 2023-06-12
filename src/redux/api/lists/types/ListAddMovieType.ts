export interface ListAddMovieApiResponse {
  status_code: number;
  status_message: string;
  success: boolean;
}

export interface ListAddMovieQueryArgs {
  session_id: string;
  list_id: number;
  media_id: number;
}