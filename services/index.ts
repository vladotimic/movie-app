import { api } from '../api';

export const getPopularMovies = async () => {
  const { data } = await api.get(
    `/movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&page=1`
  );
  return data?.results;
};
