export interface TVContentRatingApiResponse {
  id: number;
  results: ContentRating[];
}

export interface ContentRating {
  descriptors: []
  iso_3166_1: string;
  rating: string;
}
