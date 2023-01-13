import { Box } from '@chakra-ui/react';

interface Props {
  children?: React.ReactNode;
  imgUrl: string;
}

const Banner = (props: Props) => {
  const { children, imgUrl } = props;

  return (
    <Box position="relative" w="100%" h="80vh">
      {children}
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
        top="0"
        w="100%"
        h="100%"
        bgGradient="linear(to-l, transparent, black)"
      />
    </Box>
  );
};

export default Banner;
