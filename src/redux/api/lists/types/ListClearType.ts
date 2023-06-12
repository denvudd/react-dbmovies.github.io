import { ListAddMovieApiResponse } from "./ListAddMovieType";

export type ListClearApiResponse = ListAddMovieApiResponse;

export interface ListClearQueryArgs {
  session_id: string;
  list_id: number;
  confirm: boolean;
}