import Link from 'next/link';
import { Box, Text } from '@chakra-ui/react';
import { Navigation, Scrollbar, A11y, Mousewheel, Keyboard } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import { Movie } from '../../types';
import { Card } from '../';

interface Props {
  title: string;
  movies: Movie[];
}

const MovieSection = (props: Props) => {
  const { title, movies } = props;

  return (
    <Box my="1rem">
      <Text fontSize="4xl" fontWeight="900" mb="0.5rem">
        {title}
      </Text>
      {movies && (
        <Swiper
          modules={[Navigation, Scrollbar, A11y, Keyboard, Mousewheel]}
          slidesPerView={5}
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          keyboard={{ enabled: true }}
          mousewheel
          onSwiper={(swiper) => console.log(swiper)}
        >
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
