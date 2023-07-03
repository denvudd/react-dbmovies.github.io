export interface TVReviewsApiResponse {
  id: number;
  page: number;
  results: ReviewResult[];
}

export interface ReviewResult {
  author: string;
  author_details: ReviewAuthorDetails;
  content: string;
  created_at: string;
  id: string;
  updated_at: string;
  url: string;
}

export interface ReviewAuthorDetails {
  name: string | null;
  username: string;
  avatar_path: string | null;
  rating: number | null;
}

// Query Args
export interface MovieReviewsQueryArgs {
  id: number;
  params?: string;
}
