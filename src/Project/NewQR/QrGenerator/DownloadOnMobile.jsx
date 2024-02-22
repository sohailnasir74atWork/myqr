import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useLocation, useNavigate } from 'react-router-dom';

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 135,
    color: theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow: 'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
  },
}));

export default function DownloadOnMobile({ prop }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedFormat, setSelectedFormat] = React.useState('PNG');
  const { handleDownloadClick, qrCodeSettings } = prop;
  const open = Boolean(anchorEl);
  const { pathname } = useLocation(); // Destructure pathname directly
const navigation = useNavigate();
const disabled = () => pathname.includes('design');
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (format) => {
    setSelectedFormat(format);
    handleDownloadClick(format.toLocaleLowerCase(), qrCodeSettings.name);
    handleClose();
  };

  return (
    <div>
      <Button
        id="demo-customized-button"
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="contained"
        // disableElevation
        onClick={handleClick}
        disabled={!disabled()}
        sx={{ display: 'flex', justifyContent: 'space-between', width: 'auto', borderRadius: '50px' }}
      >
        Download
        <KeyboardArrowDownIcon />
      </Button>

      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={() => handleSelect('SVG')} disableRipple sx={{ display: 'flex', justifyContent: 'space-between' }}>
          SVG
          <CloudDownloadIcon />
        </MenuItem>
        <Divider sx={{ margin: '1px 0 !important' }} />
        <MenuItem onClick={() => handleSelect('PNG')} disableRipple sx={{ display: 'flex', justifyContent: 'space-between' }}>
          PNG
          <CloudDownloadIcon />
        </MenuItem>
                <Divider sx={{ margin: '1px 0 !important' }} />
       <MenuItem onClick={() => handleSelect('WEBP')} disableRipple sx={{ display: 'flex', justifyContent: 'space-between' }}>
          WEBP
          <CloudDownloadIcon />
        </MenuItem>
                <Divider sx={{ margin: '1px 0 !important' }} />
       <MenuItem onClick={() => handleSelect('JPEG')} disableRipple sx={{ display: 'flex', justifyContent: 'space-between' }}>
          JPEG
          <CloudDownloadIcon />
        </MenuItem>
      </StyledMenu>
    </div>
  );
}