import { useEffect, useState } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { Text, Container, Flex, Box, Tag } from '@chakra-ui/react';
import { MovieBanner, MovieDetails } from '../../types/movie';
import { api } from '../../api';
import {
  getPopularMovies,
  getMovieById,
  getMovieCredits,
} from '../../lib/movies';
import { getYear } from '../../utils/date';
import { Banner, Poster } from '../../components';

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
  const {
    id,
    title,
    release_date,
    status,
    overview,
    tagline,
    backdrop_path,
    poster_path,
    genres,
  } = props;
  const [director, setDirector] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const providers = await api.get(
          `/movie/${id}/watch/providers?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
        );
        const credits = await getMovieCredits(id);

        console.log({ providers, credits });
        setDirector(
          credits?.crew.find(
            (c: { known_for_department: string }) =>
              c.known_for_department === 'Directing'
          ).name
        );
      } catch (error) {
        console.log('There is something wrong with watch provider API!');
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Banner imgUrl={backdrop_path}>
        <Flex>
          <Box w="25%">
            <Poster imgUrl={poster_path} />
          </Box>
          <Box
            w="75%"
            ml="3rem"
          >
            <Text
              fontSize="4xl"
              fontWeight="700"
            >
              {title}
              <Text
                as="span"
                ml="0.5rem"
              >
                ({getYear(release_date)})
              </Text>
            </Text>

            <Box
              display="flex"
              alignItems="center"
              my="1rem"
            >
              <Text
                fontSize="lg"
                fontWeight="500"
              >
                Status:
              </Text>
              <Tag
                mx="0.5rem"
                borderRadius="full"
                variant="solid"
                colorScheme={status === 'Released' ? 'green' : 'red'}
              >
                {status}
              </Tag>
              <Text
                fontSize="lg"
                fontWeight="500"
                ml="1rem"
                mr="0.5rem"
              >
                Genres:
              </Text>
              {genres.map((genre) => {
                const { id, name } = genre;
                return (
                  <Tag
                    key={id}
                    mx="0.2rem"
                    borderRadius="full"
                    variant="solid"
                  >
                    {name}
                  </Tag>
                );
              })}
            </Box>

            <Text
              mt="0.5rem"
              fontSize="md"
              fontStyle="italic"
              color="gray.200"
            >
              {tagline}
            </Text>
            <Text
              mt="1rem"
              fontSize="xl"
              fontWeight="700"
            >
              Overview
            </Text>
            <Text
              w="70%"
              mt="0.5rem"
            >
              {overview}
            </Text>
            {director && (
              <Text
                fontSize="xl"
                fontWeight="700"
                mt="1rem"
              >
                Director:{' '}
                <Text
                  as="span"
                  fontWeight="400"
                >
                  {director}
                </Text>
              </Text>
            )}
          </Box>
        </Flex>
      </Banner>
      <Container position="relative"></Container>
    </>
  );
}
