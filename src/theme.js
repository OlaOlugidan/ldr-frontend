// src/theme.js
import { createTheme } from '@mui/material/styles';
import { deepPurple, grey } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: deepPurple[500], // Deep purple for primary elements
    },
    secondary: {
      main: grey[300],       // Silver (light grey) for secondary elements
    },
  },
  typography: {
    fontFamily: "'Poppins', sans-serif", // Set Poppins as the default typography
  },
});

export default theme;
