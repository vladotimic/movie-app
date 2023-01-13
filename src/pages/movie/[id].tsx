import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { client } from '../../axios';
import { MovieDetails } from '../../types';
import { Banner } from '../../components';

export default function MoviePage(props: MovieDetails) {
  const [movie, setMovie] = useState(props);
  const router = useRouter();
  const movieId = router.query.id;
  console.log({ movie });

  const { id, title, backdrop_path } = movie;

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
    if (router.isReady && movieId && !id) {
      fetchMovie(movieId);
    }
  }, [router]);

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Banner imgUrl={backdrop_path} />
    </>
  );
}
