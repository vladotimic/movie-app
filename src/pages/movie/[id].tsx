import { useState, useEffect } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { client } from '../../axios';
import { MovieBanner, MovieDetails } from '../../types';
import { getPopularMovies, getMovieById } from '../../services';
import { Banner } from '../../components';

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await getPopularMovies();
  const paths = data.map((item: MovieBanner) => {
    return {
      params: {
        id: item.id.toString(),
      },
    };
  });
  console.log(paths);

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id;
  console.log(id);
  const movie = await getMovieById(id);

  return {
    props: {
      ...movie,
    },
  };
};

export default function MoviePage(props: MovieDetails) {
  const [movie, setMovie] = useState(props);
  const router = useRouter();
  const movieId = router.query.id;

  const fetchMovie = async (id: number | string | string[]) => {
    try {
      const { data } = await client.get(
        `/movie/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`
      );
      console.log(data);
      setMovie(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (router.isReady && movieId && !props) {
      console.log('no movie from static props');
      fetchMovie(movieId);
    }
  }, [router]);

  const { id, title, backdrop_path } = movie;

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Banner imgUrl={backdrop_path} />
    </>
  );
}
