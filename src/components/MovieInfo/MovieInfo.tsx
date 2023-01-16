import { Text, Flex, Box, Tag, Button } from '@chakra-ui/react';
import { FaPlay } from 'react-icons/fa';
import { MovieGenre } from '../../types/movie';
import { getYear, formatDate } from '../../utils/date';
import { Poster } from '..';

interface Props {
  imgUrl: string;
  title: string;
  overview: string;
  tagline: string;
  status: string;
  director: string;
  lang: string;
  releaseDate: string;
  genres: MovieGenre[];
}

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

const MovieInfo = (props: Props) => {
  const {
    imgUrl,
    title,
    director,
    lang,
    releaseDate,
    genres,
    overview,
    status,
    tagline,
  } = props;

  return (
    <Flex
      flexDirection={{ base: 'column', md: 'row' }}
      gap={5}
    >
      <Box
        w={{ base: '100%', sm: '50%', lg: '30%', xl: '25%' }}
        alignSelf="center"
      >
        <Poster imgUrl={imgUrl} />
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
            ({getYear(releaseDate)})
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
        <TextDesc title="Original Language">{lang}</TextDesc>
        <TextDesc title="Release Date">{formatDate(releaseDate)}</TextDesc>

        <Button
          mt="1rem"
          leftIcon={<FaPlay />}
        >
          Play trailer
        </Button>
      </Box>
    </Flex>
  );
};

export default MovieInfo;
