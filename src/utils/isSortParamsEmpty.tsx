export const isSortParamsEmpty = (params: any): boolean => {
  const isParamsEmpty = Object.values(params).every((value) => {
    if (typeof value === "object" && value !== null) {
      return Object.values(value).every((subValue) => {
        if (typeof subValue === "object" && subValue !== null) {
          return Object.values(subValue).every((subSubValue) => subSubValue === "" || subSubValue === null);
        }
        return subValue === "" || subValue === null;
      });
    }
    return value === "" || value === null;
  });

  return isParamsEmpty;
};

