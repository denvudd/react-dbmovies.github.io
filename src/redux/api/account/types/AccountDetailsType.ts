export interface AccountDetailsApiResponse {
  avatar: {
    gravatar: Gravatar;
    tmdb: TMDBAvatar;
  };
  id: number;
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  include_adult: boolean;
  username: string;
}

interface Gravatar {
  hash: string;
}

interface TMDBAvatar {
  avatar_path: string;
}
