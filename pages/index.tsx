import { useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Flex, Container } from '@chakra-ui/react';
import { Movie } from '../types';
import { Card } from '../components';
import { client } from '../axios';
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
  useEffect(() => {
    async function fetchData() {
      try {
        // fetch most popular horror movies
        const data = await client.get(
          `/discover/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&include_video=ture&page=1&with_genres=27`
        );
        console.log({ data });
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);
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
        <Container maxW="1200px" my="2rem">
          {movies && (
            <Flex flexWrap="wrap" gap="2">
              {movies.map((movie: Movie) => {
                const { id } = movie;
                return (
                  <Link key={id} href={`/movie/${id}`}>
                    <Card {...movie} />
                  </Link>
                );
              })}
            </Flex>
          )}
        </Container>
      </main>
    </>
  );
}
