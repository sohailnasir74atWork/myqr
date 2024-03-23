import { Box, Button, Dialog } from "@mui/material";
import React, { useCallback } from "react";
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
    <Box className={iframe ? "container-iframe" : 'container'}>
     <div
      className={iframe ? "types-of-qr-container-select-iframe" : 'types-of-qr-container'}
      style={{ width: isMobile ? "100%" : "" }}
    >
      
        <div
          className={isMobile ? "container-custom-mobile" : (iframe ? "container-custom-iframe" : "container-custom")}
        >
          <div className="flex-col">
            <div className={iframe ? "heading-container-iframe" : "heading-container"}>
              <span className={iframe ? "heading-2-iframe" : "heading-2"}>{iframe ? 'Start Creating Your Desired QR with One Click ' : 'Generate Static QR'}</span>{" "}
              {!iframe && <span className="heading-tag">without tracking</span>}
            </div>
            <div className={iframe ? 'grid-container-iframe':"grid-container"}>
            {
  iframe ? 
    staticTools.slice(0, -1).map((item, index) => (
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
    ))
  : 
    staticTools.map((item, index) => (
      <div
        className={`static-qr-tabs ${qrCodeSettings.type === item.heading ? 'selected' : ''}`}
        key={item.id}
        onClick={() => inputClick(item.heading)}
      >
        <div className="static-qr-icons">{item.icon}</div>
        <div className="flex-col">
          <span className="text-primary">{item.heading}</span>
          <span className="text-secondary">{item.text}</span>
        </div>
        {/* <span className="free-tag">Free</span> */}
      </div>
    ))
}
{iframe && <div className="static-qr-tabs-iframe center" style={{backgroundColor:'#A1A0E1'}} onClick={handleExplore}><div className="text-primary" style={{color:'white'}}>Create like a Pro</div></div>}
            </div>
            <br/>
           {!iframe && <> <div className="heading-container">
              <span className="heading-2">Generate Dymanic QR</span>
              <span className="heading-tag">with tracking</span>
            </div>
            <div className={iframe ? 'grid-container-iframe':"grid-container"}>
              {dymanicTools.map((item, index) => (
                <div
                  className="static-qr-tabs"
                  key={item.id}                  // onClick={inputClick}
                >
                  <div className="static-qr-icons">{item.icon}</div>
                  <div className="flex-col">
                    <span className={iframe ? "text-primary-iframe":"text-primary"}>{item.heading}</span>
                    <span className={iframe ? "text-secondary-iframe": "text-secondary"}>{item.text}</span>
                  </div>
                  <span className="paid-tag"><img src={Pro} alt='pro' width='100%' height='100%'/></span>
                  <span className="commingsoon">COMMING SOON</span>
                </div>
              ))}
            </div></>}
          </div>
        </div>
    
      
      {!isMobile && <QrDemo prop={{ qrCodeSettings }} />}
          </div>
    
    </Box>
  );
};

export default React.memo(SelectScreen);