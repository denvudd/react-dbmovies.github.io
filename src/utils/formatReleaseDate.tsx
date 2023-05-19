import dayjs from "dayjs";
import "dayjs/locale/uk"; // Подключаем локаль "uk"

export const formatReleaseDate = (
  release: string,
  locale: string = "uk",
  format: string = "DD MMMM YYYY"
): string => {
  return dayjs(release).locale(locale).format(format);
};
