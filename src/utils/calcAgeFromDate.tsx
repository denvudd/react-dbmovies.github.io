import dayjs from "dayjs";

/**
 * A function that calculates age from a date. 
 * It takes a date as input and calculates the age using Day JS library. 
 * Returns a number.
 * @returns number
 * @example
 * const dateOfBirth = '1967-07-26';
  const age = calculateAgeFromDate(dateOfBirth);
  console.log(age); // Output: 55
*/

export const calculateAgeFromDate = (date: string) => {
  const now = dayjs();
  const birth = dayjs(date);
  const age = now.diff(birth, 'year');
  return age;
};