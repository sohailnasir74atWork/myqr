import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { ImportStats } from "../GlobelStats/GlobelStats";
import { doDeleteUser, doPasswordChange, doReauthenticateWithCredential, doUpdateEmail, doUpdateProfile } from "../Auth/firebase/firebase";
import { useAuth } from "../Auth/context/authContext/Index";
import SuccessBar from "../Success";
import { auth } from "../Auth/firebase/auth";

const Settings = () => {
  const { userLoggedIn } = useAuth();
  const [password, setPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const user = auth.currentUser;

  const handlePasswordChange = async () => {
    if (password === confirmPassword && userLoggedIn) {
      try {
        await doReauthenticateWithCredential(currentPassword);
        await doPasswordChange(password);
        setSuccessMessage('Password updated successfully');
        setErrorMessage("");
      } catch (error) {
        console.error("Reauthentication failed:", error);
        setErrorMessage("Reauthentication failed. Please try again.");
      }
    } else {
      setErrorMessage("Passwords do not match");
    }
  };

  const handleEmailUpdate = async () => {
    try {
      await doUpdateEmail( email );
      setSuccessMessage('Email updated successfully');
      setErrorMessage("");
    } catch (error) {
      console.error("Email update failed:", error);
      setErrorMessage("Email update failed. Please try again.");
    }
  };

  const handleDisplayNameUpdate = async () => {
    try {
      await doUpdateProfile(name, 'ASQW');
      setSuccessMessage('Display name updated successfully');
      setErrorMessage("");
    } catch (error) {
      console.error("Display name update failed:", error);
      setErrorMessage("Display name update failed. Please try again.");
    }
  };

  return (
    <Box className="container" style={{ backgroundColor: "white", paddingLeft: '20px' }}>
      <div className="heading-container">
        <span className={"heading-2"}>{user.displayName}</span>
      </div>

      <div className="option-container-home" style={{ width: '50%' }}>
        <span className="text-primary">Change Password</span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <TextField
            required
            label="Current Password"
            type="password"
            autoComplete="new-password"
            variant="standard"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            error={!!errorMessage && errorMessage.includes("Current Password")}
            helperText={errorMessage && errorMessage.includes("Current Password") ? errorMessage : ""}
          />
          <TextField
            required
            label="New Password"
            type="password"
            autoComplete="new-password"
            variant="standard"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!errorMessage && errorMessage.includes("New Password")}
            helperText={errorMessage && errorMessage.includes("New Password") ? errorMessage : ""}
          />
          <TextField
            required
            label="Confirm Password"
            type="password"
            autoComplete="new-password"
            variant="standard"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={!!errorMessage && errorMessage.includes("Confirm Password")}
            helperText={errorMessage && errorMessage.includes("Confirm Password") ? errorMessage : ""}
          />
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="contained" onClick={handlePasswordChange}>Submit</Button>
          </div>
          {successMessage && <SuccessBar message={successMessage} />}
        </div>
      </div>
      <div className="option-container-home" style={{ width: '50%', marginTop:'20px' }}>
        <span className="text-primary">Account</span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <TextField
            required
            label="Email"
            type="text"
            autoComplete="email"
            variant="standard"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!errorMessage && errorMessage.includes("Email")}
            helperText={errorMessage && errorMessage.includes("Email") ? errorMessage :
            ""}
          />
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="contained" onClick={handleEmailUpdate}>Update Email</Button>
          </div>
          <TextField
            required
            label="Display Name"
            type="text"
            autoComplete="name"
            variant="standard"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="contained" onClick={handleDisplayNameUpdate}>Update Display Name</Button>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="contained" color="error" onClick={doDeleteUser}>Delete Account</Button>
          </div>
          {successMessage && <SuccessBar message={successMessage} />}
        </div>
      </div>
    </Box>
  );
};

export default Settings;
