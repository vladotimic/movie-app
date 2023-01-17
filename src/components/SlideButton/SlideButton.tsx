import { Button } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { useSwiper } from 'swiper/react';

interface ButtonProps {
  type: 'next' | 'prev';
}

const SlideButton = ({ type }: ButtonProps) => {
  const swiper = useSwiper();
  const btnPosition = type === 'next' ? { right: '-4' } : { left: '-4' };
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
      minW="5rem"
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

export default SlideButton;
