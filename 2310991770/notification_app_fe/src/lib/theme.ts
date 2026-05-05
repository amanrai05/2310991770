import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#7c6fff' },
    secondary: { main: '#ff6b9d' },
    background: { default: '#0a0a0f', paper: '#111118' },
    text: { primary: '#f0f0f8', secondary: '#7878a0' },
    divider: '#2a2a3a',
  },
  typography: {
    fontFamily: '"DM Sans", sans-serif',
    h1: { fontFamily: '"Syne", sans-serif', fontWeight: 700 },
    h2: { fontFamily: '"Syne", sans-serif', fontWeight: 600 },
    h3: { fontFamily: '"Syne", sans-serif', fontWeight: 600 },
    h4: { fontFamily: '"Syne", sans-serif', fontWeight: 600 },
    h5: { fontFamily: '"Syne", sans-serif', fontWeight: 600 },
    h6: { fontFamily: '"Syne", sans-serif', fontWeight: 600 },
  },
  shape: { borderRadius: 10 },
  components: {
    MuiPaper: { styleOverrides: { root: { backgroundImage: 'none' } } },
    MuiButton: { styleOverrides: { root: { textTransform: 'none', fontWeight: 500 } } },
  },
});

export default theme;
