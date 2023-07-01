/**
 * A function that checks if sorting parameters are empty. Returns a boolean value.
 * @returns boolean
 * @example
 * const params = {
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

   const isEmpty = isSortParamsEmpty(params);

   console.log(isEmpty); // Output: false
*/

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

