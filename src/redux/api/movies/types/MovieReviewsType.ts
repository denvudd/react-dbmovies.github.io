import { ReviewResult } from "../../types/common";

export interface MovieReviewsApiResponse {
  id: number;
  page: number;
  results: ReviewResult[];
}

// Query Args
export interface MovieReviewsQueryArgs {
  id: number;
  params?: string;
}
