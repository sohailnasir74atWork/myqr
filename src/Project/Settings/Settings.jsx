import React, { useEffect, useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import {
  doDeleteUser,
  doPasswordChange,
  doUpdateProfile,
} from "../Auth/firebase/firebase";
import { useAuth } from "../Auth/context/authContext/Index";
import SuccessBar from "../Success";
import ErrorBar from "../Error";

const Settings = () => {
  const { userLoggedIn, currentUser } = useAuth(); // Assuming useAuth provides currentUser
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [deletePassword, setDeletePassword] = useState("");
  const [displayName, setDisplayName] = useState('')

  useEffect(()=>{setDisplayName(currentUser.displayName)}, [currentUser])
  const handlePasswordChange = async () => {
    setSuccessMessage("");
    setErrorMessage("");
    
    if (password.length < 6) {
      setErrorMessage("Password should be at least 6 characters long.");
      return;
    }
  
    if (password === confirmPassword && userLoggedIn) {
      try {
        await doPasswordChange(password);
        setSuccessMessage("Password updated successfully");
        setPassword("");
        setConfirmPassword("");
      } catch (error) {
        console.error("Password change failed:", error);
        setErrorMessage("Password change failed. Please try again.");
      }
    } else {
      setErrorMessage("Passwords do not match");
    }
  };
  

  const handleDisplayNameUpdate = async () => {
    setSuccessMessage("");
    setErrorMessage("");

    // Check if the name is empty
    if (!name.trim()) {
        setErrorMessage("Name cannot be empty.");
        return; // Return early to prevent the rest of the function from executing
    }

    try {
        await doUpdateProfile(name, "ASQW");
        setSuccessMessage("Display name updated successfully");
        setDisplayName(name)
        setName(""); // Consider if you really want to clear the name after updating
    } catch (error) {
        console.error("Display name update failed:", error);
        setErrorMessage("Display name update failed. Please try again.");
    }
};


  const handleDoDelete = async () => {
    setSuccessMessage("");
    setErrorMessage("");
    try {
      await doDeleteUser(deletePassword);
      setSuccessMessage("User deleted successfully");
      setDeletePassword("");
    } catch (error) {
      console.error("User delete failed:", error);
      setErrorMessage("User delete failed. Please try again.");
    }
  };

  return (
    <Box className="container" style={{ backgroundColor: "white", paddingLeft: "20px" }}>
      <div className="heading-container">
        <span className={"heading-2"}>{displayName}</span>
      </div>
      <div className="option-container-home" style={{ width: "50%" }}>
        <span className="text-primary">Change Password</span>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <TextField
            required
            label="New Password"
            type="password"
            autoComplete="new-password"
            variant="standard"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            required
            label="Confirm Password"
            type="password"
            autoComplete="new-password"
            variant="standard"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
           />
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button variant="contained" onClick={handlePasswordChange}>
              Submit
            </Button>
          </div>
        </div>
      </div>
      <div className="option-container-home" style={{ width: "50%", marginTop: "20px" }}>
        <span className="text-primary">Account</span>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <TextField
            required
            label="Display Name"
            type="text"
            autoComplete="name"
            variant="standard"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button variant="contained" onClick={handleDisplayNameUpdate}>
              Update Display Name
            </Button>
          </div>
          <TextField
            required
            label="Password"
            type="password"
            autoComplete="current-password"
            variant="standard"
            value={deletePassword}
            onChange={(e) => setDeletePassword(e.target.value)}
          />
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button variant="contained" color="error" onClick={handleDoDelete}>
              Delete Account
            </Button>
          </div>
          {successMessage && <SuccessBar message={successMessage} />}
          {errorMessage && <ErrorBar message={errorMessage} /> }
        </div>
      </div>
    </Box>
  );
};

export default Settings;
