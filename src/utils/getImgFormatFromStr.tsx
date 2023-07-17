/**
 * A function that returns the image format from an end path string.
 * @returns string | undefined | "Invalid format"
 * @example
 * const filename = "image.jpg";
   const imgFormat = getImgFormatFromStr(filename);

   console.log(imgFormat); // Output: "jpg"
*/

export function getImgFormatFromStr(
  filename: string
): string | "Invalid format" {
  const format = filename.split(".").pop();
  const isInvalidFormat =
    (format && !["webp", "jpg", "png", "svg", "jpeg"].includes(format)) ||
    format === undefined;

  if (isInvalidFormat) {
    return "Invalid format";
  } else {
    return format;
  }
}
