import numeral from "numeral";

export const formatBudget = (inputNumber: number, format: string): string => {
  return numeral(inputNumber).format(format);
};
