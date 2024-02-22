import React, { useEffect, useState } from "react";
import { Button, TextField, Slider, Typography } from "@mui/material";
import ErrorBar from "../../Error";
import { ImportStats } from "../../GlobelStats/GlobelStats";
import { useNavigate } from "react-router-dom";
import './inputStyles.css'


const Text = () => {
  const { 
    qrCodeSettings,
    setQrCodeSettings,
    isMobile,
    setActiveStep
   } = ImportStats();  
  const [value, setValue] = useState(qrCodeSettings.inputData.text.value);
  const [qrName, setQrName] = useState(qrCodeSettings.qrName);
  const [textError, setTextError] = useState("");
  const [nameError, setNameError] = useState("");
  const navigate = useNavigate()


  useEffect(() => {
    setValue(qrCodeSettings.inputData.text.value);
    setQrName(qrCodeSettings.qrName);
  }, [qrCodeSettings]);

  const handleInputChange = (event) => {
    setValue(event.target.value);
    setTextError("");
  };

  const handleQRNameChange = (event) => {
    setQrName(event.target.value);
    setNameError("");
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
        text: { ...prevSettings.inputData.text, value: value },},
        qrName: qrName.trim(),
    }));
  
    navigate('/create/input/design');
    setActiveStep(2);
  };
  

  return (
    <div className="option-container-home">
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
      <p className="text">Your QR code will show this text.</p>

      {/* Removed Width and Height TextFields */}
      

      <Button variant="contained" onClick={handleSubmit} style={{ marginTop: 20 }} className="button">
        Submit
      </Button>
    </div>
  );
};

export default Text;
