import { createTheme } from '@mui/material/styles';
import { blueGrey, green } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: green[500],
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: blueGrey[50],
        },
      },
    },
  },
});

export default theme;
