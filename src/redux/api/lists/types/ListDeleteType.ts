import { ListAddMovieApiResponse } from "./ListAddMovieType";

export type ListDeleteApiResponse = ListAddMovieApiResponse;

export interface ListDeleteQueryArgs {
  session_id: string;
  list_id: string;
}