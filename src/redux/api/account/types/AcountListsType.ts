export interface AccountListsApiResponse {
  page: number;
  results: ListItem[];
  total_pages: number;
  total_results: number;
}

interface ListItem {
  description: string;
  favorite_count: number;
  id: number;
  item_count: number;
  iso_639_1: string;
  list_type: string;
  name: string;
  poster_path: string | null;
}