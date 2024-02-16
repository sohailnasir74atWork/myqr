import React from "react";
import { Divider } from "@mui/material";
import style1 from "../../../../Assets/Shapes/style1.svg";
import corner1 from "../../../../Assets/Shapes/corner1.svg"
import cornerDot1 from "../../../../Assets/Shapes/cornerDot1.svg"
import "./optionsStyles.css";
import { ImportStats } from "../../../GlobelStats/GlobelStats";

const ShapesHandling = () => {
  const { setQrCodeSettings, qrCodeSettings, isMobile } = ImportStats();
  // console.log(qrCodeSettings)

  // Array of image sources
  const dotStyles = [
    { style: style1, type: 'rounded' },
    { style: style1, type: 'dots' },
    { style: style1, type: 'classy' },
    { style: style1, type: 'classy-rounded' },
    { style: style1, type: 'square' },
    { style: style1, type: 'extra-rounded' }
  ];
  const cornerStyles = [
    { style: corner1, type: 'dot' },
    { style: corner1, type: 'square' },
    { style: corner1, type: 'extra-rounded' },

   ];
   const cornerDotStyles = [
    { style: cornerDot1, type: 'dot' },
    { style: cornerDot1, type: 'square' },

   ];

  // Function to handle click
  const handleClickDots = (type) => {
    setQrCodeSettings({
      ...qrCodeSettings,
      types: {
        ...qrCodeSettings.types,
        dots: {
          ...qrCodeSettings.types.dots,
          type: type,
        },
      },
    });
  };
  
  const handleClickCorner = (type) => {
    setQrCodeSettings({
      ...qrCodeSettings,
      types: {
        ...qrCodeSettings.types,
        corner: {
          ...qrCodeSettings.types.corner,
          type: type,
        },
      },
    });
  };
  const handleClickCornerDots = (type) => {
    setQrCodeSettings({
      ...qrCodeSettings,
      types: {
        ...qrCodeSettings.types,
        cornerDots: {
          ...qrCodeSettings.types.cornerDots,
          type: type,
        },
      },
    });
  };
  return (
<div className={ isMobile ? "option-container-home p-v-15 accordion-open" : "p-v-15 accordion-open"}> 
     <div className="accordion-content">
        <div className="block heading-3">Dots Styles</div>
        <div className="image-list">
          {dotStyles.map((src, index) => (
            <div
              key={index}
              className="image-container"
              onClick={() => handleClickDots(src.type)}
            >
              <img src={src.style} alt={`Image ${index + 1}`} />
            </div>
          ))}
        </div>
        <Divider />
        <div className="block heading-3">Corner Styles</div>
        <div className="image-list">
          {cornerStyles.map((src, index) => (
            <div
              key={index}
              className="image-container"
              onClick={() => handleClickCorner(src.type)}
            >
              <img src={src.style} alt={`Image ${index + 1}`} />
            </div>
          ))}
        </div>
        <Divider />
        <div className="block heading-3">Corner Center Styles</div>
        <div className="image-list">
          {cornerDotStyles.map((src, index) => (
            <div
              key={index}
              className="image-container"
              onClick={() => handleClickCornerDots(src.type)}
            >
              <img src={src.style} alt={`Image ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShapesHandling;
