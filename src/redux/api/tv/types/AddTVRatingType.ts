export interface AddTVRatingApiResponse {
  success: boolean;
  status_code: number;
  status_message: string;
}

export interface AddTVRatingQueryArgs {
  session_id: string;
  series_id: number;
  rating: number;
}