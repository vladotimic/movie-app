export interface Movie {
  id: number;
  backdrop_path: string;
  original_title: string;
  overview: string;
  release_date: string;
}

export interface MovieBanner {
  id: number;
  title: string;
  overview: string;
  imgUrl: string;
}

export interface MovieDetails {
  title: string;
  original_title: string;
  overview: string;
  tagline: string;
  imdb_id: string;
  release_date: string;
  revenue: number;
  runtime: number;
  status: string;
  backdrop_path: string;
  poster_path: string;
}
