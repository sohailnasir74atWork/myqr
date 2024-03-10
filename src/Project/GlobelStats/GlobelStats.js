import { useMediaQuery } from '@mui/material';
import React, { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const GlobelStats = createContext();

export const ImportStats = () => useContext(GlobelStats);
export const ContextProvider = ({ children }) => {
  const [activeStep, setActiveStep] = useState(0);
  const isMobile = useMediaQuery(`(max-width:600px)`);
  const [activeTool, setActiveTool] = useState("");
  const [iframeRouts, setIframeRouts] = useState(false);
  const [qrCodeSettings, setQrCodeSettings] = useState(
    {
    type:'',
    qrName: "My QR",
    correction: 'Q',
    margin:5,
    size: { height: "300", width: "300" },
    inputData: {
      url: { value: null },
      app: { value: null },
      text: { value: null },
      mail: { email: null, message : null },
      whatsapp: { number: null, message : null },
      message: { number: null, message : null },
      call: { call : null },
      wifi: { networkName : null, networkType : null, password : null, isHide : false },
      vcard: {firstName: null,
        lastName: null,
        phoneNumber: null,
        mobile : null,
        email: null,
        website: null,
        company: null,
        jobTitle: null,
        address: null,
        fax: null,
        city: null,
        postalCode: null,
        country: null}
   },
    logo: null,
    logoSetting: { backgrounddots: true, margin: 10 },
    colors: {
      background: { isSolid: true, color: "#FFFFFF" },
      dots: { isSolid: true, color: "#000000" },
      square: { isSolid: true, color: "#000000" },
      cornerDots: { isSolid: true, color: "#000000" },
    },
    types: {
      corner: { type: "square" },
      dots: { type: "square" },
      square: { isSolid: true, color: "#000000" },
      cornerDots: { type: "square" },
    },
    clearInput: false,
  });


   return (
    <GlobelStats.Provider value={{ activeStep, isMobile, qrCodeSettings, setQrCodeSettings, setActiveTool, activeTool, setActiveStep, setIframeRouts }}>
      {children}
    </GlobelStats.Provider>
  );
};