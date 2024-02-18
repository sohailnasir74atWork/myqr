import React from 'react';
import { Box, Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { ImportStats } from '../GlobelStats/GlobelStats';
import './templateStyle.css';
import QrGenerator from '../NewQR/QrGenerator/QrGenerator';
import { templates } from './dafaultTemplates';
import { useNavigate } from 'react-router-dom';

const Templates = () => {
  const { isMobile, setQrCodeSettings, qrCodeSettings } = ImportStats();
  const [selectedDataType, setSelectedDataType] = React.useState('Link');
  const liveDemo = false;
  const navigate = useNavigate()
  const handleStart = (template) => {
    setQrCodeSettings(template)
    navigate('create/input/design');
    
  }
  const handleChange = (event) => {
    setSelectedDataType(event.target.value);
  };

  const renderQrGenerator = (template, index) => (
    <Box key={index} className='template-container' sx={{ p: 1 }}>
      <QrGenerator prop={{ template, liveDemo }} />
      <Box sx={{ minWidth: 120, pt:1 }}>
        {/* <FormControl fullWidth>
          <InputLabel id={`data-type-label-${index}`}>Select Data Type</InputLabel>
          <Select
            labelId={`data-type-label-${index}`}
            id={`data-type-select-${index}`}
            value={selectedDataType}
            label="Select Data Type"
            onChange={handleChange}
          >
            {['Link', 'Text', 'V-Card', 'WhatsApp', 'Message', 'Email', 'Call', 'Wi-Fi'].map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl> */}
        <Button variant='contained' fullWidth sx={{ mt: 1 }} onClick={()=>handleStart(template)}>
          Customize
        </Button>
      </Box>
    </Box>
  );

  return (
    <Box className={`container ${isMobile ? 'mobile-mr-t-20' : ''}`}>
      <div className={isMobile ? 'container-custom-mobile' : 'container-custom'}>
        <div className="heading-container">
          <span className="heading-2">Productivity Boost Templates</span>
        </div>
        <div className="grid-container-templates">
          {templates.map((template, index) => renderQrGenerator(template, index))}
        </div>
      </div>
    </Box>
  );
};

export default Templates;