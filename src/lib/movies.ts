import { filterCast, filterCrew, getDirector } from '@/utils/movie';
import { api } from '@/api';
import { popular, singleMovie } from '@/data';
import {
  IMovieBase,
  IMovieBanner,
  Genre,
  IMovieTrailer,
  IMovieCard,
} from '@/types/movie';
import { genres, fallback } from '@/constants/genres';

const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const env = process.env.NEXT_PUBLIC_NODE_ENV;

type Id = number | string | string[] | undefined;

export const getPopularMovies = async () => {
  try {
    if (env === 'development') {
      return popular;
    }
    const { data } = await api.get(
      `/movie/popular?api_key=${apiKey}&language=en-US&page=1`
    );

    return data?.results.map((movie: IMovieBanner) => {
      const { id, title, backdrop_path, overview } = movie;
      return {
        id,
        title,
        overview,
        backdrop_path,
      };
    });
  } catch (error) {
    console.error(error);
  }
};

export const getMovieById = async (id: Id) => {
  if (id) {
    try {
      if (env === 'development') {
        return singleMovie;
      }
      const { data } = await api.get(
        `/movie/${id}?api_key=${apiKey}&language=en-US&&append_to_response=videos`
      );

      const {
        title,
        original_title,
        overview,
        genres,
        imdb_id,
        homepage,
        backdrop_path,
        poster_path,
        budget,
        revenue,
        videos,
        spoken_languages,
        status,
        runtime,
        release_date,
        tagline,
      } = data;

      const trailer: IMovieTrailer[] = videos?.results
        ?.map((video: IMovieTrailer) => {
          const { key, type } = video;
          return {
            key,
            type,
          };
        })
        .filter((video: IMovieTrailer) => video.type === 'Trailer');

      return {
        title,
        original_title,
        overview,
        genres,
        imdb_id,
        homepage,
        backdrop_path,
        poster_path,
        budget,
        revenue,
        spoken_languages,
        status,
        runtime,
        release_date,
        tagline,
        trailer,
      };
    } catch (error) {
      console.error(error);
    }
  }
};

export const getMoviesByGenre = async (genre: Genre) => {
  try {
    if (env === 'development') {
      return fallback[genre];
    }
    const { data } = await api.get(
      `/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_video=ture&page=1&with_genres=${genres[genre]}`
    );
    return data?.results.map((movie: IMovieBase) => {
      const { id, title, backdrop_path, release_date } = movie;
      return {
        id,
        title,
        release_date,
        backdrop_path,
      };
    });
  } catch (error) {
    console.error(error);
  }
};

export const getWatchProvider = async (id: Id) => {
  try {
    const data = await api.get(
      `/movie/${id}/watch/providers?api_key=${apiKey}`
    );
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getMovieCredits = async (id: Id) => {
  try {
    const {
      data: { cast, crew },
    } = await api.get(`/movie/${id}/credits?api_key=${apiKey}`);
    console.log({
      cast: filterCast(cast),
      crew: filterCrew(crew),
      director: getDirector(crew),
    });
    return {
      cast: filterCast(cast),
      crew: filterCrew(crew),
      director: getDirector(crew),
    };
  } catch (error) {
    console.error(error);
  }
};

export const getMovieDetails = async (id: Id) => {
  try {
    if (env === 'development') {
      return singleMovie;
    }

    const [movieById, credits] = await Promise.all([
      await getMovieById(id),
      await getMovieCredits(id),
    ]);

    return {
      ...movieById,
      ...credits,
    };
  } catch (error) {
    console.error(error);
  }
};

export const getAllPopularMovies = async () => {
  try {
    const genres: Genre[] = [
      'action',
      'comedy',
      'horror',
      'thriller',
      'adventure',
      'animation',
      'crime',
      'drama',
      'fantasy',
      'mystery',
      'scifi',
      'war',
      'romance',
    ];

    const [popular, ...rest] = await Promise.all([
      await getPopularMovies(),
      ...genres.map(async (genre: Genre) => {
        return await getMoviesByGenre(genre);
      }),
    ]);

    const movies = rest.map((item, index) => {
      return {
        title: genres[index][0].toUpperCase() + genres[index].slice(1),
        movies: item,
      };
    });

    return {
      popular,
      movies,
    };
  } catch (error) {
    console.error(error);
  }
};

export const searchMovies = async (term: string, page = 1) => {
  try {
    const { data } = await api.get(
      `/search/movie?query=${term}&api_key=${apiKey}&language=en-US&page=${page}&include_adult=false`
    );
    const { results, ...rest } = data;
    return {
      ...rest,
      data: results.map((movie: IMovieCard) => {
        const { id, title, poster_path } = movie;
        return {
          id,
          title,
          poster_path,
        };
      }),
    };
  } catch (error) {
    console.error(error);
  }
};
