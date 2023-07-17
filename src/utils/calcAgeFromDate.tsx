import dayjs from "dayjs";

/**

A function that calculates age from a date.
It takes a date as input and calculates the age using Day JS library.
Returns a number or a string indicating if the date is in the future or invalid.
@returns number | "Date is in future" | "Invalid date"
@example
const dateOfBirth = '1967-07-26';
const age = calculateAgeFromDate(dateOfBirth);
console.log(age); // Output: 55
*/
export const calculateAgeFromDate = (date: string) => {
  const now = dayjs();
  const birth = dayjs(date);

  if (birth.isAfter(now)) {
    return "Date is in future";
  }

  if (!birth.isValid()) {
    return "Invalid date";
  }

  const age = now.diff(birth, "year");
  return age;
};
