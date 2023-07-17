import { createRgbaString } from "@/utils/createRgbaString";

describe('createRgbaString', () => {
  it('returns the correct RGBA string', () => {
    const colorValues = [255, 0, 0];
    const alpha = "0.5";
    expect(createRgbaString(colorValues, alpha)).toEqual('rgba(255, 0, 0, 0.5)');

    const colorValues2 = [0, 128, 255];
    const alpha2 = "0.75";
    expect(createRgbaString(colorValues2, alpha2)).toEqual('rgba(0, 128, 255, 0.75)');
  });

  it('returns the RGBA string with truncated values if the array length is greater than 3', () => {
    const colorValues = [255, 0, 0, 128, 64];
    const alpha = "0.5";
    expect(createRgbaString(colorValues, alpha)).toEqual('rgba(255, 0, 0, 0.5)');
  });
});