import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import signin from "../../Assets/signin.webp"
import './auth.css'
import { ImportStats } from '../GlobelStats/GlobelStats';
import { useState } from 'react';
import { doCreateUserWithEmailAndPassword } from './firebase/firebase';
import { useAuth } from './context/authContext/Index';
import { useNavigate } from 'react-router-dom';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://generateqrcode.io/">
        Generate QR Code
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const defaultTheme = createTheme();

export default function SignUpSide() {
    const { isMobile } = ImportStats()
    const [email, setEmail] = React.useState('')
    const [firstName, setFirstName] = React.useState('')
    const [lastName, setLastName ] = React.useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setconfirmPassword] = useState('')
    const [isRegistering, setIsRegistering] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const { userLoggedIn, currentUser } = useAuth()
    const navigate = useNavigate()
    console.log(userLoggedIn, currentUser?.uid)

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('')
        if (!isRegistering && !userLoggedIn) {
          setIsRegistering(true);
          await doCreateUserWithEmailAndPassword(email, password, firstName)
            .catch(error => {
              setErrorMessage(error.message);
              setIsRegistering(false)
            });
        } else {
          setErrorMessage('User is already registered');
          setIsRegistering(false)

        }
      };

  return (
    <>
        {userLoggedIn && navigate('/create')}
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
     <Grid item xs={12} sm={6} md={6} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: { xs: 2, md: 2 },
              mx: { xs: 2, md: 2 },
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent:'center'
              }}
          >
            <div className='text-fields-container'
>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Grid container spacing={2} sx={{mt:3}}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  placeholder="First Name"
                  autoFocus
                  onChange={(e) => { setFirstName(e.target.value) }}
                  InputLabelProps={{shrink:false}}
                  className='text-field'
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '50px', // Set border-radius to 50px
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  placeholder='Last Name'
                  name="lastName"
                  autoComplete="family-name"
                  onChange={(e) => { setLastName(e.target.value) }}
                  InputLabelProps={{shrink:false}}
                  className='text-field'
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '50px', // Set border-radius to 50px
                    },
                  }}
                />
              </Grid>
              </Grid>
    
           <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
               <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                name="email"
                autoComplete="email"
                placeholder='Email Address'
                onChange={(e) => { setEmail(e.target.value) }}
                InputLabelProps={{shrink:false}}
                value={email}
                className='text-field'
                sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '50px', // Set border-radius to 50px
                    },
                  }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                placeholder="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password} onChange={(e) => { setPassword(e.target.value) }}
                InputLabelProps={{shrink:false}}
                className='text-field'
                sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '50px', // Set border-radius to 50px
                    },
                  }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmed password"
                placeholder="Confirmed Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={confirmPassword} onChange={(e) => { setconfirmPassword(e.target.value) }}
                error={!!errorMessage}
                helperText={errorMessage}
                InputLabelProps={{shrink:false}}
                className='text-field'
                sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '50px', // Set border-radius to 50px
                    },
                  }}
                 />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="I want to receive updates on this email"
              />
              <Button
                type="submit"
                fullWidth
                size='large'
                variant="contained"
                sx={{ mt: 3, mb: 2, borderRadius:'50px', py:1.5,
            }}
              >
                Sign Up
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Already have an account ? Sign in"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
            </div>
          </Box>
        </Grid>
        {!isMobile && <Grid
          item
          xs={false}
          sm={6}
          md={6}
          sx={{
            backgroundColor: '#5956D6',
          }}
        >
          <div style={{display:'flex', justifyContent:'center', alignItems:'center', width:'100%', height:'100vh'}}>
        <img src={signin} alt='signin' height='auto' width='60%'/>
        </div>
          </Grid>}
      </Grid>
    </ThemeProvider>
    </>
  );
}