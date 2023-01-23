import { ComponentStyleConfig } from '@chakra-ui/react';

const Button: ComponentStyleConfig = {
  variants: {
    solid: {
      minW: '8rem',
      color: 'white',
      bg: 'red.500',
      _hover: {
        bg: 'red.700',
      },
    },
    outline: {
      _hover: {
        bg: 'red.500',
        color: 'white',
        borderColor: 'red.500',
      },
    },
  },
  defaultProps: {
    colorScheme: 'red',
  },
};

export default Button;
