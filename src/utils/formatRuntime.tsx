/**
 * A function that formats the raw runtime to the proper format. 
 * By default, the runtime from TMDB is returned in minutes. 
 * Returns the runtime as a string in the format "0г 0хв" or "0хв".
 * @returns string
 * @example
 * const runtime = 135;
   const formattedRuntime = formatRuntime(runtime);

   console.log(formattedRuntime); // Output: "2г 15хв"
*/

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