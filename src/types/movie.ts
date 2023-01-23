export interface IBase {
  id: number;
}

export interface IMovieBase extends IBase {
  title: string;
  release_date: string;
  backdrop_path: string;
}

export interface IMovieBanner extends IBase, IMovieBase {
  overview: string;
}

export interface IMovieGenre extends IBase {
  name: string;
}

export interface IMovieTrailer {
  key: string;
  type: string;
}

export interface IMovieDetails extends IBase, IMovieBase, IMovieBanner {
  imdb_id: string;
  original_title: string;
  spoken_languages: IMovieGenre[];
  tagline: string;
  budget: number;
  revenue: number;
  runtime: number;
  status: string;
  poster_path: string;
  genres: IMovieGenre[];
  homepage: string;
  cast: IMovieCast[];
  crew: IMovieCrew[];
  director: string;
  trailer: IMovieTrailer[];
}

export interface IMovieCast extends IBase, IMovieGenre {
  profile_path: string;
  known_for_department: string;
}

export interface IMovieCrew extends IBase, IMovieGenre {
  profile_path: string;
  department: string;
}

export interface IMovieCard extends IBase {
  title: string;
  poster_path: string;
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
