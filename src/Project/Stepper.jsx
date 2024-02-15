import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { ImportStats } from "./GlobelStats/GlobelStats";
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from "@mui/material";
const steps = ["Step 1", "Step 2", "Step 3"];

export default function StepperComponent({prop}) {
    const {open, handleDrawerToggle} = prop
    const  {handleBack, handleNext, activeStep, setActiveStep, isMobile} = ImportStats()
    // const handleDrawerOpen = () => {
    //   setOpen(true);
    // };
  return (
    <Box sx={{ width: "100%", display: "flex", flexDirection: "row", alignItems: "center" }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};

          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{!isMobile ? label : ''}</StepLabel>
            </Step>
          );
        })}

      </Stepper>
      {isMobile && (
            <IconButton
              color="black"
              aria-label="open drawer"
              onClick={handleDrawerToggle}
              edge="start"
              sx={{
                position: "absolute",
                right: "10px",
                // ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
          )}
      <Box sx={{position:'fixed', right: '20px'}}>
        {!isMobile && <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
          <Button
            color="primary"
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
            className="button"
            variant="contained"
            startIcon={<ArrowBack />}
          >
            Back
          </Button>
          <Box sx={{ flex: "1 1 auto" }} />
          <Button 
          onClick={handleNext} 
          color={activeStep === 2 ? "success" : "primary"}
          endIcon={activeStep === 2 ? <SaveAltIcon/> : <ArrowForward />} 
          disabled={activeStep < 2}
          className="button"
          variant="contained">
            {activeStep === 2 ? "Save" : "Next"}
          </Button>
        </Box>}
        </Box>
    </Box>
  );
}
