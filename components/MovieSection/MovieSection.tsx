import Link from 'next/link';
import { Box, Text } from '@chakra-ui/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import 'swiper/css';
import { Movie } from '../../types';
import { Card } from '../';

interface Props {
  title: string;
  movies: Movie[];
}

const MovieSection = (props: Props) => {
  const { title, movies } = props;
  const swiper = useSwiper();

  return (
    <Box my="1rem">
      <Text fontSize="4xl" fontWeight="900" mb="0.5rem">
        {title}
      </Text>
      {movies && (
        <Swiper
          // style={{ overflow: 'visible' }}
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          slidesPerView={4}
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => console.log(swiper)}
        >
          {movies.map((movie: Movie) => {
            const { id } = movie;
            return (
              <SwiperSlide key={id}>
                <Link href={`/movie/${id}`}>
                  <Card {...movie} />
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
