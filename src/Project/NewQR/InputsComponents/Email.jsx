import React, { useEffect, useState } from "react";
import { Button, TextField, Slider, Typography } from "@mui/material";
import ErrorBar from "../../Error";
import { ImportStats } from "../../GlobelStats/GlobelStats";
import { useNavigate } from "react-router-dom";

const Email = () => {
  const { 
    qrCodeSettings,
    setQrCodeSettings,
    isMobile,
    setActiveStep
   } = ImportStats();  const [email, setEmail] = useState(""); // For the email address
  const [message, setMessage] = useState(""); // For the email message
  const [qrName, setQrName] = useState(qrCodeSettings.qrName);
  const [size, setSize] = useState(qrCodeSettings.size.width); // Assuming width and height are initially the same
  const [emailError, setEmailError] = useState("");
  const [messageError, setMessageError] = useState("");
  const [nameError, setNameError] = useState("");
  const navigate = useNavigate()

  useEffect(() => {
    setEmail(qrCodeSettings.inputData.mail.email);
    setMessage(qrCodeSettings.inputData.mail.message);
    setQrName(qrCodeSettings.qrName);
    setSize(qrCodeSettings.size.width); // Sync with external updates
  }, [qrCodeSettings]);


  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setEmailError("");
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
    setMessageError("");
  };

  const handleQRNameChange = (event) => {
    setQrName(event.target.value);
    setNameError("");
  };

  const handleSizeChange = (_, newValue) => {
    setSize(newValue);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = () => {
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }
    if (!message.trim()) {
      setMessageError("Message should not be empty");
      return;
    }
    if (!qrName.trim()) {
      setNameError("Name should not be empty");
      return;
    }

    // Here, you can structure the QR code data as needed
    // This is just a placeholder for how you might set it
    setQrCodeSettings((prevSettings) => ({
        ...prevSettings,
        inputData: {
          ...prevSettings.inputData,
          url: { ...prevSettings.inputData.url, value: null }, // Optionally clear other types
          text: { ...prevSettings.inputData.text, value: null }, // Optionally clear other types
          mail: { ...prevSettings.inputData.mail, email: email, message: message }, 
          whatsapp: { ...prevSettings.inputData.whatsapp, number: null, message: null },
          message: { ...prevSettings.inputData.message, number: null, message: null },
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
    <div>
      {emailError && <ErrorBar message={emailError} />}
      {messageError && <ErrorBar message={messageError} />}
      {nameError && <ErrorBar message={nameError} />}
      <div className="heading-container">
        <span className="heading-2">Create Your Email Message QR Code</span>
      </div>
      <TextField
        required
        label="QR Name"
        value={qrName}
        onChange={handleQRNameChange}
        fullWidth
        margin="normal"
      />
      <TextField
        required
        label="Email Address"
        value={email}
        onChange={handleEmailChange}
        fullWidth
        margin="normal"
      />
      <TextField
        required
        label="Email Message"
        value={message}
        onChange={handleMessageChange}
        fullWidth
        margin="normal"
        multiline
        rows={4}
      />
      <Typography id="input-slider" gutterBottom>
        QR Code Size
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
      <Button variant="contained" onClick={handleSubmit} style={{ marginTop: 20 }} className="button">
        Generate QR Code
      </Button>
    </div>
  );
};

export default Email;
