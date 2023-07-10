export interface AddTVEpisodeRatingQueryArgs {
  series_id: number;
  session_id: string;
  season_number: number;
  episode_number: number;
  rating: number;
}