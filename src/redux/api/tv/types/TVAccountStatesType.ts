export interface TVAccountStatesApiResponse {
  id: number;
  favorite: boolean;
  rated: {
    value: number;
  } | false;
  watchlist: boolean;
}

export interface TVAccountStatesQueryArgs {
  tv_id: number;
  session_id: string;
}
