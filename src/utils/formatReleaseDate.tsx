import dayjs from "dayjs";
import "dayjs/locale/uk"; 

/**
 * A function that formats the release date of a media element using the DayJS library. 
 * It takes the raw release date, a locale in the ISO-639-1 format (default is "uk"), 
 * and a format (default is "DD MMMM YYYY"). Returns the formatted string.
 * @returns string
 * @see https://day.js.org/docs/en/display/format
 * @example
 * const releaseDate = "2023-06-15";
   const formattedDate = formatReleaseDate(releaseDate, "uk", "DD MMMM YYYY");

   console.log(formattedDate); // Output: "15 червня 2023"
*/

export const formatReleaseDate = (
  release: string,
  locale: string = "uk",
  format: string = "DD MMMM YYYY"
): string => {
  return dayjs(release).locale(locale).format(format);
};
