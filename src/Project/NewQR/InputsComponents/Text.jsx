import React, { useEffect, useState } from "react";
import { Button, TextField, Slider, Typography } from "@mui/material";
import ErrorBar from "../../Error";
import { ImportStats } from "../../GlobelStats/GlobelStats";

const Text = () => {
  const { 
    handleNext,
    qrCodeSettings,
    setQrCodeSettings,
    isMobile
   } = ImportStats();  
  const [value, setValue] = useState(qrCodeSettings.inputData.text.value);
  const [qrName, setQrName] = useState(qrCodeSettings.qrName);
  const [size, setSize] = useState(qrCodeSettings.size.width); // Assuming width and height are initially the same
  const [textError, setTextError] = useState("");
  const [nameError, setNameError] = useState("");

  useEffect(() => {
    setValue(qrCodeSettings.inputData.text.value);
    setQrName(qrCodeSettings.qrName);
    setSize(qrCodeSettings.size.width); // Sync with external updates
  }, [qrCodeSettings]);

  const handleInputChange = (event) => {
    setValue(event.target.value);
    setTextError("");
  };

  const handleQRNameChange = (event) => {
    setQrName(event.target.value);
    setNameError("");
  };

  const handleSizeChange = (_, newValue) => {
    setSize(newValue);
  };

  const handleSubmit = () => {
    if (!value) {
      setTextError("Please enter a text Message");
      return;
    }
  
    if (value.length > 1000) {
      setTextError("Text Message should not exceed 1000 characters");
      return;
    }
  
    if (!qrName.trim()) {
      setNameError("Name should not be empty");
      return;
    }
  
    setQrCodeSettings((prevSettings) => ({
      ...prevSettings,
      inputData: {
        ...prevSettings.inputData,
        url: { ...prevSettings.inputData.url, value: null }, // Optionally clear other types
        mail: { ...prevSettings.inputData.mail, email: null, message: null }, // Optionally clear other types
        whatsapp: { ...prevSettings.inputData.whatsapp, number: null, message: null }, // Optionally clear other types
        message: { ...prevSettings.inputData.message, number: null, message: null }, // Optionally clear other types
        text: { ...prevSettings.inputData.text, value: value },
        call: { ...prevSettings.inputData.call, number: null }, 
        wifi: {
            ...prevSettings.inputData.wifi,
            networkName: null,
            networkType: null,
            password: null,
            isHide: null,
          }, 


      },
      qrName: qrName.trim(),
      size: { width: size, height: size },
    }));
  
    handleNext();
  };
  

  return (
    <div>
      {textError && <ErrorBar message={textError} />}
      {nameError && <ErrorBar message={nameError} />}
      <div className="heading-container">
        <span className="heading-2">Fill Out the QR Code's Content</span>
      </div>
      <TextField
        required
        label="Write Your QR Name"
        value={qrName}
        onChange={handleQRNameChange}
        fullWidth
        margin="normal"
      />
      <TextField
        required
        label="Write your text here"
        value={value}
        onChange={handleInputChange}
        fullWidth
        multiline
        margin="normal"
        rows={4}
      />
      <p>Your QR code will show this text.</p>

      {/* Removed Width and Height TextFields */}
      <br/>
      <Typography id="track-inverted-slider" gutterBottom>
        Control Size
      </Typography>
      <Slider
        value={size}
        onChange={handleSizeChange}
        aria-labelledby="input-slider"
        valueLabelDisplay="auto"
        min={30}
        max={1000}
        className="slider-select"
        
      />
      <br/>

      <Button variant="contained" onClick={handleSubmit} style={{ marginTop: 20 }}>
        Submit
      </Button>
    </div>
  );
};

export default Text;
