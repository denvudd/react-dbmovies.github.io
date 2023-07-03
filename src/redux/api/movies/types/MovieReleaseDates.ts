import { ReleaseInfo } from "../../types/common";
export interface MovieReleaseDatesApiResponse {
  id: number;
  results: ReleaseDate[];
}

export interface ReleaseDate {
  iso_3166_1: string;
  release_dates: ReleaseInfo[];
}
