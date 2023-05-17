export interface MovieGenresResponseApi {
  genres: Genre[];
}

export interface Genre {
  id: number;
  name: string;
}
