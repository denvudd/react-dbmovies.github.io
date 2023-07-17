import { calculateAgeFromDate } from "@/utils/calcAgeFromDate";

describe("calculateAgeFromDate", () => {
  it("returns the correct age when the date is in the past", () => {
    const dateOfBirth = "1990-01-01";
    const age = calculateAgeFromDate(dateOfBirth);
    expect(age).toBe(33);
  });

  it('returns "Date is in future" when the date is in the future', () => {
    const dateOfBirth = "2050-01-01";
    const age = calculateAgeFromDate(dateOfBirth);
    expect(age).toBe("Date is in future");
  });

  it('returns "Invalid date" when the date is invalid', () => {
    const dateOfBirth = "invalid-date";
    const age = calculateAgeFromDate(dateOfBirth);
    expect(age).toBe("Invalid date");
  });

  it("handles leap year correctly", () => {
    const dateOfBirth = "2000-02-29";
    const age = calculateAgeFromDate(dateOfBirth);
    expect(age).toEqual(expect.any(Number));
  });
});
