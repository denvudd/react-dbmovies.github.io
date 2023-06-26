export function getImgFormatFromStr(filename: string) {
  return filename.split(".").pop();
}
