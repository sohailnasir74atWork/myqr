import React, { useEffect, useState } from "react";
import {
  Button,
  TextField,
  MenuItem,
  Grid,
  Typography,
  Slider,
  FormControlLabel,
} from "@mui/material";
import ErrorBar from "../../Error";
import { Password } from "@mui/icons-material";
import { ImportStats } from "../../GlobelStats/GlobelStats";
import { AntSwitch } from "../DesignComponents/Options/ColorHelper.jsx/GradientColorPicker";
import { useNavigate } from "react-router-dom";
import './inputStyles.css'

// Assuming countries data is imported or defined elsewhere in your project
const network = ["WPA/WPA2", "WEP", "No Encryption"];
const Wifi = ({ prop }) => {
  const { 
    qrCodeSettings,
    setQrCodeSettings,
    isMobile,
    setActiveStep,
    iframe
   } = ImportStats();  
const [selectedNetwork, setSelectedNetwork] = useState(network[0]); // Default to the first country's dial code
  const [networkName, setNetworkName] = useState("");
  const [isHide, setIsHide] = useState("");
  const [networkType, setNetworkType] = useState("");
  const [password, setPassword] = useState("");
  const [qrName, setQrName] = useState(qrCodeSettings.qrName);
  const [nameError, setNameError] = useState("");
  const navigate = useNavigate()



  useEffect(() => {
    setNetworkName(qrCodeSettings.inputData.wifi.networkType);
    setPassword(qrCodeSettings.inputData.wifi.password);
    setNetworkName(qrCodeSettings.inputData.wifi.networkName);
    setIsHide(qrCodeSettings.inputData.wifi.isHide);
    setQrName(qrCodeSettings.qrName);
  }, [qrCodeSettings]);


  const toggleButton = () => {
    setIsHide(!isHide);
  };

  const handleSubmit = () => {
    if (networkName.length < 1) {
      setNameError("Please enter a valid Network Name");
      return;
    }
  
    setQrCodeSettings((prevSettings) => ({
      ...prevSettings,
      inputData: {
        ...prevSettings.inputData,
        wifi: {
          ...prevSettings.inputData.wifi,
          networkName: networkName,
          networkType: selectedNetwork,
          password: password,
          isHide: isHide,
        },
      },
      qrName: qrName.trim(),
    }));
  
    navigate('/create/input/design');
    setActiveStep(2);  };
  
  return (
    <div><div className={iframe ? "heading-container-iframe" : "heading-container"}>
    <span className={iframe ? "heading-2-iframe" : "heading-2"}>Create Your Wifi Connecting QR Code</span>
  </div>
    <div className="option-container-home">
      {nameError && <ErrorBar message={nameError} />}
      
      <TextField
        required
        label="QR Name"
        value={qrName}
        onChange={(e) => setQrName(e.target.value)}
        fullWidth
        margin="normal"
        className={iframe ? "input": ''}

      />
      <br />
      <br />

      <Grid container spacing={2} alignItems="flex-end">
        <Grid item xs={4}>
          <TextField
            required
            label="Network Name"
            value={networkName}
            onChange={(e) => setNetworkName(e.target.value)}
            fullWidth
            error={!!nameError}
            className={iframe ? "input": ''}

          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            select
            label="Network Type"
            value={selectedNetwork}
            onChange={(e) => setSelectedNetwork(e.target.value)}
            fullWidth
            className={iframe ? "input": ''}

          >
            {network.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={4}>
          <TextField
            required
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            className={iframe ? "input": ''}

          />
        </Grid>
      </Grid>
      <p>Your QR code allow anyone to connect wifi</p>    
        <Button
        variant="contained"
        onClick={handleSubmit}
        className="button"
      >
        Generate QR Code
      </Button>
      </div>
    </div>
  );
};

export default Wifi;