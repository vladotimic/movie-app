import Image from 'next/image';
import { Box } from '@chakra-ui/react';

interface PosterProps {
  imgUrl: string;
}

const Poster = ({ imgUrl }: PosterProps) => {
  return (
    <Box
      position="relative"
      borderRadius="1rem"
      height="30rem"
      overflow="hidden"
      boxShadow="rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;"
    >
      <Image
        src={`https://image.tmdb.org/t/p/original${imgUrl}`}
        alt="Movie poster"
        fill
        sizes="(max-width: 768px) 100vw,
        (max-width: 1200px) 50vw,
        33vw"
        priority
      />
    </Box>
  );
};

export default Poster;
