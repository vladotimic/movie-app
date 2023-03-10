import { useState } from 'react';
import Image from 'next/image';
import { Box, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { IMovieBase } from '@/types/movie';
import { formatDate } from '@/utils/date';

interface Props {
  movie: IMovieBase;
  position?: 'first' | 'last' | null;
}

const SlideCard = (props: Props) => {
  const { movie, position } = props;
  const { title, backdrop_path, release_date } = movie;
  const [isHovered, setIsHovered] = useState(false);

  const variants = {
    hover: {
      opacity: 0.9,
    },
    initial: {
      opacity: 0,
    },
  };

  const hover =
    position === 'first'
      ? {
          scale: 1.1,
          zIndex: 2,
          translateX: 20,
        }
      : position === 'last'
      ? { scale: 1.1, zIndex: 2, translateX: -20 }
      : { scale: 1.1, zIndex: 2 };

  return (
    <Box
      as={motion.div}
      maxW={{ md: 'sm' }}
      color="white"
      bg="blue.900"
      position="relative"
      borderRadius="lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={hover}
    >
      <Box
        position="relative"
        w="auto"
        h="230px"
        bg="gray.300"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        {!backdrop_path ? (
          <Image
            src="/broken-img.svg"
            width={50}
            height={50}
            alt="Broken path"
          />
        ) : (
          <Image
            src={`https://image.tmdb.org/t/p/original${backdrop_path}`}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw,
        (max-width: 1200px) 50vw,
        33vw"
          />
        )}
      </Box>
      <Box
        as={motion.div}
        animate={isHovered ? 'hover' : 'initial'}
        variants={variants}
        position="absolute"
        bottom="0"
        left="0"
        w="100%"
        h="7rem"
        bg="blue.900"
        color="white"
        opacity="0"
        p="0.5rem"
      >
        <Text fontSize="xl">{title}</Text>
        <Text fontSize="md">{formatDate(release_date)}</Text>
      </Box>
    </Box>
  );
};

export default SlideCard;
