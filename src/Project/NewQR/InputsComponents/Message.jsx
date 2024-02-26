import React, { useEffect, useState } from "react";
import { Button, TextField, MenuItem, Grid, Typography, Slider } from "@mui/material";
import ErrorBar from "../../Error";
import { isValidPhoneNumber } from 'libphonenumber-js';
import './inputStyles.css'


// Assuming countries data is imported or defined elsewhere in your project
import { countries } from "./CountriesList";
import { ImportStats } from "../../GlobelStats/GlobelStats";
import { useNavigate } from "react-router-dom";
const Message = ({ prop }) => {
  const { 
    qrCodeSettings,
    setQrCodeSettings,
    isMobile,
    setActiveStep
   } = ImportStats();    const [selectedCountry, setSelectedCountry] = useState(countries[0].dial_code); // Default to the first country's dial code
    const [number, setNumber] = useState("");
    const [message, setMessage] = useState("");
    const [qrName, setQrName] = useState(qrCodeSettings.qrName);
    const [numberError, setNumberError] = useState("");
    const navigate = useNavigate()

    useEffect(() => {
      setNumber(qrCodeSettings.inputData.message.number);
      setMessage(qrCodeSettings.inputData.message.message);
      setQrName(qrCodeSettings.qrName);
    }, [qrCodeSettings]);
    const handleSubmit = () => {
      const fullNumber = selectedCountry + number;
      if (!isValidPhoneNumber(fullNumber)) {
        setNumberError("Please enter a valid Phone Number");
        return;
      }
  
      // Update QR code settings and proceed
      setQrCodeSettings((prevSettings) => ({
        ...prevSettings,
        inputData: {
          ...prevSettings.inputData,
          message: { ...prevSettings.inputData.message, number: fullNumber, message: message },
        },
        qrName: qrName.trim(),
      }));
    navigate('/create/input/design');
    setActiveStep(2);
    };
  
    return (
      <div><div className="heading-container">
      <span className="heading-2">Create Your SMS QR Code</span>
    </div>
      <div className="option-container-home">
        {numberError && <ErrorBar message={numberError} />}
        
        <TextField
          required
          label="QR Name"
          value={qrName}
          onChange={(e) => setQrName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Grid container spacing={2} alignItems="flex-end">
          <Grid item xs={3}>
            <TextField
              select
              label="Country"
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              fullWidth
            >
              {countries.map((option) => (
                <MenuItem key={option.code} value={option.dial_code}>
                  {option.name} ({option.dial_code})
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={9}>
            <TextField
              required
              label="Phone Number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              fullWidth
              error={!!numberError}
            //   helperText={numberError || "Enter phone number without country code."}
            />
          </Grid>
        </Grid>
        <TextField
          required
          label="Phone Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          fullWidth
          margin="normal"
          multiline
          rows={4}
        />
                <p>Your QR code will open send text message</p>    
        <Button variant="contained" onClick={handleSubmit} style={{ marginTop: 20 }} className="button">
          Generate QR Code
        </Button>
        </div>
      </div>
    );
  };
  
  export default Message;