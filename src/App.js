import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./App.css"
import MiniDrawer from './MiniDrawer';
import { Box, Stack } from '@mui/material';
import Templates from './Templates/Templates';
import MyQr from './MyQR/MyQr';
import Stats from './Stats/Stats';
import SelectScreen from './NewQR/SelectTypes';
import InputScreen from './NewQR/InputScreen';
import DesignScreen from './NewQR/DesignScreen';
import Create from './NewQR/Create';
import { ContextProvider } from './GlobelStats/GlobelStats';

function App() {
  
  return (
    <Router>
      <Box sx={{ display: 'flex' }}>
        <ContextProvider>
        <MiniDrawer/>
        <Box component="main" sx={{ flexGrow: 1,  width: '100%' }}>
          <Routes>
            <Route path="/create" element={<Create/>} />
            <Route path="/templates" element={<Templates />} />
            <Route path="/myqr" element={<MyQr />} />
            <Route path="/stats" element={<Stats />} />
            <Route path="/create/new" element={<SelectScreen />} />
            <Route path="/create/new/input" element={<InputScreen />} />
            <Route path="/create/new/input/design" element={<DesignScreen />} />
          </Routes>
        </Box>
        </ContextProvider>
      </Box>
    </Router>
  );
}

export default App;
