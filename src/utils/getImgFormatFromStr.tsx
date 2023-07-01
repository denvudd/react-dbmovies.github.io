/**
 * A function that returns the image format from an end path string.
 * @returns string
 * @example
 * const filename = "image.jpg";
   const imgFormat = getImgFormatFromStr(filename);

   console.log(imgFormat); // Output: "jpg"
*/

export function getImgFormatFromStr(filename: string) {
  return filename.split(".").pop();
}
