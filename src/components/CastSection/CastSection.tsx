import { Box, Text } from '@chakra-ui/react';
import { Swiper } from 'swiper/react';
import { MovieCredits } from '../../types/movie';

interface Props {
  cast: MovieCredits[];
}

const CastSection = (props: Props) => {
  const { cast } = props;

  return (
    <Box>
      <Text>Cast</Text>
      {cast && <Swiper slidesPerView={5}></Swiper>}
    </Box>
  );
};

export default CastSection;
