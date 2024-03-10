// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./App.css";
import MiniDrawer from './Project/MiniDrawer';
import { Box, ThemeProvider, createTheme } from '@mui/material';
import Templates from './Project/Templates/Templates';
import MyQr from './Project/MyQR/MyQr';
import Stats from './Project/Stats/Stats';
import SelectScreen from './Project/NewQR/SelectTypes';
import InputScreen from './Project/NewQR/InputScreen';
import DesignScreen from './Project/NewQR/DesignScreen';
import Iframe from './Project/Iframe/Iframe';

const theme = createTheme({
  palette: {
    primary: {
      main: "#5956D6",
    },
  },
  typography: {
    fontFamily: [
      "Lato",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          fontSize: "0.9rem",
        },
      },
    },
  },
});

function Content() {
  const { useLocation } = require('react-router-dom');
  const location = useLocation();

  return (
    <Box sx={{ display: 'flex' }}>
      {location.pathname !== '/iframe' || location.pathname !== '/'  && <MiniDrawer />}
      <Box component="main" sx={{ flexGrow: 1, width: location.pathname === '/iframe' ? '100%' : 'calc(100% - 240px)' }}>
        <Routes>
          <Route path="/create" element={<SelectScreen />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/myqr" element={<MyQr />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/generate-bulk" element={<Stats />} />
          <Route path="/create/input" element={<InputScreen />} />
          <Route path="/create/input/design" element={<DesignScreen />} />
          <Route path="/iframe" element={<Iframe/>} />
        </Routes>
      </Box>
    </Box>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Content />
      </Router>
    </ThemeProvider>
  );
}

export default App;
