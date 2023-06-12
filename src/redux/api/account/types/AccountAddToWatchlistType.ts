import { AccountQueryArgsDefault } from ".";

export interface AccountAddToWatchlistApiResponse {
  status_code: number;
  status_message: string;
  success: boolean;
}

export interface AccountAddToWatchlistQueryArgs extends AccountQueryArgsDefault {
  media_type: string;
  media_id: number;
  watchlist: boolean;
}