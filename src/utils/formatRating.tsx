export const formatRating = (rating: number): number => {
  return Math.floor((rating / 10) * 100);
};
