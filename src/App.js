import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./App.css"
import MiniDrawer from './Project/MiniDrawer';
import { Box, Stack, createTheme } from '@mui/material';
import Templates from './Project/Templates/Templates';
import MyQr from './Project/MyQR/MyQr';
import Stats from './Project/Stats/Stats';
import SelectScreen from './Project/NewQR/SelectTypes';
import InputScreen from './Project/NewQR/InputScreen';
import DesignScreen from './Project/NewQR/DesignScreen';
import Create from './Project/NewQR/Create';
import { ContextProvider } from './Project/GlobelStats/GlobelStats';
import { ThemeProvider } from '@emotion/react';
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
function App() {
  
  return (
    <ThemeProvider theme={theme}>
    <Router>
      <Box sx={{ display: 'flex' }}>
        <ContextProvider>
        <MiniDrawer/>
        <Box component="main" sx={{ flexGrow: 1,  width: '100%' }}>
          <Routes>
            <Route path="/create" element={<SelectScreen/>} />
            <Route path="/templates" element={<Templates />} />
            <Route path="/myqr" element={<MyQr />} />
            <Route path="/stats" element={<Stats />} />
            <Route path="/generate-bulk" element={<Stats />} />
            <Route path="/create/input" element={<InputScreen />} />
            <Route path="/create/input/design" element={<DesignScreen />} />
          </Routes>
        </Box>
        </ContextProvider>
      </Box>
    </Router>
    </ThemeProvider>
  );
}

export default App;
