import { api } from '../api';
import { popular, singleMovie } from '../data';
import { MovieBase, MovieBanner, Genre } from '../types/movie';
import { genres, fallback } from '../constants/genres';

const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const env = process.env.NEXT_PUBLIC_NODE_ENV;

export const getPopularMovies = async () => {
  try {
    if (env === 'development') {
      return popular;
    }
    const { data } = await api.get(
      `/movie/popular?api_key=${apiKey}&language=en-US&page=1`
    );

    return data?.results.map((movie: MovieBanner) => {
      const { id, title, backdrop_path, overview } = movie;
      return {
        id,
        title,
        overview,
        backdrop_path,
      };
    });
  } catch (error) {
    console.log('There is something wrong with popular API!');
    console.error(error);
  }
};

export const getMovieById = async (
  id: number | string | string[] | undefined
) => {
  if (id) {
    try {
      if (env === 'development') {
        return singleMovie;
      }
      const { data } = await api.get(
        `/movie/${id}?api_key=${apiKey}&language=en-US`
      );
      return data;
    } catch (error) {
      console.log('There is something wrong with movie API!');
      console.error(error);
    }
  }
};

export const getMoviesByGenre = async (genre: Genre) => {
  try {
    if (env === 'development') {
      return fallback[genre];
    }
    const { data } = await api.get(
      `/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_video=ture&page=1&with_genres=${genres[genre]}`
    );
    return data?.results.map((movie: MovieBase) => {
      const { id, title, backdrop_path, release_date } = movie;
      return {
        id,
        title,
        release_date,
        backdrop_path,
      };
    });
  } catch (error) {
    console.log('There is something wrong with genre movie API!');
    console.error(error);
  }
};
