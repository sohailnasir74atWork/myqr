import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import { ArrowBack, ArrowCircleLeft, ArrowCircleLeftRounded, ArrowCircleRightRounded, ArrowForward } from "@mui/icons-material";
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { ImportStats } from "./GlobelStats/GlobelStats";
import MenuIcon from '@mui/icons-material/Menu';
import { Divider, IconButton, StepButton } from "@mui/material";
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { useNavigate } from "react-router-dom";
import { useAuth } from "./Auth/context/authContext/Index";
import { doSignOut } from "./Auth/firebase/firebase";
const steps = ["Step 1", "Step 2", "Step 3"];

export default function StepperComponent({prop}) {
    const {open, handleDrawerToggle} = prop
    const { currentUser } = useAuth()
    const  {activeStep, setActiveStep, isMobile, userData} = ImportStats()
    const navigate = useNavigate()
    // const handleDrawerOpen = () => {
    //   setOpen(true);
    // };

    const handleBack = () => {
      if(activeStep === 1)
     { navigate('create/')
      setActiveStep(0)}
      if(activeStep === 2)
      {navigate('/create/input')
      setActiveStep(1)}

    }
    const handleNext = () => {
      // if(setActiveStep === 1)
      // navigate('/create')
      
    }
    const handlelogOut = ()=>{
      doSignOut()
    }
  return (
    <Box sx={{ width: "100%", display: "flex", flexDirection: "row", alignItems: "center" }}>

      <Stepper activeStep={activeStep} sx={{minWidth: !isMobile ? '400px' : '220px' }}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};

          return (
            <Step key={label} {...stepProps}>
            <StepButton color="inherit">
            {/* <StepLabel {...labelProps}>{!isMobile ? label : ''}</StepLabel> */}
            </StepButton>
            </Step>
          );
        })}

      </Stepper>
      {/* <p style={{color:'black'}}>userID:${currentUser?.uid}   Welcome:{userData?.firstName}</p>
      <Button onClick={handlelogOut}>lOGOUT</Button> */}


      {/* {isMobile && (
            <IconButton
              color="black"
              aria-label="open drawer"
              onClick={()=>handleDrawerToggle()}
              edge="start"
              sx={{
                position: "absolute",
                right: "10px",
                // ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
          )} */}

      <Box sx={{position:'fixed', right: '20px'}}>

        {!isMobile && activeStep !== 0 && <Box sx={{ display: "flex", flexDirection: "row"}}>
          <Button
            color="primary"
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
            className="button"
            variant="outlined"
            startIcon={<ArrowBack />}
          >
            Back
          </Button>
          <Box sx={{ flex: "1 1 auto" }} />
          <Button 
          onClick={handleNext} 
          color={activeStep === 2 ? "success" : "primary"}
          endIcon={activeStep === 2 ? '' : <ArrowForward />} 
          disabled={activeStep < 2}
          className="button"
          variant="contained">
            {activeStep === 2 ? "Completed" : "Next"}
          </Button>
        </Box>}
        {isMobile && activeStep !== 0 && <Box sx={{ display: "flex", flexDirection: "row", paddingRight:'30px'}}>
          <IconButton
            color="primary"
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
            className="button"
            variant="contained"
          >
           <ArrowCircleLeftRounded sx={{fontSize : "27px"}}/>
          </IconButton>
          <Box sx={{ flex: "1 1 auto" }} />
          {activeStep !== 2 && <IconButton 
          onClick={handleNext} 
          color={activeStep === 2 ? "success" : "primary"}
          disabled={activeStep < 2}
          className="button"
          variant="contained">
            <ArrowCircleRightRounded sx={{fontSize: "27px"}}/>
          </IconButton>}
        </Box>}
        </Box>
    </Box>
  );
}
