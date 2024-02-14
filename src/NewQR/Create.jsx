import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ImportStats } from '../GlobelStats/GlobelStats';

const Create = () => {
    const { activeStep, handleNext, handleBack, setActiveStep } = ImportStats();
    const navigate = useNavigate();
  console.log('active-step updated in component', activeStep)

  useEffect(() => {
    // Based on the activeStep value, navigate to the appropriate route
    switch (activeStep) {
      case 0:
        navigate('/create/new');
        break;
      case 1:
        navigate('/create/new/input');
        break;
      case 2:
        navigate('/create/new/input/design');
        break;
      default:
        // Handle a default case, possibly navigating to a default route or logging an error
        console.log('Invalid step or initial step, no navigation');
    }
  }, [activeStep, navigate]); // Re-run this effect if activeStep changes

  return <div className='container'>This is Other Page 1. Active step is: {activeStep}</div>;
}

export default Create;
