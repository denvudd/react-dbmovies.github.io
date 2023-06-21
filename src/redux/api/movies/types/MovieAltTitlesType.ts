export interface MovieAltTitlesApiResponse {
  id: number;
  titles: MovieAltTitle[];
}

export interface MovieAltTitle {
  iso_3166_1: string;
  title: string;
  type: string;
}