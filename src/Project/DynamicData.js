import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import AlarmIcon from "@mui/icons-material/Alarm";
import FaceIcon from "@mui/icons-material/Face";
import BuildIcon from "@mui/icons-material/Build";
import WifiIcon from "@mui/icons-material/Wifi";
import BatteryChargingFullIcon from "@mui/icons-material/BatteryChargingFull";
import BluetoothIcon from "@mui/icons-material/Bluetooth";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import ColorLensIcon from "@mui/icons-material/ColorLens"; // Corrected
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize"; // Corrected
import Face4Icon from "@mui/icons-material/Face"; // Corrected
import CropOriginalIcon from "@mui/icons-material/CropOriginal"; // Corrected
import call from "../Assets/icons/call.svg";
import Text from "../Assets/icons/text.svg";
import SMS from "../Assets/icons/sms.svg";
import Email from "../Assets/icons/email.svg";
import Link from "../Assets/icons/web.svg";
import Paypal from "../Assets/icons/paypal.svg";
import VCard from "../Assets/icons/vcard.svg";
import WhatsApp from "../Assets/icons/whatsapp.svg";
import Wifi from "../Assets/icons/wifi.svg";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import BurstModeIcon from "@mui/icons-material/BurstMode";
import QrCodeIcon from "@mui/icons-material/QrCode";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import PieChartIcon from '@mui/icons-material/PieChart';
export const sideBar = [
  { id: "new-qr", heading: "New QR", icon: <ControlPointIcon />, path: '/create' },
  { id: "bulk-qr-generator", heading: "Bulk QR Generator", icon: <BurstModeIcon />, path: '/generate-bulk' },
  { id: "templates", heading: "Templates", icon: <DesignServicesIcon />, path: '/templates' },
  { id: "my-qr-codes", heading: "My QR Codes", icon: <QrCodeIcon />, path: '/myqr' },
  { id: "my-qr-codes", heading: "Statistics", icon: <PieChartIcon />, path: '/stats' },

];

export const dymanicTools = [
  { icon: <HomeIcon />, heading: "Links", text: "This is the text for Home" },
  {
    icon: <SettingsIcon />,
    heading: "Text",
    text: "This is the text for Settings",
  },
  { icon: <AlarmIcon />, heading: "Alarm", text: "This is the text for Alarm" },
  {
    icon: <FaceIcon />,
    heading: "Profile",
    text: "This is the text for Profile",
  },
  { icon: <BuildIcon />, heading: "Tools", text: "This is the text for Tools" },
  { icon: <WifiIcon />, heading: "WiFi", text: "This is the text for WiFi" },
  {
    icon: <BatteryChargingFullIcon />,
    heading: "Battery",
    text: "This is the text for Battery",
  },
  {
    icon: <BluetoothIcon />,
    heading: "Bluetooth",
    text: "This is the text for Bluetooth",
  },
  {
    icon: <CameraAltIcon />,
    heading: "Camera",
    text: "This is the text for Camera",
  },
  {
    icon: <DirectionsBikeIcon />,
    heading: "Bike",
    text: "This is the text for Bike",
  },
];

export const staticTools = [
  { icon: <img src={Link} alt="Link" class='img-static'/>, heading: "Link", text: "Open a URL" },
  { icon: <img src={Text} alt="Text" class='img-static'/>, heading: "Text", text: "Shows Text" },
  {
    icon: <img src={Wifi} alt="Wifi" class='img-static'/>,
    heading: "Wi-Fi",
    text: "Connects to a WiFi",
  },
  {
    icon: <img src={Email} alt="Email" class='img-static'/>,
    heading: "Email",
    text: "Send an Email with a Pre-Written Message",
  },
  {
    icon: <img src={VCard} alt="VCard" class='img-static'/>,
    heading: "V-Card",
    text: "Saves your Contect Details",
  },
  {
    icon: <img src={WhatsApp} alt="WhatsApp"class='img-static' />,
    heading: "WhatsApp",
    text: "Send a WhatsApp Message",
  },
  { icon: <img src={call} alt="call" class='img-static'/>, heading: "Call", text: "Make a Call" },
  {
    icon: <img src={SMS} alt="SMS" class='img-static'/>,
    heading: "SMS",
    text: "Send a Text Message",
  },
  {
    icon: <img src={Paypal} alt="Paypal" class='img-static'/>,
    heading: "PayPal",
    text: "Generate PayPal Transaction",
  },
];

export const options = [
  { label: "colors", icon: <ColorLensIcon /> },
  { label: "shapes", icon: <DashboardCustomizeIcon /> },
  { label: "log", icon: <Face4Icon /> }, 
  { label: "frams", icon: <CropOriginalIcon /> },
];
