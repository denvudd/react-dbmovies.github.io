import type { Image } from "../../types/common";
export interface MovieImagesApiResponse {
  id: number;
  backdrops: Image[];
  logos: Image[]
  posters: Image[];
}

