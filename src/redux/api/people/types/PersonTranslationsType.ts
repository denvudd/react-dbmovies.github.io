export interface PersonTranslationsApiResponse {
  id: number;
  translations: PersonTranslation[];
}

export interface PersonTranslation {
  iso_3166_1: string;
  iso_639_1: string;
  name: string;
  english_name: string;
  data: PersonTranslationData;
}

export interface PersonTranslationData {
  biography: string | null;
}
