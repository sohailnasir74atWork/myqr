import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Box, createTheme, ThemeProvider } from '@mui/material';
import MiniDrawer from './Project/MiniDrawer';
import Templates from './Project/Templates/Templates';
import MyQr from './Project/MyQR/MyQr';
import Stats from './Project/Stats/Stats';
import SelectScreen from './Project/NewQR/SelectTypes';
import InputScreen from './Project/NewQR/InputScreen';
import DesignScreen from './Project/NewQR/DesignScreen';
import Create from './Project/NewQR/Create';
import { ContextProvider, ImportStats } from './Project/GlobelStats/GlobelStats';
import Iframe from './Project/Iframe';

const theme = createTheme();

function App() {
  const { isMobile } = ImportStats();

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}

function AppContent() {
  const location = useLocation();
  const isIframeRoute = location.pathname === '/iframe';

  return (
    <Box sx={{ display: 'flex' }}>
      {!isIframeRoute && <MiniDrawer />}
      <Box component="main" sx={{ flexGrow: 1, width: '100%' }}>
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
      </Box>
    </Box>
  );
}

export default App;
