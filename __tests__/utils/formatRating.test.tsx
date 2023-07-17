import { formatRating } from "@/utils/formatRating";

describe('formatRating', () => {
  test('should format rating correctly', () => {
    const rawRating = 8.7;
    const expectedFormattedRating = 87;

    const formattedRating = formatRating(rawRating);

    expect(formattedRating).toBe(expectedFormattedRating);
  });

  test('should format rating 0 correctly', () => {
    const rawRating = 0;
    const expectedFormattedRating = 0;

    const formattedRating = formatRating(rawRating);

    expect(formattedRating).toBe(expectedFormattedRating);
  });

  test('should format rating 10 correctly', () => {
    const rawRating = 10;
    const expectedFormattedRating = 100;

    const formattedRating = formatRating(rawRating);

    expect(formattedRating).toBe(expectedFormattedRating);
  });
});