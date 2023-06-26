export const formatRuntime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (hours === 0) {
    return `${remainingMinutes}хв`;
  } else if (remainingMinutes === 0) {
    return `${hours}г`;
  } else {
    return `${hours}г ${remainingMinutes}хв`;
  }
}