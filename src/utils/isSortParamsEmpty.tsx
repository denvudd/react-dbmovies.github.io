import { ParamsState } from "@/redux/params/types";

export const isSortParamsEmpty = (params: ParamsState["params"]): boolean => {
  const isParamsEmpty = Object.values(params).every((value) =>
      typeof value === "object"
        ? Object.values(value).every((subValue) => subValue === "")
        : value === ""
    );

  return isParamsEmpty;
};

