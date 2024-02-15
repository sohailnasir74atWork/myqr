import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import './newqrStyle.css'
import { ImportStats } from "../GlobelStats/GlobelStats";
import Links from "./InputsComponents/Links";
import Text from "./InputsComponents/Text";
import Email from "./InputsComponents/Email";
import WhatsApp from "./InputsComponents/WhatsApp";
import Message from "./InputsComponents/Message";
import Call from "./InputsComponents/Call";
import Wifi from "./InputsComponents/Wifi";
import QrDemo from "./QrDemo";
const InputScreen = () => {
  const { 
    handleNext,
    qrCodeSettings,
    setQrCodeSettings,
    activeTool,
    setActiveTool,
    activeStep,
    isMobile,
    showMobileQR,
    setShowMobileQR, handleBack, setActiveStep} = ImportStats();
    useEffect(() => {
      const handleBackButton = event => {
      handleBack()
      };
    
      window.addEventListener('popstate', handleBackButton);
    
      return () => {
        window.removeEventListener('popstate', handleBackButton);
      };
    }, [activeStep, setActiveStep]);
    
    
  return (
    <Box className="container">
      <div
        className="types-of-qr-container"
        style={{ width: isMobile ? "100%" : "" }}
      >
        <div className="container-custom">
        {activeTool === "Link" && (
        <Links
            prop={{
              setQrCodeSettings,
              qrCodeSettings,
              handleNext,
              isMobile,
            }}
          />
      )}
      {activeTool === "Text" && (
        <Text
            prop={{
              setQrCodeSettings,
              qrCodeSettings,
              handleNext,
              isMobile,
            }}
          />
      )}
      {activeTool === "Email" && (
        <Email
            prop={{
              setQrCodeSettings,
              qrCodeSettings,
              handleNext,
              isMobile,
            }}
          />
      )}
      {activeTool === "WhatsApp" && (
        <WhatsApp
            prop={{
              setQrCodeSettings,
              qrCodeSettings,
              handleNext,
              isMobile,
            }}
          />
      )}
      {activeTool === "SMS" && (
        <Message
            prop={{
              setQrCodeSettings,
              qrCodeSettings,
              handleNext,
              isMobile,
            }}
          />
      )}
      {activeTool === "Call" && (
        <Call
            prop={{
              setQrCodeSettings,
              qrCodeSettings,
              handleNext,
              isMobile,
            }}
          />
      )}
      {activeTool === "Wi-Fi" && (
        <Wifi
            prop={{
              setQrCodeSettings,
              qrCodeSettings,
              handleNext,
              isMobile,
            }}
          />
      )}
        </div>
        {!isMobile && <QrDemo prop={{ qrCodeSettings }} />}
      </div>
    </Box>
  );
};

export default InputScreen;