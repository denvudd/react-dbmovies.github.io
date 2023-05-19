import { DateTime } from "luxon";

export const formatReleaseDate = (release: string, locale: string, format: string): string => {
  return DateTime.fromISO(release).setLocale("uk-UA").toFormat("dd LLLL yyyy");
};
