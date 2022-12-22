import { createTheme } from '@mui/material';

export const restaurantTableTheme = createTheme({
  components: {
    MuiTableHead: {
      styleOverrides: {
        root: () => ({
          backgroundColor: '#006bcf',
        }),
      },
    },
    MuiTableBody: {
      styleOverrides: {
        root: () => ({
          backgroundColor: '#303030',
        }),
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: () => ({
          color: '#fff',
        }),
      },
    },
    MuiRating: {
      styleOverrides: {
        icon: () => ({
          color: '#faaf00',
        }),
      },
    },
  },
});
