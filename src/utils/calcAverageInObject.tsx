export function calcAverageInObject<T>(
  objects: T[],
  property: keyof T
): number {
  const average =
    objects.reduce((sum, obj) => sum + (obj[property] as number), 0) /
    objects.length;
  return Number.isNaN(average) ? 0 : average;
}
