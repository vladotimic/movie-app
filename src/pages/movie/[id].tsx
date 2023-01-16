import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { MovieBanner, MovieDetails } from '../../types/movie';
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

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id;
  const movie = await getMovieById(id);

  return {
    props: {
      ...movie,
    },
  };
};

export default function MoviePage(props: MovieDetails) {
  const { title, backdrop_path } = props;

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Banner imgUrl={backdrop_path} />
    </>
  );
}
