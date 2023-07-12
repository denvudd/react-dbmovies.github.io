export type ConfigurationLanguagesApiResponse = Language[];

interface Language {
  iso_639_1: string;
  english_name: string;
  name: string;
}