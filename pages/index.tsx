import { useState, useEffect } from 'react';
import Head from 'next/head';
import { Movie } from '../types';
import { MovieSection, Header } from '../components';
import { Props as HeaderProps } from '../components/Header/Header';
import {
  getPopularMovies,
  getActionMovies,
  getComedyMovies,
  getHorrorMovies,
  getThrillerMovies,
} from '../services';

interface Props {
  popular: HeaderProps[];
  horror: Movie[];
  action: Movie[];
  comedy: Movie[];
  thriller: Movie[];
}

export async function getServerSideProps() {
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
}

export default function Home(props: Props) {
  const [index, setIndex] = useState(0);
  const { popular, action, comedy, horror, thriller } = props;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIndex(index + 1);
    }, 10000);

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
