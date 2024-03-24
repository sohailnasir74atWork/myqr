import React, { useState } from "react";
import { Box, Button, Divider, Grid, TextField } from "@mui/material";
import { ImportStats } from "../GlobelStats/GlobelStats";
import { Margin } from "@mui/icons-material";
// import "../NewQR/newqrStyle.css";

const Settings = () => {
  const { userData, isMobile } = ImportStats();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <Box className="container mobile-mr-t-20" style={{width: isMobile ? '90%' : '50%', margin: isMobile ? '20px auto 0px' : ''}}>
      <div className="heading-container">
        <span className={"heading-2"}>Welcome: {userData.firstName}</span>
      </div>

      <div className={"option-container-home"} >
        <span className="text-primary">Change Password</span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <TextField
            id="standard-password-input"
            label="Password"
            type="password"
            autoComplete="new-password"
            variant="standard"
          />
          <TextField
            id="standard-confirm-password-input"
            label="Confirm Password"
            type="password"
            autoComplete="new-password"
            variant="standard"
            error={!!errorMessage}
            helperText={errorMessage}
          />
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="contained" style={{ width: 'auto' }}>Submit</Button>
          </div>
         </div>
      </div>
      <div className="option-container-home" style={{marginTop:'20px'}}>
         <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span className="text-primary">Account Status</span>
            <span className="text-primary" style={{color:'green'}}>Active</span>
          </div>
        </div>
    </Box>
  );
};

export default Settings;
