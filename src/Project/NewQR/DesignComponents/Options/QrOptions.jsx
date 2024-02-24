import React, { useEffect, useState } from "react";
import { Slider, Box } from "@mui/material";
import { ImportStats } from "../../../GlobelStats/GlobelStats";

const correctionMarks = [
  { value: 0, label: 'L' },
  { value: 33, label: 'M' },
  { value: 66, label: 'Q' },
  { value: 100, label: 'H' },
];

const QrOptions = () => {
  const { setQrCodeSettings, qrCodeSettings, isMobile } = ImportStats();
  const [size, setSize] = useState(qrCodeSettings.size.width);
  const [margin, setMargin] = useState(qrCodeSettings.margin);
  const [correction, setCorrection] = useState(() => {
    const foundMark = correctionMarks.find(mark => mark.label === qrCodeSettings.correction);
    return foundMark ? foundMark.value : 0;
  });
  
  useEffect(() => {
    const foundMark = correctionMarks.find((mark) => mark.label === qrCodeSettings.correction);
    setCorrection(foundMark ? foundMark.value : 0);
    setMargin(qrCodeSettings.margin);
    setSize(qrCodeSettings.size.width);
  }, [qrCodeSettings]);

  const handleSizeChange = (_, newValue) => {
    setSize(newValue);
    setQrCodeSettings({
      ...qrCodeSettings,
      size: { width: newValue, height: newValue },
    });
  };

  const handleMarginChange = (_, newValue) => {
    setMargin(newValue);
    setQrCodeSettings({
      ...qrCodeSettings,
      margin: newValue,
    });
  };

  const handleCorrectionChange = (_, newValue) => {
    const newCorrection = correctionMarks.reduce((acc, curr) => (newValue >= curr.value ? curr.label : acc), 'L');
    setCorrection(newValue); // Update local state immediately for responsive UI
    setQrCodeSettings({
      ...qrCodeSettings,
      correction: newCorrection,
    });
  };

  return (
    <Box sx={{ maxWidth: '400px' }} className={isMobile ? "option-container-home p-v-15 accordion-open" : "p-v-15 accordion-open"}>
      <div>Adjust Size</div>
      <div style={{ display: 'flex', marginBottom: '10px', }}>
      <Slider
        value={size}
        onChange={handleSizeChange}
        aria-labelledby="size-slider"
        valueLabelDisplay="auto"
        min={100}
        max={1000}
      />
      <div style={{marginLeft:'20px', width:'150px', display:'flex', alignItems:'center'}}>{`${size}px  *  ${size}px`}</div>
      </div>
      <div style={{ display: 'flex', marginBottom: '10px' , alignItems:'center'}}>
      <div>Adjust Padding</div>
      </div>
      <div style={{ display: 'flex', marginBottom: '10px', }}>
      <Slider
        value={margin}
        onChange={handleMarginChange}
        aria-labelledby="margin-slider"
        valueLabelDisplay="auto"
        min={0}
        max={100}
      />
      <div style={{marginLeft:'20px', width:'150px', display:'flex', alignItems:'center'}}>{`${margin}px`}</div>
      </div>
      <div style={{ display: 'flex', marginBottom: '10px' , alignItems:'center'}}>
      <div>Adjust QR Error Correction</div>
      </div>
      <div style={{ display: 'flex', marginBottom: '10px' , alignItems:'center'}}>
      <Slider
        value={correction}
        onChange={handleCorrectionChange}
        aria-labelledby="correction-slider"
        valueLabelDisplay="auto"
        step={1}
        // marks={correctionMarks}
        min={0}
        max={100}
      />
        <div style={{marginLeft:'20px', width:'150px', display:'flex', alignItems:'center'}}>{qrCodeSettings.correction === 'L' ? 'LOW': (qrCodeSettings.correction === 'M' ?  'Medium' : (qrCodeSettings.correction === 'Q' ?  'Standard' : qrCodeSettings.correction === 'H' ?  'High' : '') )}</div>
      </div>
    </Box>
  );
};

export default QrOptions;
