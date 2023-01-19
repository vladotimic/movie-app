import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Container,
  Box,
  Text,
  Spinner,
} from '@chakra-ui/react';
import { searchMovies } from '@/lib/movies';
import { IMovieCard } from '@/types/movie';
import { MovieCard } from '@/components';

export default function BrowsePage() {
  const router = useRouter();
  const query = router.query.query;

  const [search, setSearch] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [results, setResults] = useState<IMovieCard[]>([]);
  const [totalResults, setTotalResults] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [numOfPages, setNumOfPages] = useState<number>(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSearch = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await searchMovies(search);
      if (res) {
        console.log({ res });
        setResults(res.data);
        setPage(1);
        setTotalResults(res.total_results);
        setNumOfPages(res.total_pages);
        router.push({
          pathname: `/browse`,
          query: {
            query: encodeURI(search),
          },
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
    // eslint-disable-next-line
  }, [search]);

  useEffect(() => {
    if (query) {
      setSearch(query.toString().replaceAll('%20', ' ').trim());
      if (search) {
        handleSearch();
      }
    }
  }, [handleSearch, query, search]);

  return (
    <Container maxW="container.xl">
      <Box
        position="relative"
        display="flex"
        justifyContent="center"
        alignItems="center"
        w="100%"
        h="15rem"
      >
        <Box
          display="flex"
          alignItems="flex-end"
          w="35rem"
        >
          <FormControl>
            <FormLabel fontSize="2xl">Search Movies</FormLabel>
            <Input
              type="text"
              value={search}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              borderColor="red"
              borderRadius="none"
              borderTopLeftRadius="0.3rem"
              borderBottomLeftRadius="0.3rem"
              _hover={{
                borderColor: 'red',
              }}
              _focusVisible={{
                borderColor: 'red',
              }}
            />
          </FormControl>
          <Button
            onClick={handleSearch}
            borderRadius="none"
            borderTopRightRadius="0.3rem"
            borderBottomRightRadius="0.3rem"
            minW="5rem"
          >
            Search
          </Button>
        </Box>
      </Box>

      {results.length > 0 && <Text>Total results: {totalResults}</Text>}

      <Box
        w="100%"
        minH={isLoading ? '45rem' : 'auto'}
        display="flex"
        justifyContent={{
          base: 'center',
          md: isLoading ? 'center' : 'space-between',
        }}
        alignItems={{
          base: 'center',
          md: isLoading ? 'center' : 'flex-start',
        }}
        gap={{
          base: 5,
          md: 0,
        }}
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
