import { useState, useEffect } from 'react';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { MovieBase, MovieBanner } from '../types';
import { MovieSection, Header } from '../components';
import { getPopularMovies, getMoviesByGenre } from '../services';

interface Props {
  popular: MovieBanner[];
  horror: MovieBase[];
  action: MovieBase[];
  comedy: MovieBase[];
  thriller: MovieBase[];
}

export const getServerSideProps: GetServerSideProps = async () => {
  const popular = await getPopularMovies();
  const action = await getMoviesByGenre('action');
  const comedy = await getMoviesByGenre('comedy');
  const horror = await getMoviesByGenre('horror');
  const thriller = await getMoviesByGenre('thriller');

  return {
    props: {
      popular,
      action,
      comedy,
      horror,
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
