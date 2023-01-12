import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      'html, body': {
        color: 'white',
        bg: 'black',
      },
    },
  },
});

export default theme;
