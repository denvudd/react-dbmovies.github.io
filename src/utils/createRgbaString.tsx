/**
 * A function that returns an RGBA string from an array of RGBA values. It takes an array of values and an alpha channel as parameters.
 * @returns string
 * @example
 * const colorValues = [255, 0, 0]; // Red color values
   const alpha = "0.5";

   const rgbaString = createRgbaString(colorValues, alpha);
   console.log(rgbaString); // Output: rgba(255, 0, 0, 0.5)
*/

export function createRgbaString(colorValues: number[], alpha: string) {
  const [r, g, b] = colorValues.slice(0, 3);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
