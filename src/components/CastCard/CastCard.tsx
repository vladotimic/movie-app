import Image from 'next/image';
import { Box, Text } from '@chakra-ui/react';

interface Props {
  imgUrl: string;
  name: string;
}

const CastCard = (props: Props) => {
  const { imgUrl, name } = props;

  return (
    <Box
      borderRadius="0.2rem"
      overflow="hidden"
      w="7rem"
    >
      <Box
        position="relative"
        w="auto"
        h="9rem"
        bg="gray.300"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        {!imgUrl ? (
          <Image
            src="/broken-img.svg"
            width={50}
            height={50}
            alt="Broken path"
          />
        ) : (
          <Image
            src={`https://image.tmdb.org/t/p/original${imgUrl}`}
            alt="Cast poster picture"
            fill
            sizes="(max-width: 768px) 100vw,
                 (max-width: 1200px) 50vw,
                 33vw"
          />
        )}
      </Box>
      <Box
        bg="blue.900"
        h="4rem"
        p="0.4rem"
        display="flex"
        justifyContent="center"
      >
        <Text fontWeight="500">{name}</Text>
      </Box>
    </Box>
  );
};

export default CastCard;
