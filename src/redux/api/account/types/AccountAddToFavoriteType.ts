import { AccountQueryArgsDefault } from ".";

export interface AccountAddToFavoriteApiResponse {
  status_code: number;
  status_message: string;
  success: boolean;
}

export interface AccountAddFavoriteQueryArgs extends AccountQueryArgsDefault {
  media_type: string;
  media_id: number;
  favorite: boolean;
}