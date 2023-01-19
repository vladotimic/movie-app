import { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Container,
  Box,
  Spinner,
} from '@chakra-ui/react';
import { searchMovies } from '@/lib/movies';
import { IMovieCard } from '@/types/movie';
import { MovieCard } from '@/components';

export default function BrowsePage() {
  const [search, setSearch] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [results, setResults] = useState<IMovieCard[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const res = await searchMovies(search);
      if (res) {
        const { data } = res;
        setResults(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxW="container.xl">
      <Box
        display="flex"
        alignItems="flex-end"
        gap="2"
        my={5}
      >
        <FormControl>
          <FormLabel fontSize="2xl">Search Movies</FormLabel>
          <Input
            type="text"
            value={search}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
        </FormControl>
        <Button onClick={handleSearch}>Search</Button>
      </Box>

      <Box
        w="100%"
        minH={isLoading ? '45rem' : 'auto'}
        display="flex"
        justifyContent={isLoading ? 'center' : 'space-between'}
        alignItems={isLoading ? 'center' : 'flex-start'}
        flexWrap="wrap"
      >
        {isLoading && (
          <Spinner
            color="red"
            size="xl"
          />
        )}
        {!isLoading &&
          results.length > 0 &&
          results.map((result: IMovieCard) => {
            return (
              <MovieCard
                key={result.id}
                {...result}
              />
            );
          })}
      </Box>
    </Container>
  );
}
