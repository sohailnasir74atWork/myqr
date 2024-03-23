import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import "./App.css";
import MiniDrawer from './Project/MiniDrawer';
import { Box, ThemeProvider, createTheme } from '@mui/material';
import { ImportStats } from './Project/GlobelStats/GlobelStats';

// Lazy load components for routes
const Templates = lazy(() => import('./Project/Templates/Templates'));
const MyQr = lazy(() => import('./Project/MyQR/MyQr'));
const Stats = lazy(() => import('./Project/Stats/Stats'));
const SelectScreen = lazy(() => import('./Project/NewQR/SelectTypes'));
const InputScreen = lazy(() => import('./Project/NewQR/InputScreen'));
const DesignScreen = lazy(() => import('./Project/NewQR/DesignScreen'));
const Iframe = lazy(() => import('./Project/Iframe/Iframe'));

const theme = createTheme({
  palette: {
    primary: {
      main: "#5956D6",
    },
  },
  typography: {
    fontFamily: "Lato, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'",
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
  const location = useLocation();
  const { iframe } = ImportStats();

  return (
    <Box sx={{ display: 'flex' }}>
      {!(location.pathname === '/iframe' || iframe || location.pathname === '/signin' || location.pathname === '/signup') && <MiniDrawer />}
      <Box component="main" sx={{ flexGrow: 1, width: location.pathname === '/iframe' ? '100%' : 'calc(100% - 240px)' }}>
        <Suspense fallback={<div></div>}>
          <Routes>
            <Route path="/create" element={<SelectScreen />} />
            <Route path="/templates" element={<Templates />} />
            <Route path="/myqr" element={<MyQr />} />
            <Route path="/stats" element={<Stats />} />
            <Route path="/generate-bulk" element={<Stats />} />
            <Route path="/create/input" element={<InputScreen />} />
            <Route path="/create/input/design" element={<DesignScreen />} />
            <Route path="/iframe" element={<Iframe />} />
          </Routes>
        </Suspense>
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
