import { Box, Container } from '@chakra-ui/react';

interface Props {
  children?: React.ReactNode;
  imgUrl: string;
}

const Banner = (props: Props) => {
  const { children, imgUrl } = props;

  return (
    <Box
      position="relative"
      w="100%"
      h="80vh"
    >
      <Container
        position="relative"
        zIndex="1"
        pt="5rem"
        maxW="container.xl"
      >
        {children}
      </Container>
      <Box
        position="absolute"
        w="100%"
        h="100%"
        bottom="0"
        backgroundImage={
          imgUrl ? `https://image.tmdb.org/t/p/original${imgUrl}` : undefined
        }
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
        bottom="0"
        w="100%"
        h="100%"
        bg="black"
        opacity="0.7"
      />
    </Box>
  );
};

export default Banner;
