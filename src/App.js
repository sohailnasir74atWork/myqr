// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
import { ImportStats } from './Project/GlobelStats/GlobelStats';
import StepperComponent from './Project/Stepper';
import IframeStepper from './Project/Iframe/IframeStepper';
import SignInSide from './Project/Auth/Signin';
import SignUpSide from './Project/Auth/Signup';
import { useAuth } from './Project/Auth/context/authContext/Index';
import ForgetPassword from './Project/Auth/ForgetPassword';
import Settings from './Project/Settings/Settings';

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
  const {iframe} = ImportStats()
  const { userLoggedIn } = useAuth();
  return (
    <Box sx={{ display: 'flex' }}>
      
      {!(location.pathname === '/iframe' || iframe || location.pathname === '/signin' || location.pathname === '/signup' || location.pathname === '/forget-password') && <MiniDrawer />}
      {/* {(location.pathname === '/iframe' || iframe) && <IframeStepper />} */}
      <Box component="main" sx={{ flexGrow: 1, width: location.pathname === '/iframe' ? '100%' : 'calc(100% - 240px)' }}>
        <Routes>
        <Route path="/create" element={userLoggedIn ? <SelectScreen /> : <Navigate to="/signin" />} />
          <Route path="/templates" element={userLoggedIn ? <Templates /> : <Navigate to="/signin" />} />
          <Route path="/myqr" element={userLoggedIn ? <MyQr /> : <Navigate to="/signin" />} />
          <Route path="/stats" element={userLoggedIn ? <Stats /> : <Navigate to="/signin" />} />
          <Route path="/settings" element={userLoggedIn ? <Settings /> : <Navigate to="/signin" />} />
          <Route path="/generate-bulk" element={userLoggedIn ? <Stats /> : <Navigate to="/signin" />} />
          <Route path="/create/input" element={userLoggedIn ? <InputScreen /> : <Navigate to="/signin" />} />
          <Route path="/create/input/design" element={userLoggedIn ? <DesignScreen /> : <Navigate to="/signin" />} />
          <Route path="/iframe" element={<Iframe/>} />
          <Route path="/signin" element={<SignInSide/>} />
          <Route path="/signup" element={<SignUpSide/>} />
          <Route path="/forget-password" element={<ForgetPassword/>} />
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
