import * as React from "react";
import QrGenerator from "./QrGenerator/QrGenerator";
import './newqrStyle.css'
import { useNavigate, useLocation } from "react-router-dom";

export default function QrDemo({ prop }) {
  const { qrCodeSettings } = prop;
  const location = useLocation();
  const iframe = location.pathname.includes('iframe')


  const heading = () => {
    const path = location.pathname.toLowerCase();
    
    if (path.includes('input') || path.includes('design')) {
      return `QR Code for ${qrCodeSettings.type}`;
    } else if (path.includes('create')) {
      return 'Preview';
    } 
  }

  return (
    <div className="demo-container">
      <div className={iframe ? 'types-of-qr-mobile-demo-iframe' : 'types-of-qr-mobile-demo'}>
        <div className="heading-container" style={{ width: "100%" }}>
          <span className="heading-2 center">{heading()}</span>
        </div>
        <div className="mobile-frame">
          <div className="demo-preview">
            <QrGenerator prop={{ qrCodeSettings }} />
          </div>
        </div>
      </div>
    </div>
  );
}
