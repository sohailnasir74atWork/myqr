import * as React from 'react';
import { styled } from '@mui/material/styles';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import { pink, purple, green, red } from '@mui/material/colors';
import ColorHandling from './Options/ColorHandling';
import ShapesHandling from "./Options/ShapesHandling"
import FilterFramesIcon from '@mui/icons-material/FilterFrames';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import LogoHandling from './Options/LogoHandling';
import QrOptions from './Options/QrOptions';
import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import Pro from "../../../Assets/icons/Pro.svg"
import { ImportStats } from '../../GlobelStats/GlobelStats';

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&::before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<AddRoundedIcon sx={{ fontSize: '1.5rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'light'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(45deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export default function CustomizedAccordions({ prop }) {
  const [expanded, setExpanded] = React.useState(['']);
  const { setQrCodeSettings, qrCodeSettings } = prop;
  const {iframe} = ImportStats()

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? [panel] : []);
  };

  return (
    <>
    <div className={iframe ? "heading-container-iframe" : "heading-container"}>
      <span className={iframe ? "heading-2-iframe" : "heading-2"}>Customize Design</span></div>
      <Accordion
        expanded={expanded.includes('panel2')}
        onChange={handleChange('panel2')}
        sx={{ marginBottom: '20px', borderWidth: '0px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', borderRadius: '10px' }}
      >
        <AccordionSummary
          aria-controls="panel2d-content"
          id="panel2d-header"
          sx={{ height: iframe ? '40px' : '60px' }}
        >
          <ColorLensIcon sx={{ color: pink[500] }} />
          <Typography style={{ paddingLeft: '10px' }} className='text-primary'>Colors</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ColorHandling prop={{ setQrCodeSettings, qrCodeSettings }} />
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded.includes('panel3')}
        onChange={handleChange('panel3')}
        sx={{ marginBottom: '20px', borderWidth: '0px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', borderRadius: '10px' }}
      >
        <AccordionSummary
          aria-controls="panel3d-content"
          id="panel3d-header"
          sx={{ height: iframe ? '40px' : '60px' }}
        >
          <DashboardCustomizeIcon sx={{ color: purple[800] }} />
          <Typography style={{ paddingLeft: '10px' }} className='text-primary'>Shape & Forms</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ShapesHandling prop={{ setQrCodeSettings, qrCodeSettings }}/>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded.includes('panel4')}
        onChange={handleChange('panel4')}
        sx={{ marginBottom: '20px', borderWidth: '0px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', borderRadius: '10px' }}
      >
        <AccordionSummary
          aria-controls="panel4d-content"
          id="panel4d-header"
          sx={{ height: iframe ? '40px' : '60px' }}
        >
          <InsertPhotoIcon sx={{ color: green[500] }} />
          <Typography style={{ paddingLeft: '10px' }} className='text-primary'>LOGO</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <LogoHandling prop={{ setQrCodeSettings, qrCodeSettings }}/>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded.includes('panel5')}
        onChange={handleChange('panel5')}
        sx={{ marginBottom: '20px', borderWidth: '0px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', borderRadius: '10px' }}
      >
        <AccordionSummary
          aria-controls="panel5d-content"
          id="panel5d-header"
          sx={{ height: iframe ? '40px' : '60px' }}
        >
          <AspectRatioIcon sx={{ color: red[500] }} />
          <Typography style={{ paddingLeft: '10px' }} className='text-primary'>QR Size</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <QrOptions prop={{setQrCodeSettings, qrCodeSettings}}/>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded.includes('panel6')}
        onChange={handleChange('panel6')}
        sx={{ marginBottom: '20px', borderWidth: '0px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', borderRadius: '10px' }}
      >
        <AccordionSummary
          aria-controls="panel6d-content"
          id="panel6d-header"
          sx={{ height: iframe ? '40px' : '60px' }}
        >
          <FilterFramesIcon sx={{ color: purple[500] }} />
          <Typography style={{ paddingLeft: '10px' }} className='text-primary'>Frames</Typography>
          <span className="paid-tag-design"><img src={Pro} alt='pro' width='100%' height='100%'/></span>
        </AccordionSummary>
        <AccordionDetails>
          <span style={{display:'flex', justifyContent:'center', alignItems:'center'}}> COMMING SOON</span>
         
        </AccordionDetails>
      </Accordion>
    </>
  );
}
