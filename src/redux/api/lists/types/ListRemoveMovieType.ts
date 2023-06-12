export interface ListRemoveMovieApiResponse {
  status_code: number;
  status_message: string;
  success: boolean;
}

export interface ListRemoveMovieQueryArgs {
  session_id: string;
  list_id: number;
  media_id: number;
}