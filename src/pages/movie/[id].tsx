import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { Text, Container, Flex, Box, Tag, Button } from '@chakra-ui/react';
import { FaPlay } from 'react-icons/fa';
import { MovieBanner, MovieDetails } from '../../types/movie';
import { getPopularMovies, getMovieDetails } from '../../lib/movies';
import { getYear, formatDate } from '../../utils/date';
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
    tagline,
    backdrop_path,
    poster_path,
    genres,
    director,
  } = props;
  console.log({ props });

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Banner imgUrl={backdrop_path}>
        <Flex
          flexDirection={{ base: 'column', md: 'row' }}
          gap={5}
        >
          <Box
            w={{ base: '100%', sm: '50%', lg: '30%', xl: '25%' }}
            alignSelf="center"
          >
            <Poster imgUrl={poster_path} />
          </Box>
          <Box
            w={{ base: '100%', md: '70%' }}
            mt={{ base: '3rem', md: 0 }}
          >
            <Text
              fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }}
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
              flexWrap="wrap"
              my="0.5rem"
            >
              <Box
                display="flex"
                mt="0.5rem"
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
              </Box>

              <Box
                display="flex"
                mt="0.5rem"
              >
                <Text
                  fontSize="lg"
                  fontWeight="500"
                  mr="0.5rem"
                >
                  Genres:
                </Text>
                <Box>
                  {genres.map((genre) => {
                    const { id, name } = genre;
                    return (
                      <Tag
                        key={id}
                        m="0.2rem"
                        borderRadius="full"
                        variant="solid"
                      >
                        {name}
                      </Tag>
                    );
                  })}
                </Box>
              </Box>
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
              fontSize="lg"
              fontWeight="700"
            >
              Overview
            </Text>
            <Text mt="0.5rem">{overview}</Text>
            {director && (
              <Text
                fontSize="lg"
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
            <Text
              mt="0.5rem"
              fontSize="lg"
              fontWeight="700"
            >
              Release Date:{' '}
              <Text
                as="span"
                fontWeight="400"
              >
                {formatDate(release_date)}
              </Text>
            </Text>

            <Button
              mt="1rem"
              leftIcon={<FaPlay />}
            >
              Play trailer
            </Button>
          </Box>
        </Flex>
      </Banner>
      <Container position="relative"></Container>
    </>
  );
}
