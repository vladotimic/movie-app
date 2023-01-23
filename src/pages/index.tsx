import { useState, useEffect } from 'react';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { IMovieBase, IMovieBanner } from '@/types/movie';
import { MovieSection, Header } from '@/components';
import { getAllPopularMovies } from '@/lib/movies';

interface Movie {
  title: string;
  movies: IMovieBase[];
}

interface Props {
  popular: IMovieBanner[];
  movies: Movie[];
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
  const { popular, movies } = props;

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
        {movies &&
          movies.map((movie: Movie, index: number) => {
            const { title, movies } = movie;
            return (
              <MovieSection
                key={`movie-section-id-${index + 1}`}
                title={title}
                movies={movies}
              />
            );
          })}
      </main>
    </>
  );
}
