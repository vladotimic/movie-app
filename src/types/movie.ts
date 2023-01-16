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

export interface Genres {
  action: 28;
  comedy: 35;
  adventure: 12;
  animation: 16;
  crime: 80;
  drama: 18;
  fantasy: 14;
  horror: 27;
  mystery: 9648;
  romance: 10749;
  scifi: 878;
  thriller: 53;
  war: 10752;
}
