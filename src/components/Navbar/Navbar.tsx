import NextLink from 'next/link';
import { Box, Container, Link } from '@chakra-ui/react';

const Navbar = () => {
  const links = [
    {
      id: 1,
      href: '/',
      text: 'Home',
    },
    {
      id: 2,
      href: '/browse',
      text: 'Browse',
    },
  ];

  return (
    <Box
      position="absolute"
      zIndex="2"
      w="100%"
    >
      <Container
        maxW="container.xl"
        display="flex"
        alignItems="center"
        gap={9}
        h="3rem"
      >
        {links.map((link) => {
          const { id, href, text } = link;
          return (
            <Link
              key={id}
              as={NextLink}
              href={href}
            >
              {text}
            </Link>
          );
        })}
      </Container>
    </Box>
  );
};

export default Navbar;
