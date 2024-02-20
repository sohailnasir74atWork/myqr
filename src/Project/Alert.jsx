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

  const handleAgree = () => {
    setOpenAlert(false);
    setActiveStep(0)
    setQrCodeSettings({
        type:'',
        qrName: "My QR",
        size: { height: "300", width: "300" },
        inputData: {
          url: { value: null },
          text: { value: null },
          mail: { email: null, message : null },
          whatsapp: { number: null, message : null },
          message: { number: null, message : null },
          call: { call : null },
          wifi: { networkName : null, networkType : null, password : null, isHide : false },
          vcard: {firstName: null,
            lastName: null,
            phoneNumber: null,
            mobile : null,
            email: null,
            website: null,
            company: null,
            jobTitle: null,
            address: null,
            fax: null,
            city: null,
            postalCode: null,
            country: null}
       },
        logo: null,
        logoSetting: { backgrounddots: true, margin: 10 },
        colors: {
          background: { isSolid: true, color: "#FFFFFF" },
          dots: { isSolid: true, color: "#000000" },
          square: { isSolid: true, color: "#000000" },
          cornerDots: { isSolid: true, color: "#000000" },
        },
        types: {
          corner: { type: "square" },
          dots: { type: "square" },
          square: { isSolid: true, color: "#000000" },
          cornerDots: { type: "square" },
        },
        clearInput: false,
      }) 
      navigate('/create')
 };

  return (
    <React.Fragment>
      
      <div>
      <Snackbar open={openAlert} autoHideDuration={600000} onClose={handleClose}>
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