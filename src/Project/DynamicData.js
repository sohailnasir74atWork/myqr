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
import App from "../Assets/icons/app.svg";
import Pro from "../Assets/icons/Pro.svg";
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
import video from "../Assets/icons/video.svg"
import business from "../Assets/icons/business.svg"
import coupon from "../Assets/icons/coupon.svg"
import events from "../Assets/icons/events.svg"
import feedback from "../Assets/icons/feedback.svg"
import image from "../Assets/icons/image.svg"
import imagegallery from "../Assets/icons/imagegallery.svg"
import landingpage from "../Assets/icons/landingpage.svg"
import listlinks from "../Assets/icons/listlinks.svg"
import menu from "../Assets/icons/menu.svg"
import mp3 from "../Assets/icons/mp3.svg"
import pdf from "../Assets/icons/pdf.svg"
import playlist from "../Assets/icons/playlist.svg"



import logo1 from '../Assets/defaultlogo/logo (1).svg';
import logo2 from '../Assets/defaultlogo/logo (2).svg';
import logo3 from '../Assets/defaultlogo/logo (3).svg';
import logo4 from '../Assets/defaultlogo/logo (4).svg';
import logo5 from '../Assets/defaultlogo/logo (5).svg';
import logo6 from '../Assets/defaultlogo/logo (6).svg';
import logo7 from '../Assets/defaultlogo/logo (7).svg';
import logo8 from '../Assets/defaultlogo/logo (8).svg';
import logo9 from '../Assets/defaultlogo/logo (9).svg';
import logo10 from '../Assets/defaultlogo/logo (10).svg';
import logo11 from '../Assets/defaultlogo/logo (11).svg';
import logo12 from '../Assets/defaultlogo/logo (12).svg';
import logo13 from '../Assets/defaultlogo/logo (13).svg';
import logo14 from '../Assets/defaultlogo/logo (14).svg';
import logo15 from '../Assets/defaultlogo/logo (15).svg';
import logo16 from '../Assets/defaultlogo/logo (16).svg';
import logo17 from '../Assets/defaultlogo/logo (17).svg';
import logo18 from '../Assets/defaultlogo/logo (18).svg';
import logo19 from '../Assets/defaultlogo/logo (19).svg';
import logo20 from '../Assets/defaultlogo/logo (20).svg';
import logo21 from '../Assets/defaultlogo/logo (21).svg';
import logo22 from '../Assets/defaultlogo/logo (22).svg';
import logo23 from '../Assets/defaultlogo/logo (23).svg';
import logo24 from '../Assets/defaultlogo/logo (24).svg';
import logo25 from '../Assets/defaultlogo/logo (25).svg';
import logo26 from '../Assets/defaultlogo/logo (26).svg';
import logo27 from '../Assets/defaultlogo/logo (27).svg';
import logo30 from '../Assets/defaultlogo/logo (30).svg';
import logo31 from '../Assets/defaultlogo/logo (31).svg';
import logo32 from '../Assets/defaultlogo/logo (32).svg';
import logo33 from '../Assets/defaultlogo/logo (33).svg';
import logo34 from '../Assets/defaultlogo/logo (34).svg';
import logo35 from '../Assets/defaultlogo/logo (35).svg';
import logo36 from '../Assets/defaultlogo/logo (36).svg';
import logo37 from '../Assets/defaultlogo/logo (37).svg';
import logo38 from '../Assets/defaultlogo/logo (38).svg';
import logo39 from '../Assets/defaultlogo/logo (39).svg';
import logo40 from '../Assets/defaultlogo/logo (40).svg';
import logo41 from '../Assets/defaultlogo/logo (41).svg';
import logo42 from '../Assets/defaultlogo/logo (42).svg';
import logo43 from '../Assets/defaultlogo/logo (43).svg';
import logo44 from '../Assets/defaultlogo/logo (44).svg';
import logo45 from '../Assets/defaultlogo/logo (45).svg';
import logo46 from '../Assets/defaultlogo/logo (46).svg';
import logo47 from '../Assets/defaultlogo/logo (47).svg';
import logo48 from '../Assets/defaultlogo/logo (48).svg';
import logo49 from '../Assets/defaultlogo/logo (1).png';
import logo50 from '../Assets/defaultlogo/logo (2).png';




import { AppBlockingTwoTone, Feed } from "@mui/icons-material";







export const sideBar = [
  { id: "new-qr", heading: "New QR", icon: <ControlPointIcon />, path: '/create' },
  { id: "templates", heading: "Templates", icon: <DesignServicesIcon />, path: '/templates' },
  { id: "bulk-qr-generator", heading: "Bulk QR Generator", icon: <BurstModeIcon />, path: '/generate-bulk' },
  { id: "my-qr-codes", heading: "My QR Codes", icon: <QrCodeIcon />, path: '/myqr' },
  { id: "my-qr-codes", heading: "Statistics", icon: <PieChartIcon />, path: '/stats' },

];

