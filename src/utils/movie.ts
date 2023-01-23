import { IMovieCast, IMovieCrew } from './../types/movie';

export const filterCast = (credits: IMovieCast[]): IMovieCast[] => {
  return credits.map((item: IMovieCast) => {
    const { id, name, profile_path, known_for_department } = item;
    return { id, name, profile_path, known_for_department };
  });
};

export const filterCrew = (credits: IMovieCrew[]): IMovieCrew[] => {
  return credits.map((item: IMovieCrew) => {
    const { id, name, profile_path, department } = item;
    return { id, name, profile_path, department };
  });
};

export const getDirector = (crew: IMovieCrew[]) => {
  return crew.find((c: IMovieCrew) => c.department === 'Directing')?.name;
};
