import React, { useEffect, useState } from "react";
import { Button, TextField, Slider, Typography } from "@mui/material";
import ErrorBar from "../../Error";
import { ImportStats } from "../../GlobelStats/GlobelStats";
import { useNavigate } from "react-router-dom";
import './inputStyles.css'

const Links = () => {
  const { 
    qrCodeSettings,
    setQrCodeSettings,
    isMobile,
    setActiveStep
   } = ImportStats();
  const [value, setValue] = useState(qrCodeSettings.inputData.url.value);
  const [qrName, setQrName] = useState(qrCodeSettings.qrName);
  const [urlError, setUrlError] = useState("");
  const [nameError, setNameError] = useState("");
   const navigate = useNavigate()
  useEffect(() => {
    setValue(qrCodeSettings.inputData.url.value);
    setQrName(qrCodeSettings.qrName);
  }, [qrCodeSettings]);

  const handleInputChange = (event) => {
    setValue(event.target.value);
    setUrlError("");
  };

  const handleQRNameChange = (event) => {
    setQrName(event.target.value);
    setNameError("");
  };

 const handleSubmit = () => {
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    if (!urlRegex.test(value) || !value) {
      setUrlError("Please enter a valid URL");
      return;
    }
    if (!qrName.trim()) {
      setNameError("Name should not be empty");
      return;
    }

    // Assuming validation for size is not needed as the slider controls the range
    setQrCodeSettings((prevSettings) => ({
      ...prevSettings,
      inputData: {
        ...prevSettings.inputData,
        url: { ...prevSettings.inputData.url, value: value }, 
      },
      qrName: qrName.trim(),
    }));
    navigate('/create/input/design');
    setActiveStep(2);
  };

  return (
    <div><div className="heading-container">
    <span className="heading-2">Create Your URL QR Code</span>
  </div>
    <div className="option-container-home">
      {urlError && <ErrorBar message={urlError} />}
      {nameError && <ErrorBar message={nameError} />}
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
        label="Submit URL Here"
        value={value}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
        defaultValue={'https://'}
      />
      <p>Your QR code will open this URL.</p>

      <Button variant="contained" onClick={handleSubmit} style={{ marginTop: 20 }} className="button">
        Submit
      </Button>
    </div>
    </div>
  );
};

export default Links;
