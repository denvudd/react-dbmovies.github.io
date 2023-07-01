type IsRoundType = "to0" | "to2";

/**
 * A function that calculates the average number in an array of objects. Returns a number.
 * @returns number
 * @example
 * const products: Product[] = [
  { name: "Apple", price: 1.99 },
  { name: "Orange", price: 2.49 },
  { name: "Banana", price: 0.99 },
  ];

  const averagePrice = calcAverageInObject(products, "price", "to2");
  console.log(averagePrice); // Output: 1.49
*/

export function calcAverageInObject<T>(
  objects: T[],
  property: keyof T,
  isRoundType: IsRoundType
): number {
  const average =
    objects.reduce((acc, obj) => acc + (obj[property] as number), 0) /
    objects.length;

  // if not an integer
  if (!Number.isInteger(average)) {
    switch (isRoundType) {
      case "to2": {
        const roundedAverage = parseFloat(average.toFixed(2)); // then round to 2 digits
        return isNaN(roundedAverage) ? 0 : roundedAverage; // if NaN return 0
      }
      case "to0": {
        const roundedAverage = parseFloat(average.toFixed(0)); // then round to 0 digits
        return isNaN(roundedAverage) ? 0 : roundedAverage; // if NaN return 0
      }
    }
  }

  // if ineteger
  return average;
}
