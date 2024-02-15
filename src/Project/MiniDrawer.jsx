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

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  [theme.breakpoints.down("sm")]: {
    width: "80%",
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
  const [open, setOpen] = React.useState(false);
  const { activeStep, handleNext, handleBack, setActiveStep, isMobile } = ImportStats();
  const handleDrawerToggle = () => {
    setOpen(!open);
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    console.log('active-step updated in drawrer', activeStep);
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
      switch (activeStep) {
        case 0:
          navigate('create');
          break;
        case 1:
          navigate('create/input');
          break;
        case 2:
          navigate('create/input/design');
          break;
        default:
          console.log('Invalid step or initial step, no navigation');
      }
    }
  }, [activeStep, location.pathname, navigate]);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{ backgroundColor: 'lightgrey' }}>
        <Toolbar>
          {!isMobile && <IconButton
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
          </IconButton>}
          {location.pathname.includes('/create') && isMobile && !open && <StepperComponent prop={{ handleBack, handleNext, activeStep, setActiveStep, open, handleDrawerToggle }} />}
          {location.pathname.includes('/create') && !isMobile && <StepperComponent prop={{ handleBack, handleNext, activeStep, setActiveStep, open, handleDrawerToggle }} />}
          {location.pathname.includes('/template/') && (
            <Box style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>Template header</Box>
          )}
          {location.pathname.includes('/stats/') && (
            <Box style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>Stats header</Box>
          )}
          {location.pathname.includes('/myqr/') && (
            <Box style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>My qr header header</Box>
          )}
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}  sx={{ position: isMobile ? "absolute" : "" }}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerToggle}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {sideBar.map((item, index) => (
            <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                selected={location.pathname.includes(item.path)} // Add selected prop
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  borderRight: location.pathname.includes(item.path) ? '3px solid var(--darkgreen-color)' : '',
                  color: location.pathname.includes(item.path) ? 'var(--darkgreen-color)' : '',
                  px: 2.5,
                }}
                component={Link}
                to={item.path}
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
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <div className={isMobile && open ? "overlay-sidebar" : "hide"}></div>
    </Box>
  );
}
