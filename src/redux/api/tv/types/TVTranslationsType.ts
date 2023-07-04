export interface TVTranslationsApiResponse {
  id: number;
  translations: TVTranslation[];
}

export interface TVTranslation {
  iso_3166_1: string;
  iso_639_1: string;
  name: string;
  english_name: string;
  data: TVTranslationData;
}

export interface TVTranslationData {
  homepage: string | null;
  overview: string | null;
  tagline: string | string[] | null;
  name: string | null;
}
