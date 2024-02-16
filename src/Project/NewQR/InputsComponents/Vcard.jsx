import React, { useEffect, useState } from "react";
import { Button, TextField, Grid, Typography, Slider } from "@mui/material";
import ErrorBar from "../../Error"; // Make sure this component can display multiple messages if needed
import { isValidPhoneNumber } from "libphonenumber-js";
import { ImportStats } from "../../GlobelStats/GlobelStats";

const Vcard = () => {
  const { handleNext, qrCodeSettings, setQrCodeSettings } = ImportStats();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [company, setCompany] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [address, setAddress] = useState("");
  const [fax, setFax] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [qrName, setQrName] = useState(qrCodeSettings.qrName);
  const [size, setSize] = useState(qrCodeSettings.size.width);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFirstName(qrCodeSettings.inputData.vcard.firstName);
    setLastName(qrCodeSettings.inputData.vcard.lastName);
    setPhoneNumber(qrCodeSettings.inputData.vcard.phoneNumber);
    setMobile(qrCodeSettings.inputData.vcard.mobile);
    setEmail(qrCodeSettings.inputData.vcard.email);
    setWebsite(qrCodeSettings.inputData.vcard.website);
    setCompany(qrCodeSettings.inputData.vcard.company);
    setJobTitle(qrCodeSettings.inputData.vcard.jobTitle);
    setAddress(qrCodeSettings.inputData.vcard.address);
    setCity(qrCodeSettings.inputData.vcard.city);
    setPostalCode(qrCodeSettings.inputData.vcard.postalCode);
    setCountry(qrCodeSettings.inputData.vcard.country);
    setQrName(qrCodeSettings.qrName);
    setSize(qrCodeSettings.size.width); 
  }, [qrCodeSettings]);


  const validateForm = () => {
    let tempErrors = {};
    tempErrors.firstName = firstName ? "" : "First Name is required.";
    if (email) {
      tempErrors.email = /$^|.+@.+..+/.test(email) ? "" : "Email is not valid.";
    }
    if (phoneNumber) {
      tempErrors.phoneNumber = isValidPhoneNumber(phoneNumber) ? "" : "Phone Number is not valid.";
    }

    setErrors(tempErrors);
    return Object.values(tempErrors).every(x => x === "");
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    // Update QR code settings and proceed
    setQrCodeSettings((prevSettings) => ({
      ...prevSettings,
      inputData: {
        ...prevSettings.inputData,
        url: { ...prevSettings.inputData.url, value: null }, // Optionally clear other types
        text: { ...prevSettings.inputData.text, value: null }, // Optionally clear other types
        mail: { ...prevSettings.inputData.mail, email: null, message: null },
        message: {
          ...prevSettings.inputData.message,
          number: null,
          message: null,
        },
        whatsapp: {
          ...prevSettings.inputData.whatsapp,
          number: null,
          message: null,
        },
        call: { ...prevSettings.inputData.call, number: null },
        wifi: {
          ...prevSettings.inputData.wifi,
          networkName: null,
          networkType: null,
          password: null,
          isHide: null,
        },
        vcard: {
          ...prevSettings.inputData.vcard,
          firstName: firstName,
          lastName: lastName,
          phoneNumber: phoneNumber,
          mobile: mobile,
          email: email,
          website: website,
          company: company,
          jobTitle: jobTitle,
          address: address,
          fax: fax,
          city: city,
          postalCode: postalCode,
          country: country,
        },
      },
      qrName: qrName.trim(),
      size: { width: size, height: size },
    }));
    handleNext();
  };

  return (
    <div>
      {Object.values(errors).map((error, index) => error && <ErrorBar key={index} message={error} />)}
      <div className="heading-container">
        <span className="heading-2">Create Your WhatsApp Message QR Code</span>
      </div>
      <Grid container spacing={2} alignItems="flex-end">
        <Grid item xs={6}>
          <TextField
            label="First Name"
            fullWidth
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            margin="normal"
            error={!!errors.firstName}

          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Last Name"
            fullWidth
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            margin="normal"
            error={!!errors.lastName}

          />
        </Grid>
      </Grid>
      <Grid container spacing={2} alignItems="flex-end">
        <Grid item xs={6}>
          <TextField
            label="Phone Number"
            fullWidth
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            margin="normal"
            error={!!errors.phoneNumber}

          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Mobile"
            fullWidth
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            margin="normal"
            error={!!errors.mobile}

          />
        </Grid>
      </Grid>
      <Grid container spacing={2} alignItems="flex-end">
        <Grid item xs={6}>
          <TextField
            label="Email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            error={!!errors.email}

          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Wesite (URL)"
            fullWidth
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            margin="normal"
            error={!!errors.website}

          />
        </Grid>
      </Grid>
      <Grid container spacing={2} alignItems="flex-end">
        <Grid item xs={12}>
          <TextField
            label="Company"
            fullWidth
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            margin="normal"
          />
        </Grid>
        </Grid>
        <Grid container spacing={2} alignItems="flex-end">
        <Grid item xs={6}>
          <TextField
            label="Job Title"
            fullWidth
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            margin="normal"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Fax"
            fullWidth
            value={fax}
            onChange={(e) => setFax(e.target.value)}
            margin="normal"
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} alignItems="flex-end">
        <Grid item xs={12}>
          <TextField
            label="Address"
            fullWidth
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            margin="normal"
            type="text"
            multiline
            rows={3}
          />
        </Grid>
        </Grid>
        <Grid container spacing={2} alignItems="flex-end">
        <Grid item xs={4}>
          <TextField
            label="City"
            fullWidth
            value={city}
            onChange={(e) => setCity(e.target.value)}
            margin="normal"
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Postal Code"
            fullWidth
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            margin="normal"
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Country"
            fullWidth
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            margin="normal"
          />
        </Grid>
      </Grid>
      {/* <TextField
          required
          label="WhatsApp Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          fullWidth
          margin="normal"
          multiline
          rows={4}
        /> */}
        <p className="text">Your QR code will save this contact to the phone scanning</p>

{/* Removed Width and Height TextFields */}
<br/>
      <Typography id="input-slider" gutterBottom>
        QR Code Size
      </Typography>
      <Slider
        value={size}
        onChange={(e, newValue) => setSize(newValue)}
        aria-labelledby="input-slider"
        valueLabelDisplay="auto"
        min={30}
        max={1000}
        className="slider-select"
      />
      <br />
      <Button
        variant="contained"
        onClick={handleSubmit}
        style={{ marginTop: 20 }}
      >
        Generate QR Code
      </Button>
    </div>
  );
};

export default Vcard;