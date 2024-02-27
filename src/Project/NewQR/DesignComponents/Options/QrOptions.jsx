import React, { useEffect, useState } from "react";
import { Slider, Box } from "@mui/material";
import { ImportStats } from "../../../GlobelStats/GlobelStats";

const QrOptions = () => {
  const { setQrCodeSettings, qrCodeSettings, isMobile } = ImportStats();
  const [size, setSize] = useState(qrCodeSettings.size.width);
  const [margin, setMargin] = useState(qrCodeSettings.margin);
  const [correction, setCorrection] = useState(() => {
    return qrCodeSettings.correction === 'L' ? 0 :
      qrCodeSettings.correction === 'M' ? 33 :
      qrCodeSettings.correction === 'Q' ? 66 :
      qrCodeSettings.correction === 'H' ? 100 : 0;
  });

  useEffect(() => {
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
    let newCorrection = 'L';

    if (newValue >= 26 && newValue <= 50) {
      newCorrection = 'M';
    } else if (newValue >= 51 && newValue <= 75) {
      newCorrection = 'Q';
    } else if (newValue > 75) {
      newCorrection = 'H';
    }

    setCorrection(newValue); // Update local state immediately for responsive UI
    setQrCodeSettings({
      ...qrCodeSettings,
      correction: newCorrection,
    });
  };

  return (
    <Box sx={{ maxWidth: '500px' }} className={isMobile ? "option-container-home p-v-15 accordion-open" : "p-v-15 accordion-open"}>
      <div>Adjust Size</div>
      <div style={{ display: 'flex', marginBottom: '10px' }}>
        <Slider
          value={size}
          onChange={handleSizeChange}
          aria-labelledby="size-slider"
          valueLabelDisplay="auto"
          min={100}
          max={1000}
        />
        <div style={{ marginLeft: '20px', width: '150px', display: 'flex', alignItems: 'center' }}>{`${size}px  *  ${size}px`}</div>
      </div>
      <div style={{ display: 'flex', marginBottom: '10px', alignItems: 'center' }}>
        <div>Adjust Padding</div>
      </div>
      <div style={{ display: 'flex', marginBottom: '10px' }}>
        <Slider
          value={margin}
          onChange={handleMarginChange}
          aria-labelledby="margin-slider"
          valueLabelDisplay="auto"
          min={0}
          max={100}
        />
        <div style={{ marginLeft: '20px', width: '150px', display: 'flex', alignItems: 'center' }}>{`${margin}px`}</div>
      </div>
      <div style={{ display: 'flex', marginBottom: '10px', alignItems: 'center' }}>
        <div>Adjust QR Error Correction</div>
      </div>
      <div style={{ display: 'flex', marginBottom: '10px', alignItems: 'center' }}>
        <Slider
          value={correction}
          onChange={handleCorrectionChange}
          aria-labelledby="correction-slider"
          valueLabelDisplay="auto"
          step={1}
          min={0}
          max={100}
        />
        <div style={{ marginLeft: '20px', width: '150px', display: 'flex', alignItems: 'center' }}>{correction < 25 ? 'LOW' : (correction >= 25 && correction < 50 ? 'Medium' : (correction >= 50 && correction < 75 ? 'Standard' : (correction >= 75 && correction <= 100 ? 'High' : '')))}
</div>
      </div>
    </Box>
  );
};

export default QrOptions;
