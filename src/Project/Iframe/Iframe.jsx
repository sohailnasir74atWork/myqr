import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import SelectScreen from "../NewQR/SelectTypes";
import { ImportStats } from "../GlobelStats/GlobelStats";
const steps = [
  "Select campaign settings",
  "Create an ad group",
  "Create an ad",
];

export default function Iframe() {
  const { setIframe, activeStep, setActiveStep } = ImportStats();
  React.useEffect(() => {
    setIframe(true);
    setActiveStep(0);
  }, []);
  

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
    <Box style={{ padding:'10px 30px' }}>
     
     <SelectScreen/>
     
    </Box>
  );
}