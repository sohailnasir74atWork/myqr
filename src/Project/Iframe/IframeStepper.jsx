import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import SelectScreen from "../NewQR/SelectTypes";
import { ImportStats } from "../GlobelStats/GlobelStats";
import StepperComponent from "../Stepper";
const steps = [
  "Select campaign settings",
  "Create an ad group",
  "Create an ad",
];

export default function IframeStepper() {
  
  const open = false
  const handleDrawerToggle = false
  const {setActiveStep, activeStep} = ImportStats()
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box>
    <Button variant="outlined" size="small">Back</Button>
    <Button variant="contained" size='small'>Next</Button>
     
    </Box>
  );
}