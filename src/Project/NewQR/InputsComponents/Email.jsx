import React, { useEffect, useState } from "react";
import { Button, TextField, Slider, Typography } from "@mui/material";
import ErrorBar from "../../Error";
import { ImportStats } from "../../GlobelStats/GlobelStats";
import { useNavigate } from "react-router-dom";
import './inputStyles.css'


const Email = () => {
  const { 
    qrCodeSettings,
    setQrCodeSettings,
    isMobile,
    setActiveStep
   } = ImportStats();  const [email, setEmail] = useState(""); // For the email address
  const [message, setMessage] = useState(""); // For the email message
  const [qrName, setQrName] = useState(qrCodeSettings.qrName);
  const [emailError, setEmailError] = useState("");
  const [messageError, setMessageError] = useState("");
  const [nameError, setNameError] = useState("");
  const navigate = useNavigate()

  useEffect(() => {
    setEmail(qrCodeSettings.inputData.mail.email);
    setMessage(qrCodeSettings.inputData.mail.message);
    setQrName(qrCodeSettings.qrName);
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
          mail: { ...prevSettings.inputData.mail, email: email, message: message }, 
          },
        qrName: qrName.trim(),
      }));
      navigate('/create/input/design');
      setActiveStep(2);
  };

  return (
    <div><div className="heading-container">
    <span className="heading-2">Create Your Email Message QR Code</span>
  </div>
    <div className="option-container-home">
      {emailError && <ErrorBar message={emailError} />}
      {messageError && <ErrorBar message={messageError} />}
      {nameError && <ErrorBar message={nameError} />}
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
      
      <Button variant="contained" onClick={handleSubmit} style={{ marginTop: 20 }} className="button">
        Generate QR Code
      </Button>
      </div>
    </div>
  );
};

export default Email;
