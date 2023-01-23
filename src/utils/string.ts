export const formatMessage = (msg: string | undefined): string => {
  if (msg) {
    return msg[0].toUpperCase() + msg.slice(1);
  }
  return '';
};
