import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { Magic } from 'magic-sdk';
import '../styles/global.css';
import theme from '../theme';
import { Navbar } from '@/components';

export default function App({ Component, pageProps }: AppProps) {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const handleLogin = async () => {
      try {
        const magic = new Magic(process.env.NEXT_PUBLIC_MAGIC_API_KEY || '');
        const isLoggedIn = await magic.user.isLoggedIn();

        if (isLoggedIn) {
          router.push('/');
        } else {
          router.push('/login');
        }
      } catch (error) {
        console.error(error);
      }
    };
    handleLogin();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const handleComplete = () => {
      setIsLoading(false);
    };

    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <Navbar />
      {isLoading ? 'Loading...' : <Component {...pageProps} />}
    </ChakraProvider>
  );
}
