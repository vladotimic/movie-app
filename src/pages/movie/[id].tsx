import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Container } from '@chakra-ui/react';
import { MovieBanner, MovieDetails } from '@/types/movie';
import { getPopularMovies, getMovieDetails } from '@/lib/movies';
import { Banner, MovieInfo, CastSection } from '@/components';

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await getPopularMovies();
  const paths = data.map((item: MovieBanner) => {
    return {
      params: {
        id: item.id.toString(),
      },
    };
  });

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id;
  const movie = await getMovieDetails(id);

  return {
    props: {
      ...movie,
    },
  };
};

export default function MoviePage(props: MovieDetails) {
  const {
    title,
    release_date,
    status,
    overview,
    spoken_languages,
    tagline,
    backdrop_path,
    poster_path,
    genres,
    director,
    cast,
  } = props;
  console.log(props);
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Banner imgUrl={backdrop_path}>
        <MovieInfo
          title={title}
          director={director}
          overview={overview}
          releaseDate={release_date}
          genres={genres}
          imgUrl={poster_path}
          tagline={tagline}
          lang={spoken_languages[0].name}
          status={status}
        />
      </Banner>
      <Container maxW="container.xl">
        <CastSection casts={cast} />
      </Container>
    </>
  );
}
