export type ConfigurationApiResponse = Language[];

interface Language {
  iso_639_1: string;
  english_name: string;
  name: string;
}