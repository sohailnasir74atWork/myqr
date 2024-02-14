import React, { createContext, useState, useContext } from 'react';

const GlobelStats = createContext();

export const ImportStats = () => useContext(GlobelStats);

export const ContextProvider = ({ children }) => {
  const [activeStep, setActiveStep] = useState(0);

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
    <GlobelStats.Provider value={{ activeStep, handleNext, handleBack, handleReset }}>
      {children}
    </GlobelStats.Provider>
  );
};