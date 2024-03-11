import React, { useEffect, useState } from "react";
import { Button, TextField, MenuItem, Grid, Typography, Slider } from "@mui/material";
import ErrorBar from "../../Error";
import { isValidPhoneNumber } from 'libphonenumber-js';
import { countries } from "./CountriesList";
import { ImportStats } from "../../GlobelStats/GlobelStats";
import { useNavigate } from "react-router-dom";
import './inputStyles.css'

const Call = () => {
  const { 
    qrCodeSettings,
    setQrCodeSettings,
    isMobile,
    setActiveStep,
    iframe
   } = ImportStats();
    const [selectedCountry, setSelectedCountry] = useState(countries[0].dial_code); // Default to the first country's dial code
    const [number, setNumber] = useState("");
    const [qrName, setQrName] = useState(qrCodeSettings.qrName);
    const [numberError, setNumberError] = useState("");
    const navigate = useNavigate()


    useEffect(() => {
      setNumber(qrCodeSettings.inputData.call.number);
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
           call: { ...prevSettings.inputData.call, number: fullNumber },
        },
        qrName: qrName.trim(),
      }));
    navigate('/create/input/design');
    setActiveStep(2);
    };
  
    return (
      
      <div>
        <div className={iframe ? "heading-container-iframe" : "heading-container"}>
    <span className={iframe ? "heading-2-iframe": "heading-2"}>Create Your Phone Call QR Code</span>
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
          className={iframe ? "input": ''}

        />
        <Grid container spacing={2} alignItems="flex-end" style={{marginTop:'5px'}}>
          <Grid item xs={3}>
            <TextField
              select
              label="Country"
              className={iframe ? "input": ''}
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
              className={iframe ? "input": ''}

            //   helperText={numberError || "Enter phone number without country code."}
            />
          </Grid>
        </Grid> 
        <p>Your QR code will open in call mode</p>    
        <Button variant="contained" onClick={handleSubmit} className="button">
          Generate QR Code
        </Button>
        </div>
      </div>
    );
  };
  
  export default Call;