export interface TVAltTitlesApiResponse {
  id: number;
  results: TVAltTitle[];
}

export interface TVAltTitle {
  iso_3166_1: string;
  title: string;
  type: string;
}