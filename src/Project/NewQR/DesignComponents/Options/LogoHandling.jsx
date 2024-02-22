import React, { useEffect, useState } from "react";
import { Button, Checkbox, Divider, FormControlLabel, IconButton, Slider, Typography } from "@mui/material";
import style1 from "../../../../Assets/Shapes/style1.svg";
import corner1 from "../../../../Assets/Shapes/corner1.svg";
import cornerDot1 from "../../../../Assets/Shapes/cornerDot1.svg";
import "./optionsStyles.css";
import { AntSwitch } from "./ColorHelper.jsx/GradientColorPicker";
import { ImportStats } from "../../../GlobelStats/GlobelStats";
import { logos } from "../../../DynamicData";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddPhotoAlternate from "@mui/icons-material/AddPhotoAlternate";
import DeleteIcon from '@mui/icons-material/Delete';
import BlockIcon from '@mui/icons-material/Block';
import { CheckBox, Input } from "@mui/icons-material";
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
  const handleRemoveLogo = () => {
    setSelectedLogo(null)
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
    <div className={isMobile ? "option-container-home p-b-60 accordion-open" : "p-v-15 accordion-open"}>
      <div className="flex-row">
      <div style={{marginBottom:'10px'}}>
      <input
        type="file"
        accept="image/*"
        onChange={handleUploadLogo}
        multiple
        id="upload-input"
        style={{ display: 'none' }}
      />
      <label htmlFor="upload-input">
        <Button variant="outlined" component="span" className="button" endIcon={<AddCircleIcon/>} style={{marginLeft:'10px'}}>
          Upload Image
        </Button>
      </label>
    </div>
        {/* {qrCodeSettings.logo && (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              onClick={handleRemoveLogo}
              style={{cursor:'pointer'}}
            >
              <DeleteIcon />
            </IconButton>
            <span className="text-secondary">Remove Logo</span>
          </div>
        )} */}

      </div>
      <div style={{paddingLeft:'8px'}}>
      <div className="toggle-button-responsive" style={{ justifyContent: 'left', marginLeft:'0px'}}>
        <FormControlLabel
          control={<Checkbox checked={isLogo} onChange={handleLogoBG} disabled={!qrCodeSettings.logo} />}
          label='Remove Background'        />
        {/* <span className="text-secondary"></span> */}
      </div>
      <div>Set Logo Padding</div>
      <div style={{ display: 'flex', marginBottom: '10px', maxWidth:'400px' }}>
      <Slider
        value={size}
        onChange={handleSizeChange}
        aria-labelledby="input-slider"
        valueLabelDisplay="auto"
        min={0}
        max={40}
        disabled={!qrCodeSettings.logo}
        // className="slider-select"
      />
      <div style={{marginLeft:'20px', width:'150px'}}>{`${size}px`}</div>
      </div>
      </div>
    {qrCodeSettings.logos && <div className="logo-container">
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
        </div>}
      <Divider />
      <div style={{padding:'10px'}}>Select from here</div>
      {!isMobile && <div>
  <div className="logo-container">
    <div className="logo center" onClick={handleRemoveLogo}
      style={{ cursor: 'pointer', background: 'pink', border: '2px' }}><BlockIcon sx={{ color: 'red', fontSize: '40px' }} /></div>
    {logos.map((item, index) => (
      <img
        key={index}
        src={item}
        className={`logo ${selectedLogo === item ? "selected" : ""}`}
        onClick={() => handleClickLogo(item)}
      />
    ))}
  </div>
</div>}
{isMobile &&  <div>
  <div className="logo-container">
    <div className="logo center" onClick={handleRemoveLogo}
      style={{ cursor: 'pointer', background: 'pink', border: '2px' }}><BlockIcon sx={{ color: 'red', fontSize: '40px' }} /></div>
    {logos.slice(0, logos.length / 2).map((item, index) => (
      <img
        key={index}
        src={item}
        className={`logo ${selectedLogo === item ? "selected" : ""}`}
        onClick={() => handleClickLogo(item)}
      />
    ))}
  </div>
  <div className="logo-container">
    <div className="logo center" onClick={handleRemoveLogo}
      style={{ cursor: 'pointer', background: 'pink', border: '2px' }}><BlockIcon sx={{ color: 'red', fontSize: '40px' }} /></div>
    {logos.slice(logos.length / 2).map((item, index) => (
      <img
        key={index}
        src={item}
        className={`logo ${selectedLogo === item ? "selected" : ""}`}
        onClick={() => handleClickLogo(item)}
      />
    ))}
  </div>
</div>}

    </div>
  );
};

export default LogoHandling;
