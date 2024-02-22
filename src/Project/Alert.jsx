import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router-dom';
import { Alert, Snackbar } from '@mui/material';

export default function AlertDialog({prop}) {
  const {openAlert, setOpenAlert, message, heading, activeStep, setActiveStep, setQrCodeSettings} = prop 
const navigate = useNavigate()
  const handleClose = () => {
    setOpenAlert(false);
     };
     console.log('ALERT')
 return (
    <React.Fragment>
      
      <div>
      <Snackbar open={openAlert} autoHideDuration={60000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
    </React.Fragment>
  );
}