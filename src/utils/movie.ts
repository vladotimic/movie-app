import { MovieCredits } from './../types/movie';

export const filterCredits = (credits: MovieCredits[]): MovieCredits[] => {
  return credits.map((item: MovieCredits) => {
    const { id, name, profile_path, known_for_department } = item;
    return { id, name, profile_path, known_for_department };
  });
};

export const getDirector = (crew: MovieCredits[]): string | undefined => {
  return crew.find((c: MovieCredits) => c.known_for_department === 'Directing')
    ?.name;
};
