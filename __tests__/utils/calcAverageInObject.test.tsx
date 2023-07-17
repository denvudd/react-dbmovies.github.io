import { calcAverageInObject } from "@/utils/calcAverageInObject";

describe('calcAverageInObject', () => {
  const products = [
    { name: "Apple", price: 1.99 },
    { name: "Orange", price: 2.49 },
    { name: "Banana", price: 0.99 },
  ];

  it('calculates the average with rounding to 2 digits', () => {
    const averagePrice = calcAverageInObject(products, "price", "to2");
    expect(averagePrice).toEqual(1.82);
  });

  it('calculates the average with rounding to 0 digits', () => {
    const averagePrice = calcAverageInObject(products, "price", "to0");
    expect(averagePrice).toEqual(2);
  });

  it('returns 0 when the array is empty', () => {
    const averagePrice = calcAverageInObject([], "price", "to2");
    expect(averagePrice).toEqual(0);
  });

  it('returns 0 when the average is NaN', () => {
    const averagePrice = calcAverageInObject([{ name: "Apple" }], "name", "to2");
    expect(averagePrice).toEqual(0);
  });
});