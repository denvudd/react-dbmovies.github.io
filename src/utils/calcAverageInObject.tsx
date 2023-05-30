type IsRoundType = "to0" | "to2";

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
        break;
      }
      case "to0": {
        const roundedAverage = parseFloat(average.toFixed(0)); // then round to 0 digits
        return isNaN(roundedAverage) ? 0 : roundedAverage; // if NaN return 0
        break;
      }
    }
  }

  // if ineteger
  return average;
}
