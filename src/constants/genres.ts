import { Genres } from '../types';
import { horror, thriller, action, comedy } from '../data';

export const genres: Genres = {
  action: 28,
  comedy: 35,
  adventure: 12,
  animation: 16,
  crime: 80,
  drama: 18,
  fantasy: 14,
  horror: 27,
  mystery: 9648,
  romance: 10749,
  scifi: 878,
  thriller: 53,
  war: 10752,
};

export const fallback = {
  action,
  comedy,
  adventure: action,
  animation: action,
  crime: action,
  drama: action,
  fantasy: action,
  horror,
  mystery: horror,
  romance: action,
  scifi: action,
  thriller,
  war: action,
};
