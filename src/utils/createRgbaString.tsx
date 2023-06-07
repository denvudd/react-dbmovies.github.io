export function createRgbaString(colorValues: number[], alpha: string) {
  const [r, g, b] = colorValues.slice(0, 3); 
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}