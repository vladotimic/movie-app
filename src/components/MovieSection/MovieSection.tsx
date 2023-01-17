import Link from 'next/link';
import { Box, Text } from '@chakra-ui/react';
import { A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/a11y';
import { MovieBase } from '../../types/movie';
import { Card, SlideButton } from '../';

interface Props {
  title: string;
  movies: MovieBase[];
}

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
