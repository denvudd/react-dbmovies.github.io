import { formatReleaseDate } from "@/utils/formatReleaseDate";

describe('formatReleaseDate', () => {
  it('formats the release date correctly with default parameters', () => {
    const releaseDate = "2023-06-15";
    const formattedDate = formatReleaseDate(releaseDate);

    expect(formattedDate).toBe("15 червня 2023");
  });

  it('formats the release date correctly with custom locale', () => {
    const releaseDate = "2023-06-15";
    const formattedDate = formatReleaseDate(releaseDate, "en");

    expect(formattedDate).toBe("15 June 2023");
  });

  it('formats the release date correctly with custom format', () => {
    const releaseDate = "2023-06-15";
    const formattedDate = formatReleaseDate(releaseDate, "uk", "MMMM D, YYYY");

    expect(formattedDate).toBe("червень 15, 2023");
  });
});