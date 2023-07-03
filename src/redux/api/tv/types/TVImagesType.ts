import type { Image } from "../../types/common";

export interface TVImagesApiResponse {
  id: number;
  backdrops: Image[];
  logos: Image[]
  posters: Image[];
}

