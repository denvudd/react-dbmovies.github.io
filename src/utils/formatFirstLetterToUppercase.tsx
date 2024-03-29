/**
 * A function that takes a string and converts the first character to uppercase.
 * @returns string
 * @example
 * const inputString = "hello, world!";
   const formattedString = formatFirstLetterToUppercase(inputString);

   console.log(formattedString); // Output: "Hello, world!"
*/

export const formatFirstLetterToUppercase = (str: string): string => {
  const trimmedString = str.trim(); // removing leading spaces
  return trimmedString.charAt(0).toUpperCase() + trimmedString.slice(1);
};
