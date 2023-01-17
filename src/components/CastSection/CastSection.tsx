import { Box, Text } from '@chakra-ui/react';
import { A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/a11y';
import { MovieCredits } from '../../types/movie';
import { CastCard, SlideButton } from '../';

interface Props {
  casts: MovieCredits[];
}

const CastSection = (props: Props) => {
  const { casts } = props;

  return (
    <Box overflow="hidden">
      <Text
        fontSize="3xl"
        fontWeight="700"
        pb="0.5rem"
      >
        Cast
      </Text>

      {casts && (
        <Swiper
          modules={[A11y]}
          spaceBetween={10}
          slidesPerView={9}
        >
          <SlideButton type="next" />
          <SlideButton type="prev" />
          {casts.map((cast: MovieCredits) => {
            const { id, name, profile_path } = cast;
            return (
              <SwiperSlide key={id}>
                <CastCard
                  imgUrl={profile_path}
                  name={name}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}
    </Box>
  );
};

export default CastSection;
