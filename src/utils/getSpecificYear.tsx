import dayjs from "dayjs";

/**
 * A function that returns an array with the start and end date of a specific year using the DayJS library.
 * @returns [startOfYearDate, endOfYearDate]
 * @see https://day.js.org/docs/en/manipulate/start-of
 * @see https://day.js.org/docs/en/get-set/year
 * @example
 * const year = 2023;
   const [startOfYear, endOfYear] = getSpecificYear(year);

   console.log(startOfYear); // Output: "2023-01-01"
   console.log(endOfYear); // Output: "2023-12-31"
*/

export const getSpecificYear = (year: number) => {
  const startOfYear = dayjs().startOf("year").year(year);
  const endOfYear = dayjs().endOf("year").year(year);

  return [startOfYear, endOfYear];
};
