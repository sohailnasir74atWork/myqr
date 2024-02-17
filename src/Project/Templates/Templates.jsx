import { Box } from '@mui/material';
import React from 'react';
import { ImportStats } from '../GlobelStats/GlobelStats';

const Templates = () => {
  const { isMobile } = ImportStats()
  return <Box className="container mobile-mr-t-20">
   <div
      className="types-of-qr-container"
      style={{ width: isMobile ? "100%" : "" }}
    >
      
        <div
          className={isMobile ? "container-custom-mobile" : "container-custom"}
        >
          <div className="flex-col">
            <div className="heading-container">
              <span className="heading-2">Generate Static QR</span>{" "}
              <span className="heading-tag">without tracking</span>
            </div>
            <div className="grid-container">
              
            </div>
            <br/>
            </div>
        </div>
   </div>
 </Box>;
}

export default Templates