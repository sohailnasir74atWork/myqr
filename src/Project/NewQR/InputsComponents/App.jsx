import React, { useEffect, useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import ErrorBar from "../../Error";
import { ImportStats } from "../../GlobelStats/GlobelStats";
import { useNavigate } from "react-router-dom";
import './inputStyles.css';

const App = () => {
  const { 
    qrCodeSettings,
    setQrCodeSettings,
    isMobile,
    setActiveStep
  } = ImportStats();
  const [app, setApp] = useState(qrCodeSettings.inputData.app.value);
  const [qrName, setQrName] = useState(qrCodeSettings.qrName);
  const [appError, setAppError] = useState("");
  const [nameError, setNameError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setApp(qrCodeSettings.inputData.app.value);
    setQrName(qrCodeSettings.qrName);
  }, [qrCodeSettings]);

  const handleAppChange = (event) => {
    setApp(event.target.value);
    setAppError("");
  };

  const handleQRNameChange = (event) => {
    setQrName(event.target.value);
    setNameError("");
  };

  const handleSubmit = () => {
    // Validation for a valid app URL
    const appUrlRegex = /^(https:\/\/play\.google\.com\/store\/apps\/|https:\/\/apps\.apple\.com\/)/;
    if (!appUrlRegex.test(app) || !app) {
      setAppError("Please enter a valid Play Store or iOS App URL");
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
        app: { ...prevSettings.inputData.app, value: app }, 
      },
      qrName: qrName.trim(),
    }));
    
    // Navigate based on the app's routing logic
    navigate('/create/input/design');
    setActiveStep(2);
  };

  return (
    <div>
      <div className="heading-container">
        <span className="heading-2">Create Your App QR Code</span>
      </div>
      <div className="option-container-home">
        {appError && <ErrorBar message={appError} />}
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
          label="Submit App URL Here"
          value={app}
          
          onChange={handleAppChange}
          fullWidth
          margin="normal"
          defaultValue={'https://play.google.com/store/apps/'}
        />
        <p>Your QR code will open this in App Store</p>

        <Button variant="contained" onClick={handleSubmit} className="button">
          Submit
        </Button>
      </div>
    </div>
  );
};

export default App;