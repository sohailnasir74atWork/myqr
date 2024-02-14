import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./App.css"
import MiniDrawer from './Project/MiniDrawer';
import { Box, Stack } from '@mui/material';
import Templates from './Project/Templates/Templates';
import MyQr from './Project/MyQR/MyQr';
import Stats from './Project/Stats/Stats';
import SelectScreen from './Project/NewQR/SelectTypes';
import InputScreen from './Project/NewQR/InputScreen';
import DesignScreen from './Project/NewQR/DesignScreen';
import Create from './Project/NewQR/Create';
import { ContextProvider } from './Project/GlobelStats/GlobelStats';

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
            {/* Add more routes as needed */}
          </Routes>
        </Box>
        </ContextProvider>
      </Box>
    </Router>
  );
}

export default App;
