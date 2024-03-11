import * as React from "react";
import Button from "@mui/material/Button";
import { ImportStats } from "../GlobelStats/GlobelStats";
import { useNavigate } from "react-router-dom";
export default function IframeStepper() {
  
    const navigate = useNavigate()
  const {setActiveStep, activeStep} = ImportStats()
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    if(activeStep === 1)
   { navigate('/create')
    setActiveStep(0)}
    if(activeStep === 2)
    {navigate('/create/input')
    setActiveStep(1)}

  }

  return (
    <div style={{display:'flex', justifyContent:'space-between'}}>
    <Button variant="outlined" size="small" onClick={handleBack} disabled={activeStep === 0}> Back</Button>
    <Button variant="contained" size='small' onClick={handleNext} disabled={activeStep === 0 || activeStep === 1}>Next</Button>
     
    </div>
  );
}