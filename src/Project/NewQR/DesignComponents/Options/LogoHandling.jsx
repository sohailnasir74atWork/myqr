import React, { useEffect, useState } from "react";
import { Button, Divider, FormControlLabel, IconButton, Slider, Typography } from "@mui/material";
import style1 from "../../../../Assets/Shapes/style1.svg";
import corner1 from "../../../../Assets/Shapes/corner1.svg";
import cornerDot1 from "../../../../Assets/Shapes/cornerDot1.svg";
import "./optionsStyles.css";
import { AntSwitch } from "./ColorHelper.jsx/GradientColorPicker";
import { ImportStats } from "../../../GlobelStats/GlobelStats";
import { logos } from "../../../DynamicData";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import AddPhotoAlternate from "@mui/icons-material/AddPhotoAlternate";
import DeleteIcon from '@mui/icons-material/Delete';
import { Input } from "@mui/icons-material";
const LogoHandling = () => {
  const { setQrCodeSettings, qrCodeSettings, isMobile } = ImportStats();
  const [isLogo, setIsLogo] = useState(qrCodeSettings.logoSetting.backgrounddots)
  const [selectedLogo, setSelectedLogo] = useState(qrCodeSettings.logo); // Assuming the initial selected logo is stored in qrCodeSettings.logo
  const [size, setSize] = useState(qrCodeSettings.logoSetting.margin); // Assuming width and height are initially the same
  useEffect(() => {
    setSize(qrCodeSettings.logoSetting.margin); // Sync with external updates
    setIsLogo(qrCodeSettings.logoSetting.backgrounddots)
  }, [qrCodeSettings]);


  const handleUploadLogo = (event) => {
    const file = event.target.files[0];

    // Assuming you want to store the logo as a base64 string
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setQrCodeSettings((prevSettings) => ({
          ...prevSettings,
          logos: [...(prevSettings.logos || []), reader.result],
        }));
      };
      reader.readAsDataURL(file);
    }
  };
  const handleSizeChange = (_, newValue) => {
    setSize(newValue);
    setQrCodeSettings((prevSettings) => ({
      ...prevSettings,
      logoSetting: {
        ...prevSettings.logoSetting,
        margin: newValue,
      },
    }));
  };
  
  const handleClickLogo = (logo) => {
    setSelectedLogo(logo);
    setQrCodeSettings((prevSettings) => ({
      ...prevSettings,
      logo: logo,
    }));
  };
  const handleRemoveLogo = ()=>{
    setQrCodeSettings((prevSettings) => ({
      ...prevSettings,
      logo: null,
    }));
  }
  const handleLogoBG = () => {
    setIsLogo((prevIsLogo) => !prevIsLogo);
    setQrCodeSettings((prevSettings) => ({
      ...prevSettings,
      logoSetting: {
        ...prevSettings.logoSetting,
        backgrounddots: !prevSettings.logoSetting.backgrounddots,
      },
    }));
  };
  
  
  

  return (
<div className={ isMobile ? "option-container-home p-b-60 accordion-open" : "p-v-15 accordion-open"}> 
<br/>
<div className="flex-row">
<div style={{ marginRight: '10px' }}>
      <IconButton>
        <input
          type="file"
          accept="image/*"
          onChange={handleUploadLogo}
          multiple
          id="upload-input"
          style={{ display: 'none' }}
        />
        <label htmlFor="upload-input">
          <AddPhotoAlternate />
        </label>
      </IconButton>
      <span className="text-secondary">Upload Image</span>
    </div>
      {qrCodeSettings.logo && (
  <div style={{display:'flex', alignItems:'center'}}>
    <IconButton
      onClick={handleRemoveLogo}
    >
      <DeleteIcon/>
    </IconButton>
    <span className="text-secondary">Remove Logo</span>
  </div>
)}

      </div>
      <br/>
      <div className="toggle-button-responsive" style={{justifyContent:'left', paddingLeft:'4px'}}>
              <FormControlLabel
                control={<AntSwitch checked={isLogo} onChange={handleLogoBG} disabled={!qrCodeSettings.logo} />}
                label=""
              />
              <span className="text-secondary">Remove Background</span>
      </div>
      <br/>

             <Slider
        value={size}
        onChange={handleSizeChange}
        aria-labelledby="input-slider"
        valueLabelDisplay="auto"
        min={0}
        max={40}
        disabled={!qrCodeSettings.logo}
        className="slider-select"
        style={{marginLeft:'8px'}}
      />
      
      <br/>
      <span className="text-secondary" style={{paddingLeft:'8px'}} gutterBottom>
        Set Logo Padding
      </span>
      <div className="logo-container">
        {qrCodeSettings.logos &&
          qrCodeSettings.logos.map((logo, index) => (
            <img
              key={index}
              src={logo}
              alt={`Uploaded Logo ${index + 1}`}
              className={`logo ${selectedLogo === logo ? "selected" : ""}`}
              onClick={() => handleClickLogo(logo)}
            />
          ))}
      </div>
      <br/>
      <Divider/>
      <div className="text-primary">You can pick from Below</div>
      <div className="logo-container">
        {logos.map((item, index)=>{return <img
          src={item}
          className={`logo ${selectedLogo === item ? "selected" : ""}`}
 
          onClick={() => handleClickLogo(item)}
        /> } )}
           </div>
    </div>
  );
};

export default LogoHandling;
