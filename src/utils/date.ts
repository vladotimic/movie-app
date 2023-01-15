export const formatDate = (date: Date | string | number): string =>
  new Date(date).toLocaleDateString('en-us', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
