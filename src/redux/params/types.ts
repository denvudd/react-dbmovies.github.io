export interface SortData {
  sortBy: string;
}

export interface AdditionalSortData {
  additionalSortBy: string;
}

export interface ParamsState {
  params: {
    sortData: SortData;
    additionalSortData: AdditionalSortData;
  };
}