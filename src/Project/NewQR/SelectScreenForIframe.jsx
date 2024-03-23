import { Box, Button, Dialog } from "@mui/material";
import React, { useCallback } from "react";
import { ImportStats } from "../GlobelStats/GlobelStats";
import { dymanicTools, staticTools } from "../DynamicData";
import QrDemo from "./QrDemo";
import './newqrStyle.css';
import Pro from "../../Assets/icons/Pro.svg"
import { useNavigate } from "react-router-dom";

const SelectScreenForIframe = () => {
  const { 
    qrCodeSettings,
    setQrCodeSettings,
    setActiveTool,
    isMobile,
    iframe,
    setActiveStep,
    } = ImportStats();
    const navigate = useNavigate()
    const inputClick = useCallback((e) => {
      setActiveTool(e);
      setQrCodeSettings({
        ...qrCodeSettings,
        type: e,
        inputData: {
          ...qrCodeSettings.inputData,
          url: { value: null },
          app: { value: null },
          text: { value: null },
          mail: { email: null, message: null },
          whatsapp: { number: null, message: null },
          message: { number: null, message: null },
          call: { call: null },
          wifi: { networkName: null, networkType: null, password: null, isHide: false },
          vcard: {
            ...qrCodeSettings.inputData.vcard,
            firstName: null,
            lastName: null,
            phoneNumber: null,
            mobile: null,
            email: null,
            website: null,
            company: null,
            jobTitle: null,
            address: null,
            fax: null,
            city: null,
            postalCode: null,
            country: null
          }
        }
      });
       // Update the 'type' property
      setActiveStep(1)
      navigate('/create/input');
      // console.log(activeStep);
    });
    const handleExplore = () => {
      // Open the specified URL in a new tab
      window.open('https://aspireai.io/create', '_blank');
    };
    
  return (
    <Box className="container-iframe">
     <div
      className="types-of-qr-container-select-iframe"
      style={{ width: isMobile ? "100%" : "" }}
    >
      
        <div
          className={isMobile ? "container-custom-mobile" : "container-custom-iframe"}
        >
          <div className="flex-col">
            <div className="heading-container-iframe">
              <span className="heading-2-iframe">'Start Creating Your Desired QR with One Click '</span>{" "}
            </div>
            <div className='grid-container-iframe'>
    {   staticTools.slice(0, -1).map((item, index) => (
      <div
        className={`static-qr-tabs-iframe ${qrCodeSettings.type === item.heading ? 'selected' : ''}`}
        key={item.id}
        onClick={() => inputClick(item.heading)}
      >
        <div className="static-qr-icons-iframe">{item.icon}</div>
        <div className="flex-col">
          <span className="text-primary">{item.heading}</span>
          <span className="text-secondary">{item.text}</span>
        </div>
        {/* <span className="free-tag">Free</span> */}
      </div>
    ))}
<div className="static-qr-tabs-iframe center" style={{backgroundColor:'#A1A0E1'}} onClick={handleExplore}><div className="text-primary" style={{color:'white'}}>Create like a Pro</div></div>
            </div>
            <br/>
         
          </div>
        </div>
    
      
      {!isMobile && <QrDemo prop={{ qrCodeSettings }} />}
          </div>
    
    </Box>
  );
};

export default React.memo(SelectScreenForIframe);