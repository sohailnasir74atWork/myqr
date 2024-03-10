import { Box } from "@mui/material";
import React, { useEffect } from "react";
import CustomizedAccordions from "./DesignComponents/QrDesigns";
import { ImportStats } from "../GlobelStats/GlobelStats";
import QrDemo from "./QrDemo";
import MobileBottomTab from "./MobileBottomTab";

const DesignScreen = () => {
  const { 
    handleNext,
    qrCodeSettings,
    setQrCodeSettings,
    iframe,
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
    <Box className={iframe ? "container-iframe mobile-mr-t-20" : 'container mobile-mr-t-20'}>
     {!isMobile &&  <div className={iframe ? "types-of-qr-container-iframe" : 'types-of-qr-container'}>
      <div className="container-custom">
          <CustomizedAccordions
            prop={{ setQrCodeSettings, qrCodeSettings, handleNext, isMobile }}
          />
        </div>
         <QrDemo prop={{ qrCodeSettings }} />
        </div>}
        {isMobile &&  <div className="types-of-qr-container"
        style={{ width: '100vh' }}>
                 <MobileBottomTab/>

      </div>}
    </Box>
  );
};

export default DesignScreen;