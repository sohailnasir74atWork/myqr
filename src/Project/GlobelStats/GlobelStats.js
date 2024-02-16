import { useMediaQuery } from '@mui/material';
import React, { createContext, useState, useContext } from 'react';

const GlobelStats = createContext();

export const ImportStats = () => useContext(GlobelStats);
export const ContextProvider = ({ children }) => {
  const [activeStep, setActiveStep] = useState(0);
  const isMobile = useMediaQuery(`(max-width:600px)`);
  const [activeTool, setActiveTool] = useState("");
  const [qrCodeSettings, setQrCodeSettings] = useState({
    type:'Link',
    qrName: "My QR",
    size: { height: "300", width: "300" },
    inputData: {
      url: { value: null },
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


  const handleNext = () => {
    if(activeStep<2){setActiveStep((prevActiveStep) => prevActiveStep + 1);}
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <GlobelStats.Provider value={{ activeStep, handleNext, handleBack, handleReset, isMobile, qrCodeSettings, setQrCodeSettings, setActiveTool, activeTool, setActiveStep }}>
      {children}
    </GlobelStats.Provider>
  );
};