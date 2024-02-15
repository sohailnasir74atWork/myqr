import { Box } from "@mui/material";
import React from "react";
import CustomizedAccordions from "./DesignComponents/QrDesigns";
import { ImportStats } from "../GlobelStats/GlobelStats";
import QrDemo from "./QrDemo";

const DesignScreen = () => {
  const { 
    handleNext,
    qrCodeSettings,
    setQrCodeSettings,
    isMobile,
   } = ImportStats();
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