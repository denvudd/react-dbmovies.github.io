import { getLastSpecificDays } from "@/utils/getLastSpecificDays";
import dayjs from "dayjs";

describe("getLastSpecificDays", () => {
  it("returns the correct start and end dates for the last 7 days", () => {
    const [startDate, endDate] = getLastSpecificDays(-7);
    const today = dayjs();

    expect(startDate.isSame(today.subtract(7, "d"), "day")).toBe(true);
    expect(endDate.isSame(today, "day")).toBe(true);
  });

  it("returns the correct start and end dates for the last 30 days", () => {
    const [startDate, endDate] = getLastSpecificDays(-30);
    const today = dayjs();

    expect(startDate.isSame(today.subtract(30, "d"), "day")).toBe(true);
    expect(endDate.isSame(today, "day")).toBe(true);
  });

  it("returns the correct start and end dates for the last 0 days", () => {
    const [startDate, endDate] = getLastSpecificDays(0);
    const today = dayjs();

    expect(startDate.isSame(today, "day")).toBe(true);
    expect(endDate.isSame(today, "day")).toBe(true);
  });

  it("returns the correct start and end dates for the future (positive number of days)", () => {
    const [startDate, endDate] = getLastSpecificDays(7);
    const today = dayjs();

    expect(startDate.isSame(today, "day")).toBe(false);
    expect(endDate.isSame(today.add(7, "d"), "day")).toBe(false);
  });
});
