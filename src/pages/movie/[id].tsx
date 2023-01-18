import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Container, Text, Flex, Box, Tag, Button } from '@chakra-ui/react';
import { FaPlay } from 'react-icons/fa';
import { MovieBanner, MovieDetails } from '@/types/movie';
import { getPopularMovies, getMovieDetails } from '@/lib/movies';
import { getYear, formatDate } from '@/utils/date';
import { Banner, CastSection, Poster } from '@/components';

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

const TextDesc = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <Text
      fontSize="lg"
      fontWeight="700"
      mt="0.5rem"
    >
      {title}:{' '}
      <Text
        as="span"
        fontWeight="400"
      >
        {children}
      </Text>
    </Text>
  );
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
        <Flex
          flexDirection={{ base: 'column', md: 'row' }}
          gap={5}
        >
          <Box
            w="100%"
            maxW="22rem"
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
                  mr="0.5rem"
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
            <Text my="0.5rem">{overview}</Text>

            <TextDesc title="Director">{director}</TextDesc>
            <TextDesc title="Original Language">
              {spoken_languages[0].name}
            </TextDesc>
            <TextDesc title="Release Date">{formatDate(release_date)}</TextDesc>

            <Button
              mt="1rem"
              leftIcon={<FaPlay />}
            >
              Play trailer
            </Button>
          </Box>
        </Flex>
      </Banner>
      <Container maxW="container.xl">
        <CastSection casts={cast} />
      </Container>
    </>
  );
}
