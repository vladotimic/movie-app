import { useState } from 'react';
import Image from 'next/image';
import { Box, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Movie } from '../../types';
import { formatDate } from '../../utils/date';

const Card = (props: Movie) => {
  const { original_title, backdrop_path, release_date } = props;
  const [isHovered, setIsHovered] = useState(false);

  const variants = {
    hover: {
      opacity: 0.9,
    },
    initial: {
      opacity: 0,
    },
  };

  return (
    <Box
      as={motion.div}
      maxW="sm"
      color="white"
      bg="blue.900"
      borderRadius="lg"
      position="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{
        scale: 1.1,
        zIndex: 2,
      }}
    >
      <Box position="relative" w="auto" h="230px">
        <Image
          src={`https://image.tmdb.org/t/p/original${backdrop_path}`}
          alt={original_title}
          fill
          sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
        />
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
        <Text fontSize="xl">{original_title}</Text>
        <Text fontSize="md">{formatDate(release_date)}</Text>
      </Box>
    </Box>
  );
};

export default Card;
