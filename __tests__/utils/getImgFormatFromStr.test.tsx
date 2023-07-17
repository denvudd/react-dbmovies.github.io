import { getImgFormatFromStr } from "@/utils/getImgFormatFromStr";

describe("getImgFormatFromStr", () => {
  it("should return the image format when it is a valid format", () => {
    const filename = "image.jpg";
    const imgFormat = getImgFormatFromStr(filename);

    expect(imgFormat).toBe("jpg");
  });

  it("should return 'Invalid format' when the format is not valid", () => {
    const filename = "image.gif";
    const imgFormat = getImgFormatFromStr(filename);

    expect(imgFormat).toBe("Invalid format");
  });

  it("should return 'Invalid format' when the filename has no format", () => {
    const filename = "image";
    const imgFormat = getImgFormatFromStr(filename);

    expect(imgFormat).toBe("Invalid format");
  });
});