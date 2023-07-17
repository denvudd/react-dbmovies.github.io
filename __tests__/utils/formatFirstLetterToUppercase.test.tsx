import { formatFirstLetterToUppercase } from "@/utils/formatFirstLetterToUppercase";

describe('formatFirstLetterToUppercase', () => {
  it('should capitalize the first letter of a word', () => {
    const inputString = 'hello';
    const expected = 'Hello';
    const result = formatFirstLetterToUppercase(inputString);
    expect(result).toEqual(expected);
  });

  it('should capitalize the first letter of a sentence', () => {
    const inputString = 'hello, world!';
    const expected = 'Hello, world!';
    const result = formatFirstLetterToUppercase(inputString);
    expect(result).toEqual(expected);
  });

  it('should return an empty string if input is empty', () => {
    const inputString = '';
    const expected = '';
    const result = formatFirstLetterToUppercase(inputString);
    expect(result).toEqual(expected);
  });

  it('should not modify an already capitalized string', () => {
    const inputString = 'Hello';
    const expected = 'Hello';
    const result = formatFirstLetterToUppercase(inputString);
    expect(result).toEqual(expected);
  });

  it('should handle strings with leading spaces', () => {
    const inputString = '  hello';
    const expected = 'Hello';
    const result = formatFirstLetterToUppercase(inputString);
    expect(result).toEqual(expected);
  });
});