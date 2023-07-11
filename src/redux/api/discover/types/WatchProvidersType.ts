export interface WatchProvidersApiResponse {
  results: WatchProvider[];
}

interface WatchProvider {
  display_priorities: number[];
  display_priority: number;
  logo_path: string;
  provider_name: string;
  provider_id: number;
}

export interface WatchProvidersQueryArgs {
  language: string;
  watch_region: string;
  type: "movie" | "tv";
}