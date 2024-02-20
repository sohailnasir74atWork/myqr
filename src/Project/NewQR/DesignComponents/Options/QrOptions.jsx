import React, { useEffect, useState } from "react";
import { Slider, Box } from "@mui/material";
import { ImportStats } from "../../../GlobelStats/GlobelStats";

const correctionMarks = [
  { value: 0, label: 'L' },
  { value: 33, label: 'M' },
  { value: 66, label: 'S' },
  { value: 100, label: 'H' },
];

const QrOptions = () => {
  const { setQrCodeSettings, qrCodeSettings, isMobile } = ImportStats();
  const [size, setSize] = useState(qrCodeSettings.size.width);
  const [margin, setMargin] = useState(qrCodeSettings.margin);
  const [correction, setCorrection] = useState(
    correctionMarks.find((mark) => mark.label === qrCodeSettings.correction).value
  );

  useEffect(() => {
    setCorrection(
      correctionMarks.find((mark) => mark.label === qrCodeSettings.correction).value
    );
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
    let newCorrection;
    if (newValue === 0) {
      newCorrection = 'L';
    } else if (newValue <= 33) {
      newCorrection = 'M';
    } else if (newValue <= 66) {
      newCorrection = 'S';
    } else if (newValue <= 100) {
      newCorrection = 'H';
    }

    setCorrection(newCorrection);
    setQrCodeSettings({
      ...qrCodeSettings,
      correction: newCorrection,
    });
};


  return (
    <Box sx={{ width: 300 }}>
      <div style={{ display: 'flex', marginBottom: '10px' }}>
        <div style={{ marginRight: '20px' }}>Adjust Width</div>
        <div>{size} x {size}</div>
      </div>
      <Slider
        value={size}
        onChange={handleSizeChange}
        aria-labelledby="size-slider"
        valueLabelDisplay="auto"
        min={30}
        max={1000}
      />
      <br />
      <div style={{ display: 'flex', marginBottom: '10px' }}>
        <div style={{ marginRight: '20px' }}>Adjust Padding</div>
        <div>{margin}px</div>
      </div>
      <Slider
        value={margin}
        onChange={handleMarginChange}
        aria-labelledby="margin-slider"
        valueLabelDisplay="auto"
        min={0}
        max={20}
      />
      <br />
      <Slider
        value={correction}
        onChange={handleCorrectionChange}
        aria-labelledby="correction-slider"
        valueLabelDisplay="auto"
        step={1}
        marks={correctionMarks}
        min={0}
        max={100}
      />
    </Box>
  );
};

export default QrOptions;
