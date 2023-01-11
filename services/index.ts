import { client } from '../axios';
import movies from '../data/movies.json';

const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const env = process.env.NODE_ENV;

export const getPopularMovies = async () => {
  if (env === 'development') {
    return movies;
  }
  const { data } = await client.get(
    `/movie/popular?api_key=${apiKey}&language=en-US&page=1`
  );
  return data?.results;
};

export const getMoviesByGenre = async (genreId: number) => {
  const { data } = await client.get(
    `/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_video=ture&page=1&with_genres=${genreId}`
  );
  return data?.results;
};
