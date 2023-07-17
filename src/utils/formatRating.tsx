/**
 * A function that converts a raw rating to the proper format. 
 * By default, the raw rating from TMDB is in the range of 0.0 to 10.0, and the resulting rating should be in the range of 0 to 100.
 * @returns number
 * @example
 * const rating = 8.7;
   const formattedRating = formatRating(rating);

   console.log(formattedRating); // Output: 87
*/

export const formatRating = (rating: number): number => {
  return Math.round((rating / 10) * 100);
};
