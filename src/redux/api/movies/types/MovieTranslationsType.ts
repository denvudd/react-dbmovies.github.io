export interface MovieTranslationsApiResponse {
  id: number;
  translations: MovieTranslation[];
}

export interface MovieTranslation {
  iso_3166_1: string;
  iso_639_1: string;
  name: string;
  english_name: string;
  data: MovieTranslationData;
}

export interface MovieTranslationData {
  homepage: string | null;
  overview: string | null;
  runtime: number;
  tagline: string | null;
  title: string | null;
}


