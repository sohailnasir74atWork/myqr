import React, { useEffect } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import {
  Box,
  CssBaseline,
  Typography,
  Divider,
  IconButton,
  Toolbar,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import StepperComponent from './Stepper';
import { ImportStats } from './GlobelStats/GlobelStats';
import { sideBar } from './DynamicData';
import AlertDialog from './Alert';
import { QrCodeScanner } from '@mui/icons-material';
import Pro from "../Assets/icons/Pro.svg"
import logo from '../Assets/LOGO/logofull.svg'



const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  [theme.breakpoints.down("sm")]: {
    width: "60%",
    // borderRight: `100px solid rgba(0, 0, 0, 0.1)`, // Adjust the width and color as needed
  },
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
  [theme.breakpoints.down("sm")]: {
    width: "0px",
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

export default function MiniDrawer() {
  const theme = useTheme();
  const { activeStep, setActiveStep, isMobile, qrCodeSettings, setQrCodeSettings } = ImportStats();
  const [open, setOpen] = React.useState(!isMobile);
  const [openAlert, setOpenAlert] = React.useState(false);
  const [message, setMessage] = React.useState('Changing the QR Type will delete the current data');
  const [heading, setHeading] = React.useState('Alert');

  const handleDrawerToggle = () => {
    setOpen(!open);
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = (e) => {
    // console.log(e)
    if(isMobile){setOpen(false)}
    // if(e === 0 && ) 
    // { setOpenAlert(true)
    //  }
  };
  const handleNext = () => {
    if(activeStep<2){setActiveStep((prevActiveStep) => prevActiveStep + 1);}
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    if(activeStep === 2)
    {navigate('/create/input');}
    if(activeStep === 1)
    {navigate('/create');}
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  useEffect(() => {
    // console.log('active-step updated in drawrer', activeStep);
  }, [activeStep]);

  const menuItems = [
    { text: 'Create New', icon: <MailIcon />, path: '/create' },
    { text: 'Templates', icon: <InboxIcon />, path: '/templates' },
    { text: 'My QR', icon: <MailIcon />, path: '/myqr' },
    { text: 'Statictics', icon: <MailIcon />, path: '/stats' },
  ];
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes('/create')) {
      if(activeStep === 0 ) {
          navigate('create');
      }
    }
  }, [activeStep, location.pathname, navigate]);
  const handleNavigate = (e)=>{
    if(e === '/create' && qrCodeSettings.type !== '') {
      setOpenAlert(true)
      setActiveStep(0)
      navigate(e)
    } 
    else
{    navigate(e)
  setActiveStep(0)

}  }
const CommonIconButton = () => (
  <IconButton
    color="black"
    aria-label="open drawer"
    onClick={() => handleDrawerToggle()}
    edge="start"
    sx={{
      position: "absolute",
      right: "10px",
    }}
  >
    <MenuIcon  />
  </IconButton>
);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{ backgroundColor: 'var(--background-color)' }}>
      {isMobile && !open && (
  <Toolbar>
    {!isMobile && (
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={handleDrawerToggle}
        edge="start"
        sx={{
          marginRight: 5,
          ...(open && { display: 'none' }),
        }}
      >
        <MenuIcon />
      </IconButton>
    )}
    
    {location.pathname.includes('/create') && (
      <>
        <StepperComponent prop={{ handleBack, handleNext, activeStep, setActiveStep, open, handleDrawerToggle }} />
        <CommonIconButton />
      </>
    )}

    {location.pathname.includes('/templates') && (
      <>
        <Box style={{ display: 'flex', justifyContent: 'center', width: '100%', color:'black' }}>Template header</Box>
        <CommonIconButton />
      </>
    )}

    {location.pathname.includes('/stats') && (
      <>
      <Box style={{ display: 'flex', justifyContent: 'center', width: '100%', color:'black' }}>Stats header</Box>
      <CommonIconButton /></>

    )}

    {location.pathname.includes('/myqr') && (
      <>
      <Box style={{ display: 'flex', justifyContent: 'center', width: '100%', color:'black' }}>MY QR header</Box>
      <CommonIconButton /></>
    )}
    {location.pathname.includes('/generate-bulk') && (
      <>
      <Box style={{ display: 'flex', justifyContent: 'center', width: '100%', color:'black' }}>Bulk header</Box>
      <CommonIconButton /></>
    )}
  </Toolbar>
)}
        {!isMobile && !location.pathname.includes('stats') &&  !location.pathname.includes('myqr') && !location.pathname.includes('generate-bulk') && <Toolbar>
          {!isMobile && <IconButton
            // color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>}
          {location.pathname.includes('/create') && <StepperComponent prop={{ handleBack, handleNext, activeStep, setActiveStep, open, handleDrawerToggle }} />}
          {location.pathname.includes('templates') && 
            <Box style={{ display: 'flex', justifyContent: 'center', width: '100%', color:'black' }}>Template header</Box>
          }
          {location.pathname.includes('stats') && (
            <Box style={{ display: 'flex', justifyContent: 'center', width: '100%', color:'black' }}>Stats header</Box>
          )}
          {location.pathname.includes('myqr') && (
            <Box style={{ display: 'flex', justifyContent: 'center', width: '100%', color:'black' }}>The Pro version is scheduled to go live in mid-2024</Box>
          )}
        </Toolbar>}
      </AppBar>
      <Drawer variant="permanent" open={open}  sx={{ position: isMobile ? "absolute" : "" }}>
        <DrawerHeader>
          <div style={{height: '60px', display:'flex', justifyContent:'center', alignItems:'center',  width:"100%"}}>
            <img src={logo} alt='logo' style={{width:'auto', height:'100%'}}/>
                    </div>
          <IconButton onClick={handleDrawerToggle}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
          
        </DrawerHeader>
        <Divider />
        <List>
          {sideBar.map((item, index) => (
            <ListItem key={item.text} disablePadding sx={{ display: 'block' }} onClick={()=>handleDrawerClose(index)}>
              <ListItemButton
                selected={location.pathname.includes(item.path)} // Add selected prop
                onClick={()=>handleNavigate(item.path)}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  borderRight: location.pathname.includes(item.path) ? '3px solid var(--darkgreen-color)' : '3px solid transparent',
                  color: location.pathname.includes(item.path) ? 'var(--darkgreen-color)' : '',
                  px: 2.5,
                  
                }}
                // component={Link}
                // to={item.path}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.heading} sx={{ opacity: open ? 1 : 0 }} />
                {index > 1 && open && <span className="paid-tag-sidebar"><img src={Pro} alt='pro' width='100%' height='100%'/></span>}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <div className={isMobile && open ? "overlay-sidebar" : "hide"} onClick={handleDrawerToggle}></div>
      <AlertDialog prop={{openAlert, setOpenAlert, message, heading, setActiveStep, activeStep, qrCodeSettings, setQrCodeSettings}}/>
    </Box>
  );
}
