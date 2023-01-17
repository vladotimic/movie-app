import { useState, useEffect } from 'react';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { MovieBase, MovieBanner } from '../types/movie';
import { MovieSection, Header } from '../components';
import { getAllPopularMovies } from '../lib/movies';

interface Props {
  popular: MovieBanner[];
  horror: MovieBase[];
  action: MovieBase[];
  comedy: MovieBase[];
  thriller: MovieBase[];
  adventure: MovieBase[];
  animation: MovieBase[];
  crime: MovieBase[];
  drama: MovieBase[];
  fantasy: MovieBase[];
  mystery: MovieBase[];
  scifi: MovieBase[];
  war: MovieBase[];
  romance: MovieBase[];
}

export const getServerSideProps: GetServerSideProps = async () => {
  const movies = await getAllPopularMovies();

  return {
    props: {
      ...movies,
    },
  };
};

export default function Home(props: Props) {
  const [index, setIndex] = useState(0);
  const {
    popular,
    action,
    comedy,
    horror,
    thriller,
    adventure,
    animation,
    crime,
    drama,
    fantasy,
    mystery,
    scifi,
    war,
    romance,
  } = props;

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
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <link
          rel="icon"
          href="/favicon.ico"
        />
      </Head>

      <Header {...popular[index]} />

      <main>
        <MovieSection
          title="Action"
          movies={action}
        />
        <MovieSection
          title="Comedy"
          movies={comedy}
        />
        <MovieSection
          title="Horror"
          movies={horror}
        />
        <MovieSection
          title="Thriller"
          movies={thriller}
        />
        <MovieSection
          title="Adventure"
          movies={adventure}
        />
        <MovieSection
          title="Animation"
          movies={animation}
        />
        <MovieSection
          title="Crime"
          movies={crime}
        />
        <MovieSection
          title="Drama"
          movies={drama}
        />
        <MovieSection
          title="Mystery"
          movies={mystery}
        />
        <MovieSection
          title="Fantasy"
          movies={fantasy}
        />
        <MovieSection
          title="Science Fiction"
          movies={scifi}
        />
        <MovieSection
          title="War"
          movies={war}
        />
        <MovieSection
          title="Romance"
          movies={romance}
        />
      </main>
    </>
  );
}
