import { Genre } from "../../types/common";

export interface GenresListApiResponse {
  genres: Genre[];
}

export interface GenresListQueryArgs {
  mediaType: "movies" | "tv";
  params?: string;
}
