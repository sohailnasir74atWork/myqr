import { Box, Dialog } from "@mui/material";
import React from "react";
import { ImportStats } from "../GlobelStats/GlobelStats";
import { dymanicTools, staticTools } from "../DynamicData";
import QrDemo from "./QrDemo";
import './newqrStyle.css';
import Pro from "../../Assets/icons/Pro.svg"
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
      setQrCodeSettings({
        type:e,
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
      }); // Update the 'type' property
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
                    {/* <span className="free-tag">Free</span> */}
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
                  <span className="paid-tag"><img src={Pro} alt='pro' width='100%' height='100%'/></span>
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