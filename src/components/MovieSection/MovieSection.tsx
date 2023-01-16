import Link from 'next/link';
import { Box, Text, Button } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { A11y } from 'swiper';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/a11y';
import { MovieBase } from '../../types/movie';
import { Card } from '../';

interface Props {
  title: string;
  movies: MovieBase[];
}

interface ButtonProps {
  type: 'next' | 'prev';
}

const SlideButton = ({ type }: ButtonProps) => {
  const swiper = useSwiper();
  const btnPosition = type === 'next' ? { right: '0' } : { left: '0' };
  const gradient = type === 'next' ? 'to-r' : 'to-l';
  const handleSlide = () => {
    return type === 'next' ? swiper.slideNext() : swiper.slidePrev();
  };

  return (
    <Button
      position="absolute"
      top="-3"
      zIndex="2"
      h="110%"
      borderRadius="none"
      bg="transparent"
      bgGradient={`linear(${gradient}, rgba(0,0,0,0), #000)`}
      sx={btnPosition}
      _hover={{
        bg: 'transparent',
        bgGradient: `linear(${gradient}, rgba(0,0,0,0), #000)`,
      }}
      _active={{
        bg: 'transparent',
        bgGradient: `linear(${gradient}, rgba(0,0,0,0), #000)`,
      }}
      onClick={handleSlide}
    >
      {type === 'next' ? (
        <ChevronRightIcon
          boxSize="3rem"
          color="red"
        />
      ) : (
        <ChevronLeftIcon
          boxSize="3rem"
          color="red"
        />
      )}
    </Button>
  );
};

const MovieSection = (props: Props) => {
  const { title, movies } = props;

  return (
    <Box my="1rem">
      <Text
        fontSize="4xl"
        fontWeight="900"
        mb="0.5rem"
      >
        {title}
      </Text>
      {movies && (
        <Swiper
          modules={[A11y]}
          slidesPerView={5}
        >
          <SlideButton type="next" />
          <SlideButton type="prev" />
          {movies.map((movie: MovieBase, index: number) => {
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
                  <Card
                    movie={movie}
                    position={position}
                  />
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
