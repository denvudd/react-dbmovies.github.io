import { truncateString } from "@/utils/truncateString";

describe('truncateString', () => {
  test('should return the original string if it is shorter than the maximum length', () => {
    const str = 'Short string';
    const maxLength = 15;

    const result = truncateString(str, maxLength);
    expect(result).toBe(str);
  });

  test('should truncate the string at the specified position and add ellipsis', () => {
    const str = 'This is a long string that needs to be truncated.';
    const maxLength = 21;
    const expected = 'This is a long string...';

    const result = truncateString(str, maxLength);
    expect(result).toBe(expected);
  });

  test('should handle an empty string correctly', () => {
    const str = '';
    const maxLength = 10;

    const result = truncateString(str, maxLength);
    expect(result).toBe('');
  });

  test('should handle a maxLength of 0 correctly', () => {
    const str = 'Any string';
    const maxLength = 0;

    const result = truncateString(str, maxLength);
    expect(result).toBe('');
  });
});