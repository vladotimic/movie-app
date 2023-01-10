import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { api } from '../../api';

export default function MoviePage() {
  const router = useRouter();
  const id = router.query.id;

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await api.get(
          `/movie/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`
        );
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  return <div>Movie Page: {id}</div>;
}
