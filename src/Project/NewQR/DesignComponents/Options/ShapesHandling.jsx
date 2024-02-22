import React, { useState } from "react";
import { Divider } from "@mui/material";
import style1 from "../../../../Assets/Shapes/style1.svg";
import corner1 from "../../../../Assets/Shapes/corner1.svg"
import cornerDot1 from "../../../../Assets/Shapes/cornerDot1.svg"
import "./optionsStyles.css";
import { ImportStats } from "../../../GlobelStats/GlobelStats";

const ShapesHandling = () => {
  const { setQrCodeSettings, qrCodeSettings, isMobile } = ImportStats();
  const [selectedDots, setSelectedDots] = useState(qrCodeSettings.types.dots.type);
  const [selectedCorner, setSelectedCorner] = useState(qrCodeSettings.types.corner.type);
  const [selectedCenter, setSelectedCenter] = useState(qrCodeSettings.types.cornerDots.type); 
 
 

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
    setSelectedDots(type)
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
    setSelectedCorner(type)
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
    setSelectedCenter(type)
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
        <div className="logo-container">
          {dotStyles.map((src, index) => (
           <img src={src.style} alt={`logo ${index + 1}`} className={`logo ${selectedDots === src.type ? "selected" : ""}`} onClick={() => handleClickDots(src.type)} key={index}/>
            
          ))}
        </div>
        <Divider />
        <div className="block heading-3">Corner Styles</div>
        <div className="logo-container">
          {cornerStyles.map((src, index) => (
          <img key={index} onClick={() => handleClickCorner(src.type)} src={src.style} alt={`Image ${index + 1}`} className={`logo ${selectedCorner === src.type ? "selected" : ""}`}/>
          ))}
        </div>
        <Divider />
        <div className="block heading-3">Corner Center Styles</div>
        <div className="logo-container">
          {cornerDotStyles.map((src, index) => (
            <img key={index}  onClick={() => handleClickCornerDots(src.type)} src={src.style} alt={`Image ${index + 1}`} className={`logo ${selectedCenter === src.type ? "selected" : ""}`}/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShapesHandling;
