import { useState, useEffect } from 'react';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { Movie, MovieBanner } from '../types';
import { MovieSection, Header } from '../components';
import {
  getPopularMovies,
  getActionMovies,
  getComedyMovies,
  getHorrorMovies,
  getThrillerMovies,
} from '../services';

interface Props {
  popular: MovieBanner[];
  horror: Movie[];
  action: Movie[];
  comedy: Movie[];
  thriller: Movie[];
}

export const getServerSideProps: GetServerSideProps = async () => {
  const popular = await getPopularMovies();
  const horror = await getHorrorMovies();
  const action = await getActionMovies();
  const comedy = await getComedyMovies();
  const thriller = await getThrillerMovies();

  return {
    props: {
      popular,
      horror,
      action,
      comedy,
      thriller,
    },
  };
};

export default function Home(props: Props) {
  const [index, setIndex] = useState(0);
  const { popular, action, comedy, horror, thriller } = props;

  useEffect(() => {
    const timer = setTimeout(() => {
      let update = index + 1;
      if (index === 19) {
        update = 0;
      }
      setIndex(update);
    }, 10_000);

    return () => {
      clearTimeout(timer);
    };
  }, [index]);

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

      <Header {...popular[index]} />

      <main>
        <MovieSection title="Action" movies={action} />
        <MovieSection title="Comedy" movies={comedy} />
        <MovieSection title="Horror" movies={horror} />
        <MovieSection title="Thriller" movies={thriller} />
      </main>
    </>
  );
}
