import { getSpecificYear } from "@/utils/getSpecificYear";
import dayjs from "dayjs";

describe('getSpecificYear', () => {
  it('should return an array with two elements', () => {
    const result = getSpecificYear(2023);
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(2);
  });

  it('should return start and end dates of the specified year', () => {
    const result = getSpecificYear(2023);
    const [startOfYear, endOfYear] = result;

    const expectedStartOfYear = dayjs('2023-01-01');
    const expectedEndOfYear = dayjs('2023-12-31');

    expect(startOfYear.isSame(expectedStartOfYear, 'day')).toBe(true);
    expect(endOfYear.isSame(expectedEndOfYear, 'day')).toBe(true);
  });
});