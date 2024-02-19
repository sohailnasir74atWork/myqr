import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router-dom';

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
      
      <Dialog
        open={openAlert}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {heading}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleAgree} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}