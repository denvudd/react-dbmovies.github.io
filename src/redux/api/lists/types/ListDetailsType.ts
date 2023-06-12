import { ListMovie } from "../../movies/types/ListMovieType";

export interface ListDetailsApiResponse {
  created_by: string;
  description: string;
  favorite_count: number;
  id: string;
  items: ListMovie[];
  item_count: number;
  iso_639_1: string;
  name: string;
  poster_path: string;
}

export interface ListDetailsQueryArgs {
  id: number;
  params?: string;
}

