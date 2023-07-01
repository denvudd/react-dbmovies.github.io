import dayjs from "dayjs";
import type { Dayjs } from "dayjs";

type EventValue<Dayjs> = Dayjs;

/**
 * A function that returns the specified number of recent days using the DayJS library. 
 * Returns an array with the start and end date.
 * @returns [startDate, endDate]
 * @example
 * const [endDate, startDate] = getLastSpecificDays(-7);

   console.log(startDate); // Output: Start date of the last 7 days
   console.log(endDate); // Output: Current date
*/

export const getLastSpecificDays = (lastDays: number): [EventValue<Dayjs>, EventValue<Dayjs>] => {
  return [dayjs().add(lastDays, "d"), dayjs()];
};
