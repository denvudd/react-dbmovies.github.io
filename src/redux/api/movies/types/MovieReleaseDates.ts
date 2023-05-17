export interface MovieReleaseDatesApiResponse {
  id: number;
  results: ReleaseDate[];
}

export interface ReleaseDate {
  iso_3166_1: string;
  release_dates: ReleaseInfo[];
}

export interface ReleaseInfo {
  certification: string;
  iso_639_1: string;
  release_date: string;
  type: number;
  note: string;
}