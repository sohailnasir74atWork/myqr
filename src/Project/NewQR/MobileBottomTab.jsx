import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import FaceRetouchingNaturalIcon from "@mui/icons-material/FaceRetouchingNatural";
import CropOriginalIcon from "@mui/icons-material/CropOriginal";
import { ImportStats } from "../GlobelStats/GlobelStats";
import ColorHandling from "./DesignComponents/Options/ColorHandling";
import ShapesHandling from "./DesignComponents/Options/ShapesHandling";
import LogoHandling from "./DesignComponents/Options/LogoHandling";
import QrGenerator from "./QrGenerator/QrGenerator";
import { AspectRatio } from "@mui/icons-material";
import QrOptions from "./DesignComponents/Options/QrOptions";
import Stats from "../Stats/Stats";
import IframeStepper from "../Iframe/IframeStepper";

// Define your options array here
const options = [
  { label: "Colors", icon: <ColorLensIcon /> },
  { label: "Shapes", icon: <DashboardCustomizeIcon /> },
  { label: "Logo", icon: <FaceRetouchingNaturalIcon /> },
  { label: "Size", icon: <AspectRatio /> },
  { label: "Frames", icon: <CropOriginalIcon /> },
  ];

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default function MobileBottomTab() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const {     qrCodeSettings,
    setQrCodeSettings,
    isMobile,
    iframe
 } = ImportStats();
  const designCard = [
    <ColorHandling prop={{ qrCodeSettings, setQrCodeSettings, isMobile }} />,
    <ShapesHandling prop={{ qrCodeSettings, setQrCodeSettings, isMobile }} />,
    <LogoHandling prop={{ qrCodeSettings, setQrCodeSettings, isMobile }} />,
    <QrOptions prop={{ qrCodeSettings, setQrCodeSettings, isMobile }} />,
    <Stats prop={{ qrCodeSettings, setQrCodeSettings, isMobile }} />,

  ];

  const handleChangeIndex = (index) => {
    setValue(index);
  };
  const liveDemo = true;

  return (
    <Box
    sx={{
      width: "100%",
      maxWidth: 500,
      position: "relative",
      margin: "auto",
      height: "100%",
      backgroundColor: iframe ? "#EFF7FB" : ""
    }}
    >
     {value !== 4 && <div className="live-demo-container">
     {iframe  && <div style={{padding:'0px 20px 10px 20px', marginTop:'-10px'}}><IframeStepper/></div>}
        <QrGenerator prop={{ qrCodeSettings, liveDemo }} />
      </div>}
      <div
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        {designCard.map((option, index) => (
          <TabPanel
            value={value}
            index={index}
            key={index}
            dir={theme.direction}
          >
            {option}
          </TabPanel>
        ))}
      </div>
      <Paper
        sx={{ position: "fixed", bottom: 0, paddingLeft: iframe ?  20 : 0, paddingRight: iframe ?  20 : 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          {options.map((option, index) => (
            <BottomNavigationAction
              key={option.label}
              label={option.label}
              icon={option.icon}
            />
          ))}
        </BottomNavigation>
      </Paper>
    </Box>
  );
}