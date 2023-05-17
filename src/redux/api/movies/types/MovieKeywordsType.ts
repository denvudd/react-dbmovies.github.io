export interface MovieKeywordApiResponse {
  id: number;
  keywords: Keyword[];
}

interface Keyword {
  id: number;
  name: string;
}
