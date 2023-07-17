import { formatBudget } from '@/utils/formatBudget';

describe('formatBudget', () => {
  it('should format the budget with default format if no format is provided', () => {
    const inputNumber = 1000000;
    const expected = '1,000,000';
    const result = formatBudget(inputNumber);
    expect(result).toEqual(expected);
  });

  it('should format the budget with provided format', () => {
    const inputNumber = 1000000;
    const format = '$0,0.00';
    const expected = '$1,000,000.00';
    const result = formatBudget(inputNumber, format);
    expect(result).toEqual(expected);
  });

  it('should format negative budget with provided format', () => {
    const inputNumber = -1000000;
    const format = '($0,0)';
    const expected = '($1,000,000)';
    const result = formatBudget(inputNumber, format);
    expect(result).toEqual(expected);
  });

  it('should format budget with decimal places', () => {
    const inputNumber = 1234567.89;
    const format = '0,0.00';
    const expected = '1,234,567.89';
    const result = formatBudget(inputNumber, format);
    expect(result).toEqual(expected);
  });

  it('should format budget with different format for thousands', () => {
    const inputNumber = 1000000;
    const format = '0.0a';
    const expected = '1.0m';
    const result = formatBudget(inputNumber, format);
    expect(result).toEqual(expected);
  });
});