import React, { useEffect, useState } from "react";
import { Slider, Box } from "@mui/material";
import { ImportStats } from "../../../GlobelStats/GlobelStats";

const correctionMarks = [
  { value: 0, label: 'L' }, // Low
  { value: 33, label: 'M' }, // Medium
  { value: 66, label: 'Q' }, // Quartile (Corrected from 'S' to 'Q')
  { value: 100, label: 'H' }, // High
];

const QrOptions = () => {
  const { setQrCodeSettings, qrCodeSettings, isMobile } = ImportStats();
  const [size, setSize] = useState(qrCodeSettings.size.width);
  const [margin, setMargin] = useState(qrCodeSettings.margin);
  const [correction, setCorrection] = useState(
    correctionMarks.find((mark) => mark.label === qrCodeSettings.correction)?.value || 0
  );

  useEffect(() => {
    // Find the correction value instead of label to match the slider value
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
    // Adjust the logic to match the correct value ranges for L, M, Q, H
    const newCorrection = correctionMarks.reduce((acc, curr) => newValue >= curr.value ? curr.label : acc, 'L');

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
        max={100}
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
