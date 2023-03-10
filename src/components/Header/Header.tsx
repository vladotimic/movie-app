import Link from 'next/link';
import { Box, Container, Text, Button } from '@chakra-ui/react';
import { IMovieBanner as Props } from '@/types/movie';

const Header = (props: Props) => {
  const { id, title, overview, backdrop_path } = props;

  return (
    <Box
      position="relative"
      w="100%"
      h="80vh"
    >
      <Box
        position="absolute"
        w="100%"
        h="100%"
        zIndex="1"
      >
        <Container
          maxW="container.xl"
          mt="6rem"
        >
          <Box>
            <Text fontSize={{ base: '3xl', md: '5xl' }}>{title}</Text>
            <Text
              fontSize={{ base: 'lg', md: 'xl' }}
              py="1rem"
            >
              {overview}
            </Text>
            <Link
              href={`/movie/${id}`}
              legacyBehavior
            >
              <Button mt="1rem">Play</Button>
            </Link>
          </Box>
        </Container>
      </Box>
      <Box
        position="absolute"
        w="100%"
        h="100%"
        bottom="0"
        backgroundImage={`https://image.tmdb.org/t/p/original${backdrop_path}`}
        backgroundSize="cover"
        backgroundRepeat="no-repeat"
        backgroundPosition="50% 50%"
      />
      <Box
        position="absolute"
        bottom="0"
        w="100%"
        h="5rem"
        bgGradient="linear(to-b, transparent, black)"
      />
      <Box
        position="absolute"
        top="0"
        w="80%"
        h="100%"
        bgGradient="linear(to-l, transparent, black)"
      />
    </Box>
  );
};

export default Header;
