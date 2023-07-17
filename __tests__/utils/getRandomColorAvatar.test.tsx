import { getRandomColorAvatar } from "@/utils/getRandomColorAvatar";

describe('getRandomColorAvatar', () => {
  test('should return a string', () => {
    const result = getRandomColorAvatar();
    expect(typeof result).toBe('string');
  });

  test('should return a valid color class', () => {
    const result = getRandomColorAvatar();
    const validColorClassRegex = /^account[A-Z][a-zA-Z]*$/; // regex for checking color class

    expect(result).toMatch(validColorClassRegex);
  });
});

