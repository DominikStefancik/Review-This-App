import { createTheme } from '@mui/material';

export const reviewTheme = createTheme({
  components: {
    MuiRating: {
      styleOverrides: {
        icon: () => ({
          color: '#faaf00',
        }),
      },
    },
  },
});
