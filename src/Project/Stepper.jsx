import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";

const steps = ["Step 1", "Step 2", "Step 3"];

export default function StepperComponent({prop}) {
  
    const  {handleBack, handleNext, activeStep, setActiveStep} = prop
    React.useEffect(()=>{console.log('active-step updated in stepper', activeStep)},[activeStep])


  return (
    <Box sx={{ width: "100%", display: "flex", flexDirection: "row", alignItems: "center" }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};

          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}

      </Stepper>
      <Box sx={{position:'fixed', right: '20px'}}>
        <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
          <Button
            color="inherit"
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            Back
          </Button>
          <Box sx={{ flex: "1 1 auto" }} />
          <Button onClick={handleNext}>
            {activeStep === 2 ? "Finish" : "Next"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
