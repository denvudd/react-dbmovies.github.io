import { generateShimmer } from "@/utils/generateShimmer";

describe('generateShimmer', () => {
  it('generates a shimmer effect with default parameters', () => {
    const shimmerEffect = generateShimmer();

    // Assert that the result is a non-empty string
    expect(typeof shimmerEffect).toBe('string');
    expect(shimmerEffect.length).toBeGreaterThan(0);
  });

  it('generates a shimmer effect with custom parameters', () => {
    const shimmerEffect = generateShimmer(500, 600, 30, 60);

    // Assert that the result is a non-empty string
    expect(typeof shimmerEffect).toBe('string');
    expect(shimmerEffect.length).toBeGreaterThan(0);
  });
});