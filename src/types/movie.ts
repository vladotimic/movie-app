export interface MovieBase {
  id: number;
  title: string;
  release_date: string;
  backdrop_path: string;
}

export interface MovieBanner extends MovieBase {
  overview: string;
}

export interface MovieDetails extends MovieBase, MovieBanner {
  imdb_id: string;
  original_title: string;
  tagline: string;
  revenue: number;
  runtime: number;
  status: string;
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
