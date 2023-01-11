import Head from 'next/head';
import { Movie } from '../types';
import { MovieSection } from '../components';
import { getPopularMovies } from '../services';

interface Props {
  movies: Movie[];
}

export async function getServerSideProps() {
  const movies = await getPopularMovies();

  return {
    props: {
      movies,
    },
  };
}

export default function Home({ movies }: Props) {
  return (
    <>
      <Head>
        <title>Movie App</title>
        <meta
          name="description"
          content="See the most popular movies at the moment!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <MovieSection title="Horror" movies={movies} />
        <MovieSection title="Action" movies={movies} />
        <MovieSection title="Comedy" movies={movies} />
        <MovieSection title="Thriller" movies={movies} />
      </main>
    </>
  );
}
