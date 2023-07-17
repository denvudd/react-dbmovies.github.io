import numeral from "numeral";

/**
 * A function that returns the proper format of a media element budget as a string using numeral library. 
 * It takes a raw value and the desired format as parameters. 
 * @see http://numeraljs.com/#format
 * @returns number
 * @example
 * const budget = 1000000; // 1 million
   const formattedBudget = formatBudget(budget, "0,0.00");

   console.log(formattedBudget); // Output: "1,000,000.00"
*/

export const formatBudget = (inputNumber: number, format: string = '0,0,0'): string => {
  return numeral(inputNumber).format(format);
};
