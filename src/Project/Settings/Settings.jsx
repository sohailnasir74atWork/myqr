import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import {
  doDeleteUser,
  doPasswordChange,
  doUpdateProfile,
} from "../Auth/firebase/firebase";
import { useAuth } from "../Auth/context/authContext/Index";
import SuccessBar from "../Success";
import { auth } from "../Auth/firebase/auth";

const Settings = () => {
  const { userLoggedIn } = useAuth();
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [deletePassword, setDeletePassowrd] = useState("");

  const user = auth.currentUser;
  console.log(user.displayName);
  const UserName = user.displayName
    ?.split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const handlePasswordChange = async () => {
    if (password === confirmPassword && userLoggedIn) {
      try {
        // await doReauthenticateWithCredential(currentPassword);
        await doPasswordChange(password);
        setSuccessMessage("Password updated successfully");
        setErrorMessage("");
      } catch (error) {
        console.error("Reauthentication failed:", error);
        setErrorMessage("Reauthentication failed. Please try again.");
      }
    } else {
      setErrorMessage("Passwords do not match");
    }
  };

  const handleDisplayNameUpdate = async () => {
    try {
      await doUpdateProfile(name, "ASQW");
      setSuccessMessage("Display name updated successfully");
      setErrorMessage("");
    } catch (error) {
      console.error("Display name update failed:", error);
      setErrorMessage("Display name update failed. Please try again.");
    }
  };
  const handleDoDelete = async () => {
    try {
      await doDeleteUser(deletePassword);
      setSuccessMessage("User Deleted successfully");
      setErrorMessage("");
    } catch (error) {
      console.error("User Delete failed:", error);
      setErrorMessage("User Delete failed. Please try again.");
    }
  };
  return (
    <Box
      className="container"
      style={{ backgroundColor: "white", paddingLeft: "20px" }}
    >
      <div className="heading-container">
        <span className={"heading-2"}>{UserName}</span>
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
            error={!!errorMessage && errorMessage.includes("New Password")}
            helperText={
              errorMessage && errorMessage.includes("New Password")
                ? errorMessage
                : ""
            }
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
            helperText={
              errorMessage && errorMessage.includes("Confirm Password")
                ? errorMessage
                : ""
            }
          />
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button variant="contained" onClick={handlePasswordChange}>
              Submit
            </Button>
          </div>
          {successMessage && <SuccessBar message={successMessage} />}
        </div>
      </div>
      <div
        className="option-container-home"
        style={{ width: "50%", marginTop: "20px" }}
      >
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
            label="Passowrd"
            type="password"
            autoComplete="new-password"
            variant="standard"
            value={deletePassword}
            onChange={(e) => setDeletePassowrd(e.target.value)}
            error={!!errorMessage && errorMessage.includes("Confirm Password")}
            helperText={
              errorMessage && errorMessage.includes("Confirm Password")
                ? errorMessage
                : ""
            }
          />
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button variant="contained" color="error" onClick={handleDoDelete}>
              Delete Account
            </Button>
          </div>
          {successMessage && <SuccessBar message={successMessage} />}
        </div>
      </div>
    </Box>
  );
};

export default Settings;
