import dayjs from "dayjs";

export const getSpecificYear = (year: number) => {
  const startOfYear = dayjs().startOf("year").year(year);
  const endOfYear = dayjs().endOf("year").year(year);

  return [startOfYear, endOfYear];
};
