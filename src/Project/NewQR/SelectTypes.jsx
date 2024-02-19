import { Box, Dialog } from "@mui/material";
import React from "react";
import { ImportStats } from "../GlobelStats/GlobelStats";
import { dymanicTools, staticTools } from "../DynamicData";
import QrDemo from "./QrDemo";
import './newqrStyle.css'
import { useNavigate } from "react-router-dom";

const SelectScreen = () => {
  const { 
    qrCodeSettings,
    setQrCodeSettings,
    activeTool,
    setActiveTool,
    activeStep,
    isMobile,
    showMobileQR,
    setActiveStep,
    setShowMobileQR} = ImportStats();
    const navigate = useNavigate()
    const inputClick = (e) => {
      setActiveTool(e);
      setQrCodeSettings((prevSettings) => ({ ...prevSettings, type: e })); // Update the 'type' property
      setActiveStep(1)
      navigate('/create/input');
      // console.log(activeStep);
    };
    
  return (
    <Box className="container">
     <div
      className="types-of-qr-container"
      style={{ width: isMobile ? "100%" : "" }}
    >
      
        <div
          className={isMobile ? "container-custom-mobile" : "container-custom"}
        >
          <div className="flex-col">
            <div className="heading-container">
              <span className="heading-2">Generate Static QR</span>{" "}
              <span className="heading-tag">without tracking</span>
            </div>
            <div className="grid-container">
              {staticTools.map((item, index) => (
                <div
                  className={`static-qr-tabs ${qrCodeSettings.type === item.heading ? 'selected' : ''}`}
                  key={index}
                  onClick={() => inputClick(item.heading)}
                >
                  <div className="static-qr-icons">{item.icon}</div>
                  <div className="flex-col">
                    <span className="text-primary">{item.heading}</span>
                    <span className="text-secondary">{item.text}</span>
                  </div>
                </div>
              ))}
            </div>
            <br/>
            <div className="heading-container">
              <span className="heading-2">Generate Dymanic QR</span>
              <span className="heading-tag">with tracking</span>
            </div>
            <div className="grid-container">
              {dymanicTools.map((item, index) => (
                <div
                  className="static-qr-tabs"
                  key={index}
                  onClick={inputClick}
                >
                  <div className="static-qr-icons">{item.icon}</div>
                  <div className="flex-col">
                    <span className="text-primary">{item.heading}</span>
                    <span className="text-secondary">{item.text}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
    
      
      {!isMobile && <QrDemo prop={{ qrCodeSettings }} />}
      {/* {isMobile && showMobileQR && (
        <Dialog          sx={{ m: 0, p: 1, zIndex: "10001" }}
          id="customized-dialog-title"
          // open={showMobileQR}
          // onClose={handleClose}
        >
          <QrDemo prop={{ qrCodeSettings }} />
        </Dialog>
      )} */}
    </div>
    </Box>
  );
};

export default SelectScreen;