import { IMovieCredits } from './../types/movie';

export const filterCredits = (credits: IMovieCredits[]): IMovieCredits[] => {
  return credits.map((item: IMovieCredits) => {
    const { id, name, profile_path, known_for_department } = item;
    return { id, name, profile_path, known_for_department };
  });
};

export const getDirector = (crew: IMovieCredits[]): string | undefined => {
  return crew.find((c: IMovieCredits) => c.known_for_department === 'Directing')
    ?.name;
};
