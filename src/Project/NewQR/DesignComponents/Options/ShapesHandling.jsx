import React, { useState } from "react";
import { Divider } from "@mui/material";
import style1 from '../../../../Assets/Shapes/dotsstyle/1.svg'
import style2 from '../../../../Assets/Shapes/dotsstyle/2.svg'
import style3 from '../../../../Assets/Shapes/dotsstyle/3.svg'
import style4 from '../../../../Assets/Shapes/dotsstyle/4.svg'
import style5 from '../../../../Assets/Shapes/dotsstyle/5.svg'
import style6 from '../../../../Assets/Shapes/dotsstyle/6.svg'

import corner1 from '../../../../Assets/Shapes/1.svg'
import corner2 from '../../../../Assets/Shapes/2.svg'
import corner3 from '../../../../Assets/Shapes/3.svg'
import corner4 from '../../../../Assets/Shapes/4.svg'
import corner5 from '../../../../Assets/Shapes/5.svg'
import corner6 from '../../../../Assets/Shapes/6.svg'


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
    { style: style2, type: 'dots' },
    { style: style3, type: 'classy' },
    { style: style4, type: 'classy-rounded' },
    { style: style5, type: 'square' },
    { style: style6, type: 'extra-rounded' }
  ];
  const cornerStyles = [
    { style: corner1, type: 'dot' },
    { style: corner2, type: 'square' },
    { style: corner3, type: 'extra-rounded' },

   ];
   const cornerDotStyles = [
    { style: corner4, type: 'dot' },
    { style: corner5, type: 'square' },

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
           <img src={src.style} alt={`logo1 ${index + 1}`} className={`logo1 ${selectedDots === src.type ? "selected" : ""}`} onClick={() => handleClickDots(src.type)} key={index}/>
            
          ))}
        </div>
        <Divider />
        <div className="block heading-3">Corner Styles</div>
        <div className="logo-container">
          {cornerStyles.map((src, index) => (
          <img key={index} onClick={() => handleClickCorner(src.type)} src={src.style} alt={`logo1 ${index + 1}`} className={`logo1 ${selectedCorner === src.type ? "selected" : ""}`}/>
          ))}
        </div>
        <Divider />
        <div className="block heading-3">Corner Center Styles</div>
        <div className="logo-container">
          {cornerDotStyles.map((src, index) => (
            <div className={`logo1 ${selectedCenter === src.type ? "selected" : ""}`}>
            <img key={index}  onClick={() => handleClickCornerDots(src.type)} src={src.style} alt={`logo1 ${index + 1}`} style={{width:'100%', height:'100%'}}/></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShapesHandling;
