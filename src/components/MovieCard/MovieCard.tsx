import Image from 'next/image';
import Link from 'next/link';
import { Box, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { IMovieCard } from '@/types/movie';

const MovieCard = ({ id, title, poster_path }: IMovieCard) => {
  return (
    <Box
      as={motion.div}
      border="solid 1px #252525"
      borderRadius="0.25rem"
      overflow="hidden"
      w="100%"
      maxW="14rem"
      my="1rem"
      whileHover={{
        scale: 1.05,
        boxShadow: '0px 20px 30px 10px rgba(255,0,0,0.1)',
      }}
    >
      <Link href={`/movie/${id}`}>
        <Box
          position="relative"
          w="inherit"
          h="16rem"
          bg="gray.300"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          {!poster_path ? (
            <Image
              src="/broken-img.svg"
              width={50}
              height={50}
              alt="Broken path"
            />
          ) : (
            <Image
              src={`https://image.tmdb.org/t/p/original${poster_path}`}
              alt="Cast poster picture"
              fill
              sizes="(max-width: 768px) 100vw,
                             (max-width: 1200px) 50vw,
                             33vw"
            />
          )}
        </Box>
        <Box
          w="100%"
          minH="5rem"
          p="1rem 0.5rem"
          bg="blue.900"
        >
          <Text>{title}</Text>
        </Box>
      </Link>
    </Box>
  );
};

export default MovieCard;
