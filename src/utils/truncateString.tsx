/**
 * A function that truncates a string at a specific character position. 
 * Takes a raw string and the maximum length of the string.
 * Returns the truncated string.
 * @returns string
 * @example
 * const longString = "This is a long string that needs to be truncated.";
   const truncatedString = truncateString(longString, 20);

   console.log(truncatedString); // Output: "This is a long string..."
*/

export function truncateString(str: string, maxLength: number): string {
  if (str.length > maxLength) {
    return str.slice(0, maxLength) + "...";
  }
  return str;
}