export const dymanicTools = [
  { icon: <img src={Link} alt="Link" class='img-static'/>, heading: "Website", text: "Open a URL" },
  {
    icon: <img src={pdf} alt="Link" class='img-static'/>,
    heading: "PDF",
    text: "Show a PDF",
  },
 
  {
    icon: <img src={listlinks} alt="Link" class='img-static'/>,
    heading: "List of Links",
    text: "Group links",
  },
  { icon: <img src={imagegallery} alt="Link" class='img-static'/>, heading: "Image Gallery", text: "Show an image gallery" },
    {
    icon: <img src={video} alt="Link" class='img-static'/>,
    heading: "Video",
    text: "Show a vedio",
  },
  {
    icon: <img src={business} alt="Link" class='img-static'/>,
    heading: "Business",
    text: "Share information abut your business",
  },
  {
    icon: <img src={VCard} alt="Link" class='img-static'/>,
    heading: "VCard Plus",
    text: "Share contact details",
  },
  {
    icon: <img src={menu} alt="Link" class='img-static'/>,
    heading: "Menu",
    text: "Display menu of a resturant",
  },
  {
    icon: <img src={App} alt="Link" class='img-static'/>,
    heading: "Apps",
    text: "Redirect to an App store",
  },
  {
    icon: <img src={mp3} alt="Link" class='img-static'/>,
    heading: "MP3",
    text: "Play an audio file",
  },
  {
    icon: <img src={coupon} alt="Link" class='img-static'/>,
    heading: "Coupon",
    text: "Share a coupon",
  },
  {
    icon: <img src={feedback} alt="Link" class='img-static'/>,
    heading: "Feedback",
    text: "Colect feedback and get rated",
  },
  {
    icon: <img src={playlist} alt="Link" class='img-static'/>,
    heading: "Playlist",
    text: "Share your own music",
  },
  {
    icon: <img src={landingpage} alt="Link" class='img-static'/>,
    heading: "Landing Page",
    text: "Create your own page",
  },
  {
    icon: <img src={events} alt="Link" class='img-static'/>,
    heading: "Events",
    text: "Promote or share an event",
  },
  {
    icon: <img src={image} alt="Link" class='img-static'/>,
    heading: "2D Barcodes",
    text: "Support GS1 standrd",
  },
];

export const staticTools = [
  { icon: <img src={Link} alt="Link" class='img-static' loading="lazy"/>, heading: "Link", text: "Open a URL" },
  { icon: <img src={Text} alt="Text" class='img-static' loading="lazy"/>, heading: "Text", text: "Shows Text" },
  {
    icon: <img src={Email} alt="Email" class='img-static' loading="lazy"/>,
    heading: "Email",
    text: "Send an Email with a Pre-Written Message",
  },
  {
    icon: <img src={VCard} alt="VCard" class='img-static' loading="lazy"/>,
    heading: "V-Card",
    text: "Saves your Contect Details",
  },
  {
    icon: <img src={WhatsApp} alt="WhatsApp"class='img-static' loading="lazy" />,
    heading: "WhatsApp",
    text: "Send a WhatsApp Message",
  },
  { icon: <img src={call} alt="call" class='img-static' loading="lazy"/>, heading: "Call", text: "Make a Call" },
  {
    icon: <img src={Wifi} alt="Wifi" class='img-static' loading="lazy"/>,
    heading: "Wi-Fi",
    text: "Connects to a WiFi",
  },
  {
    icon: <img src={SMS} alt="SMS" class='img-static' loading="lazy"/>,
    heading: "SMS",
    text: "Send a Text Message",
  },
  {
    icon: <img src={App} alt="APP" class='img-static' loading="lazy"/>,
    heading: "APP",
    text: "Download Mobile App",
  },
  // {
  //   icon: <img src={Paypal} alt="Paypal" class='img-static'/>,
  //   heading: "PayPal",
  //   text: "Generate PayPal Transaction",
  // },
];

export const options = [
  { label: "colors", icon: <ColorLensIcon /> },
  { label: "shapes", icon: <DashboardCustomizeIcon /> },
  { label: "log", icon: <Face4Icon /> }, 
  { label: "frams", icon: <CropOriginalIcon /> },
];


export const logos = [
  logo1,
  logo2,
  logo3,
  logo4,
  logo5,
  logo6,
  logo7,
  logo8,
  logo9,
  logo10,
  logo11,
  logo12,
  logo13,
  logo14,
  logo15,
  logo16,
  logo17,
  logo18,
  logo19,
  logo20,
  logo21,
  logo22,
  logo23,
  logo24,
  logo25,
  logo26,
  logo27,
  logo30,
  logo31,
  logo32,
  logo33,
  logo34,
  logo35,
  logo36,
  logo37,
  logo38,
  logo39,
  logo40,
  logo41,
  logo42,
  logo43,
  logo44,
  logo45,
  logo46,
  logo47,
  logo48,
  logo49,
  logo50,
];
