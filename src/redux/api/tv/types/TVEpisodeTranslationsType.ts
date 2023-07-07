import { TVTranslation } from "./TVTranslationsType";

export interface TVEpisodeTranslationsApiResponse {
  id: number;
  translations: TVTranslation[];
}