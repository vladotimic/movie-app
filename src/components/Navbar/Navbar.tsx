import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { Magic } from 'magic-sdk';
import { Box, Container, Link, Button } from '@chakra-ui/react';

const Navbar = () => {
  const router = useRouter();

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

  const handleLogout = async () => {
    try {
      const magic = new Magic(process.env.NEXT_PUBLIC_MAGIC_API_KEY || '');
      await magic.user.logout();
      router.push('/login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box
      position="absolute"
      zIndex="2"
      w="100%"
    >
      <Container
        maxW="container.xl"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        gap={9}
        h="5rem"
      >
        <Box
          display="flex"
          gap={5}
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
        </Box>
        <Button onClick={handleLogout}>Sign Out</Button>
      </Container>
    </Box>
  );
};

export default Navbar;
