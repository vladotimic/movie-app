import { client } from '../axios';
import { popular, horror, thriller, action, comedy } from '../data';
import { Movie } from '../../types';

const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const env = process.env.NEXT_PUBLIC_NODE_ENV;

export const getPopularMovies = async () => {
  try {
    const { data } = await client.get(
      `/movie/popular?api_key=${apiKey}&language=en-US&page=1`
    );

    const movies =
      env === 'development'
        ? popular
        : data?.results.map((movie: Movie) => {
            const { id, original_title, backdrop_path, overview } = movie;
            return {
              id,
              title: original_title,
              overview,
              imgUrl: `https://image.tmdb.org/t/p/original${backdrop_path}`,
            };
          });
    return movies;
  } catch (error) {
    console.log('There is something wrong with popular API!');
    console.error(error);
  }
};

export const getMoviesByGenre = async (genreId: number) => {
  try {
    const { data } = await client.get(
      `/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_video=ture&page=1&with_genres=${genreId}`
    );
    return data?.results;
  } catch (error) {
    console.log('There is something wrong with genre movie API!');
    console.error(error);
  }
};

export const getHorrorMovies = async () => {
  try {
    return env === 'development' ? horror : await getMoviesByGenre(27);
  } catch (error) {
    console.log('There is something wrong with genre movie API!');
    console.error(error);
  }
};

export const getThrillerMovies = async () => {
  try {
    return env === 'development' ? thriller : await getMoviesByGenre(53);
  } catch (error) {
    console.log('There is something wrong with genre movie API!');
    console.error(error);
  }
};

export const getActionMovies = async () => {
  try {
    return env === 'development' ? action : await getMoviesByGenre(28);
  } catch (error) {
    console.log('There is something wrong with genre movie API!');
    console.error(error);
  }
};

export const getComedyMovies = async () => {
  try {
    return env === 'development' ? comedy : await getMoviesByGenre(35);
  } catch (error) {
    console.log('There is something wrong with genre movie API!');
    console.error(error);
  }
};
