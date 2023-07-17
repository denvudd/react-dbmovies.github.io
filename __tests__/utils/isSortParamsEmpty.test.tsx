import { isSortParamsEmpty } from "@/utils/isSortParamsEmpty";

describe('isSortParamsEmpty', () => {
  it('should return true when all sorting parameters are empty', () => {
    const params = {
      sortBy: "",
      filters: {
        category: "",
        price: null,
        rating: {
          min: "",
          max: null
        }
      }
    };

    const result = isSortParamsEmpty(params);
    expect(result).toBe(true);
  });

  it('should return false when at least one sorting parameter is not empty', () => {
    const params = {
      sortBy: "name",
      filters: {
        category: "",
        price: null,
        rating: {
          min: "",
          max: null
        }
      }
    };

    const result = isSortParamsEmpty(params);
    expect(result).toBe(false);
  });

  it('should return false when all sorting parameters are not empty', () => {
    const params = {
      sortBy: "name",
      filters: {
        category: "books",
        price: 10,
        rating: {
          min: 1,
          max: 5
        }
      }
    };

    const result = isSortParamsEmpty(params);
    expect(result).toBe(false);
  });
});