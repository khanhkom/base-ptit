import { extendTheme } from 'native-base';

export const themeV2 = extendTheme({
  colors: {
    // Add new color
    primary: {
      100: '#C9F8FB',
      200: '#94EBF8',
      300: '#5DCFEA',
      400: '#35ACD5',
      500: '#007EB9',
      600: '#00619F',
      700: '#004985',
      800: '#00346B',
      900: '#002558',
    },
    // Redefining only one shade, rest of the color will remain same.
  },
  //   config: {
  //     // Changing initialColorMode to 'dark'
  //     initialColorMode: 'dark',
  //   },
});
