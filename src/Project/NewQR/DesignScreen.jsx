import { Box } from "@mui/material";
import React, { useEffect } from "react";
import CustomizedAccordions from "./DesignComponents/QrDesigns";
import { ImportStats } from "../GlobelStats/GlobelStats";
import QrDemo from "./QrDemo";

const DesignScreen = () => {
  const { 
    handleNext,
    qrCodeSettings,
    setQrCodeSettings,
    isMobile, handleBack
   } = ImportStats();
   useEffect(() => {
    const handleBackButton = event => {
    handleBack()
    };
  
    window.addEventListener('popstate', handleBackButton);
  
    return () => {
      window.removeEventListener('popstate', handleBackButton);
    };
  }, []);
  return (
    <Box className="container">
      <div className="types-of-qr-container"
        style={{ width: isMobile ? "100%" : "" }}>
      <div className="container-custom">
          <CustomizedAccordions
            prop={{ setQrCodeSettings, qrCodeSettings, handleNext, isMobile }}
          />
        </div>
        {!isMobile && <QrDemo prop={{ qrCodeSettings }} />}
        </div>
    </Box>
  );
};

export default DesignScreen;