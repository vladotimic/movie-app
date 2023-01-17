export interface Base {
  id: number;
}

export interface MovieBase extends Base {
  title: string;
  release_date: string;
  backdrop_path: string;
}

export interface MovieBanner extends Base, MovieBase {
  overview: string;
}

export interface MovieGenre extends Base {
  name: string;
}

export interface MovieTrailer {
  key: string;
  type: string;
}

export interface MovieDetails extends Base, MovieBase, MovieBanner {
  imdb_id: string;
  original_title: string;
  spoken_languages: MovieGenre[];
  tagline: string;
  budget: number;
  revenue: number;
  runtime: number;
  status: string;
  poster_path: string;
  genres: MovieGenre[];
  homepage: string;
  cast: MovieCredits[];
  crew: MovieCredits[];
  director: string;
  trailer: MovieTrailer[];
}

export interface MovieCredits extends Base, MovieGenre {
  profile_path: string;
  known_for_department: string;
}

export type Genre =
  | 'action'
  | 'comedy'
  | 'adventure'
  | 'animation'
  | 'horror'
  | 'thriller'
  | 'mystery'
  | 'crime'
  | 'drama'
  | 'war'
  | 'fantasy'
  | 'scifi'
  | 'romance';
