import Link from 'next/link';
import { Box, Text, Button } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Scrollbar, A11y, Mousewheel, Keyboard } from 'swiper';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import { Movie } from '../../types';
import { Card } from '../';

interface Props {
  title: string;
  movies: Movie[];
}

const NextButton = () => {
  const swiper = useSwiper();
  return (
    <Button
      position="absolute"
      top="-3"
      right="0"
      zIndex="2"
      h="110%"
      borderRadius="none"
      bg="transparent"
      bgGradient="linear(to-r, rgba(0,0,0,0), #000)"
      _hover={{
        bg: 'transparent',
        bgGradient: 'linear(to-r, rgba(0,0,0,0), #000)',
      }}
      _active={{
        bg: 'transparent',
        bgGradient: 'linear(to-r, rgba(0,0,0,0), #000)',
      }}
      onClick={() => swiper.slideNext()}
    >
      <ChevronRightIcon boxSize="3rem" color="red" />
    </Button>
  );
};

const PrevButton = () => {
  const swiper = useSwiper();
  return (
    <Button
      position="absolute"
      top="-3"
      left="0"
      zIndex="2"
      h="110%"
      borderRadius="none"
      bg="transparent"
      bgGradient="linear(to-l, rgba(0,0,0,0), #000)"
      _hover={{
        bg: 'transparent',
        bgGradient: 'linear(to-l, rgba(0,0,0,0), #000)',
      }}
      _active={{
        bg: 'transparent',
        bgGradient: 'linear(to-l, rgba(0,0,0,0), #000)',
      }}
      onClick={() => swiper.slidePrev()}
    >
      <ChevronLeftIcon boxSize="3rem" color="red" />
    </Button>
  );
};

const MovieSection = (props: Props) => {
  const { title, movies } = props;

  return (
    <Box my="1rem">
      <Text fontSize="4xl" fontWeight="900" mb="0.5rem">
        {title}
      </Text>
      {movies && (
        <Swiper
          modules={[Scrollbar, A11y, Keyboard, Mousewheel]}
          slidesPerView={5}
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          keyboard={{ enabled: true }}
          mousewheel
        >
          <PrevButton />
          <NextButton />
          {movies.map((movie: Movie, index: number) => {
            const { id } = movie;
            const position =
              index === 0
                ? 'first'
                : index === movies.length - 1
                ? 'last'
                : null;
            return (
              <SwiperSlide key={id}>
                <Link href={`/movie/${id}`}>
                  <Card movie={movie} position={position} />
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}
    </Box>
  );
};

export default MovieSection;
