import { extendTheme } from '@chakra-ui/react';
import Container from './components/container';

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
    Container,
  },
});

export default theme;
