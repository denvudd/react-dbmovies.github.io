export enum SortValue {
  None = "",
  PopularityDesc = "popularity.desc",
  PopularityAsc = "popularity.asc",
  VoteAverageDesc = "vote_average.desc",
  VoteAverageAsc = "vote_average.asc",
  ReleaseDateDesc = "primary_release_date.desc",
  ReleaseDateAsc = "primary_release_date.asc",
  RevenueDesc = "revenue.desc",
  RevenueAsc = "revenue.asc",
}

export interface SortData {
  sortBy: SortValue;
}

export interface AdditionalSortData {
  releaseDates: {
    date_gte: string | null;
    date_lte: string | null;
  };
  genres: string[] | null;
  language: string | null;
  voteAverage: {
    voteAverage_gte: string | null;
    voteAverage_lte: string | null;
  };
  voteCount: {
    voteCount_gte: string | null;
    voteCount_lte: string | null;
  };
  runtime: {
    runtime_gte: string | null;
    runtime_lte: string | null;
  };
  keywords: string[] | null;
}

export interface ParamsState {
  params: {
    sortData: SortData;
    additionalSortData: AdditionalSortData;
  };
}
