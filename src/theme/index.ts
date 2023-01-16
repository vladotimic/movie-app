import { extendTheme } from '@chakra-ui/react';
import Button from './components/button';

const theme = extendTheme({
  styles: {
    global: {
      'html, body': {
        color: 'white',
        bg: 'black',
      },
    },
  },
  components: {
    Button,
  },
});

export default theme;
