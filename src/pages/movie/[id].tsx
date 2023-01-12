import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { GetStaticProps, GetStaticPaths } from 'next';
import { Text } from '@chakra-ui/react';
import { client } from '../../axios';
import { getPopularMovies, getMovieById } from '../../services';
import { MovieBanner, MovieDetails as Props } from '../../types';

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await getPopularMovies();
  const paths = data.map((item: MovieBanner) => {
    const id = item.id.toString();
    return {
      params: { id },
    };
  });

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = Number(params?.id);

  const movie = id ? await getMovieById(id) : null;

  return {
    props: {
      ...movie,
    },
  };
};

export default function MoviePage(props: Props) {
  const [movie, setMovie] = useState(props);
  const router = useRouter();
  const movieId = router.query.id;

  const { title, overview } = movie;

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await client.get(
          `/movie/${movieId}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`
        );
        console.log(data);
        setMovie(data);
      } catch (error) {
        console.log(error);
      }
    }
    if (!props.imdb_id) {
      fetchData();
    }
  }, []);

  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      <Text fontSize="5xl" fontWeight="700">
        {title}
      </Text>
      <Text fontSize="lg">{overview}</Text>
    </div>
  );
}
