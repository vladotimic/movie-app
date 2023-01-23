import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Text,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
} from '@chakra-ui/react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Magic } from 'magic-sdk';
import { formatMessage } from '@/utils/string';

interface IInputs {
  email: string;
}

const schema = yup
  .object({
    email: yup.string().email().required(),
  })
  .required();

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IInputs> = async ({ email }: IInputs) => {
    setIsLoading(true);

    if (email) {
      try {
        const magic = new Magic(process.env.NEXT_PUBLIC_MAGIC_API_KEY || '');
        const didToken = await magic.auth.loginWithMagicLink({
          email,
        });
        console.log({ didToken });
        if (didToken) {
          router.push('/');
        }
      } catch (error) {
        console.error(error);
        console.log('There was an error with Magic link auth.');
      } finally {
        setIsLoading(false);
      }
    }
  };

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
  }, [router]);

  return (
    <Box
      position="relative"
      w="100%"
      h="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        w="100%"
        maxW="25rem"
        bg="black"
        p="2rem"
        borderRadius="0.3rem"
        zIndex="1"
      >
        <Text
          fontSize="3xl"
          fontWeight="700"
        >
          Login
        </Text>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl
            my="2rem"
            isInvalid={errors?.email ? true : false}
          >
            <FormLabel>Email address:</FormLabel>
            <Input
              bg="white"
              color="black"
              type="text"
              {...register('email')}
              placeholder="name@example.com"
            />
            {errors?.email && (
              <FormErrorMessage>
                {formatMessage(errors?.email?.message)}
              </FormErrorMessage>
            )}
          </FormControl>
          <Button type="submit">{isLoading ? 'Loading...' : 'Sign In'}</Button>
        </form>
      </Box>
      <Box
        position="absolute"
        w="100%"
        h="100%"
        bottom="0"
        backgroundImage="/login-bg.jpeg"
        backgroundSize="cover"
        backgroundRepeat="no-repeat"
        backgroundPosition="50% 50%"
      />
      <Box
        position="absolute"
        bottom="0"
        w="100%"
        h="100%"
        bg="black"
        opacity="0.7"
      />
    </Box>
  );
}
