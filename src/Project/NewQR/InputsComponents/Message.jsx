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
    const [size, setSize] = useState(qrCodeSettings.size.width);
    const [numberError, setNumberError] = useState("");
    const navigate = useNavigate()

    useEffect(() => {
      setNumber(qrCodeSettings.inputData.message.number);
      setMessage(qrCodeSettings.inputData.message.message);
      setQrName(qrCodeSettings.qrName);
      setSize(qrCodeSettings.size.width); // Sync with external updates
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
          url: { ...prevSettings.inputData.url, value: null }, // Optionally clear other types
          text: { ...prevSettings.inputData.text, value: null }, // Optionally clear other types
          mail: { ...prevSettings.inputData.mail, email: null, message: null },
          whatsapp: { ...prevSettings.inputData.whatsapp, number: null, message: null },
          message: { ...prevSettings.inputData.message, number: fullNumber, message: message },
          call: { ...prevSettings.inputData.call, number: null },
          vcard: { ...prevSettings.inputData.vcard, firstName: null,
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
            country: null, },
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
    navigate('/create/input/design');
    setActiveStep(2);
    };
  
    return (
      <div className="option-container-home">
        {numberError && <ErrorBar message={numberError} />}
        <div className="heading-container">
        <span className="heading-2">Create Your SMS QR Code</span>
      </div>
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
        
        <Button variant="contained" onClick={handleSubmit} style={{ marginTop: 20 }} className="button">
          Generate QR Code
        </Button>
      </div>
    );
  };
  
  export default Message;