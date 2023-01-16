import { getDirector } from './../utils/movie';
import { api } from '../api';
import { popular, singleMovie } from '../data';
import { MovieBase, MovieBanner, Genre } from '../types/movie';
import { genres, fallback } from '../constants/genres';
import { filterCredits } from '@/utils/movie';

const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const env = process.env.NEXT_PUBLIC_NODE_ENV;

type Id = number | string | string[] | undefined;

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

export const getMovieById = async (id: Id) => {
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

export const getWatchProvider = async (id: Id) => {
  try {
    const data = await api.get(
      `/movie/${id}/watch/providers?api_key=${apiKey}`
    );
    return data;
  } catch (error) {
    console.log('There is something wrong with watch provider API!');
    console.error(error);
  }
};

export const getMovieCredits = async (id: Id) => {
  try {
    const {
      data: { cast, crew },
    } = await api.get(`/movie/${id}/credits?api_key=${apiKey}`);
    return {
      cast: filterCredits(cast),
      crew: filterCredits(crew),
      director: getDirector(crew),
    };
  } catch (error) {
    console.log('There is something wrong with credits API!');
    console.error(error);
  }
};

export const getMovieDetails = async (id: Id) => {
  try {
    if (env === 'development') {
      return singleMovie;
    }
    const movieById = await getMovieById(id);
    const credits = await getMovieCredits(id);

    return {
      ...movieById,
      ...credits,
    };
  } catch (error) {
    console.log('There is something wrong with movie API!');
    console.error(error);
  }
};
