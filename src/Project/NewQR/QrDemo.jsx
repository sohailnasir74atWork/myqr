import * as React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import mobileFrame from "../../Assets/mobileFrame.webp";
import QrGenerator from "./QrGenerator/QrGenerator";
import './newqrStyle.css'

export default function QrDemo({ prop }) {
  const { qrCodeSettings } = prop;
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className="demo-container" >
      <div className="types-of-qr-mobile-demo">
        <div className="heading-container" style={{ width: "100%" }}>
          <span className="heading-2 center">Preview</span>
        </div>
        <div className="mobile-frame">
         <div className="demo-preview">
            {" "}
            <QrGenerator prop={{ qrCodeSettings }} />
          </div>
        </div>
      </div>
    </div>
  );
}