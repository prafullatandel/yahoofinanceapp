
import './App.css';
import { useRoutes } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Router from './routes/Router';
import Login from './components/Login';
import SnackbarNotify from './components/snackbar/Snackbar';


function App() {
  const routing = useRoutes(Router);

  const darkTheme = createTheme({
    palette: {
      mode: 'light',
    },
    typography:{
      fontFamily:'"IBM Plex Sans"'
    }
  })

  return (
    <ThemeProvider theme={darkTheme}>
      <SnackbarNotify />
      <CssBaseline />
      {routing}
    </ThemeProvider>
  );
}

export default App;
