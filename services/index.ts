import { client } from '../axios';

export const getPopularMovies = async () => {
  const { data } = await client.get(
    `/movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&page=1`
  );
  return data?.results;
};
