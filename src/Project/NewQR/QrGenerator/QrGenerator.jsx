import React, { useEffect, useRef, useState } from "react";
import QRCodeStyling from "qr-code-styling";
import qrPlaceHolder from "../../../Assets/qrPlaceHolder.svg";
import { Button } from "@mui/material";
import { parseLinearGradient } from "./gradientParser";
import './qrgeneratorStyle.css'
import { ImportStats } from "../../GlobelStats/GlobelStats";
import animation from "../../../Assets/animation.json"
import Lottie from "react-lottie";
import DownloadOnMobile from "./DownloadOnMobile";
const QrGenerator = ({ prop }) => {
  const { liveDemo, template } = prop;
  const {qrCodeSettings} = ImportStats()
  const [isLoading, setIsLoading] = useState(false);
  const [qrCode, setQrCode] = useState(null);
  const [qrDataLocal, setQrDataLocal]= useState()
  const canvasRef = useRef(null);
  const img = qrDataLocal?.logo;
  console.log(qrDataLocal)
  let qrData = '';
if (qrDataLocal?.inputData.url.value) {
    qrData = qrDataLocal?.inputData.url.value;
}
else if (qrDataLocal?.inputData.text.value) {
    qrData = qrDataLocal?.inputData.text.value;
}
if (qrDataLocal?.inputData.app.value) {
  const appUrl = qrDataLocal.inputData.app.value;
  if (appUrl.includes("play.google.com")) {
    qrData = appUrl;
  } else if (appUrl.includes("apps.apple.com")) {
    qrData = appUrl;
  } else {
    console.log("URL does not appear to be for Play Store or App Store:", appUrl);
    qrData = appUrl; // Or handle differently as needed
  }
}

else if (qrDataLocal?.inputData.mail.email && qrDataLocal?.inputData.mail.message) {
    qrData = `mailto:${qrDataLocal?.inputData.mail.email}?body=${encodeURIComponent(qrDataLocal?.inputData.mail.message)}`;
}
else if (qrDataLocal?.inputData.whatsapp.number && qrDataLocal?.inputData.whatsapp.message) {
    const encodedMessage = encodeURIComponent(qrDataLocal?.inputData.whatsapp.message);
    qrData = `https://wa.me/${qrDataLocal?.inputData.whatsapp.number}?text=${encodedMessage}`;
}
else if (qrDataLocal?.inputData.message.number && qrDataLocal?.inputData.message.message) {
  const encodedMessage = encodeURIComponent(qrDataLocal?.inputData.message.message);
  qrData = `sms:${qrDataLocal?.inputData.message.number}?body=${encodedMessage}`;
}
else if (qrDataLocal?.inputData.call.number) {
  qrData = `tel:${qrDataLocal?.inputData.call.number}`;
}
else if (
  qrDataLocal?.inputData.wifi.networkName &&
  qrDataLocal?.inputData.wifi.networkType &&
  qrDataLocal?.inputData.wifi.password
) {
  const { networkName, networkType, password, isHide } = qrDataLocal?.inputData.wifi;

  let wifiEncryptionType = '';
  switch (networkType.toLowerCase()) {
    case 'none':
      wifiEncryptionType = 'nopass';
      break;
    case 'wep':
      wifiEncryptionType = 'WEP';
      break;
    case 'wpa/wpa2':
      wifiEncryptionType = 'WPA';
      break;
    // Add more cases as needed
    default:
      wifiEncryptionType = '';
  }

  // Construct the Wi-Fi QR code data
  qrData = `WIFI:T:${wifiEncryptionType};S:${networkName};P:${password};;`;
} else if  (qrDataLocal?.inputData.vcard.firstName) {
  const vcard = qrDataLocal?.inputData.vcard;
   qrData = `BEGIN:VCARD\nVERSION:3.0\n`;
  qrData += `FN:${vcard.firstName} ${vcard.lastName}\n`; // Full name
  if (vcard.email) qrData += `EMAIL:${vcard.email}\n`;
  if (vcard.phoneNumber) qrData += `TEL;TYPE=home,voice:${vcard.phoneNumber}\n`;
  if (vcard.mobile) qrData += `TEL;TYPE=cell,voice:${vcard.mobile}\n`;
  if (vcard.fax) qrData += `TEL;TYPE=fax:${vcard.fax}\n`;
  if (vcard.address) qrData += `ADR;TYPE=WORK:;;${vcard.address};${vcard.city};${vcard.postalCode};${vcard.country}\n`;
  if (vcard.company) qrData += `ORG:${vcard.company}\n`;
  if (vcard.jobTitle) qrData += `TITLE:${vcard.jobTitle}\n`;
  if (vcard.website) qrData += `URL:${vcard.website}\n`;

  qrData += `END:VCARD`;

}

useEffect(()=>{if(!template){setQrDataLocal(qrCodeSettings)} else {setQrDataLocal(template)}},[qrCodeSettings, template])

  useEffect(() => {
    // Dynamically determine the data for the QR code based on the available input data
    if (!qrData) {
      setIsLoading(false); // No loading if there's no data
      return;
    }
    if (qrData && canvasRef.current) {
      setIsLoading(true); // Start loading

      const canvasElement = canvasRef.current;
      // Clear the existing QR code canvas before appending a new one
      while (canvasElement.firstChild) {
        canvasElement.removeChild(canvasElement.firstChild);
      }
      
      // Parsing gradient colors
      const gradientBackground = parseLinearGradient(qrDataLocal.colors.background.color);
      const gradientBorder = parseLinearGradient(qrDataLocal.colors.square.color);
      const gradientQR = parseLinearGradient(qrDataLocal.colors.dots.color);
      const gradientCenter = parseLinearGradient(qrDataLocal.colors.cornerDots.color);
      console.log(qrDataLocal.colors.background.color)
      console.log(gradientBackground)

      // Generate a new QR code
      const newQrCode = new QRCodeStyling({
        width: qrDataLocal.size.width,
        height: qrDataLocal.size.height,
        data: qrData,
        image: img,
        margin: qrDataLocal?.margin,
        dotsOptions: {
          ...(qrDataLocal.colors.dots.isSolid
            ? { color: qrDataLocal.colors.dots.color }
            : {
                gradient: {
                  colorStops: gradientQR.stops,
                  type: '',
                  rotation: gradientQR.angle
                },
              }),
          type: qrDataLocal.types.dots.type,
        },
        backgroundOptions: {
          ...(qrDataLocal.colors.background.isSolid
            ? { color: qrDataLocal.colors.background.color }
            : {
                gradient: {
                  colorStops: gradientBackground.stops,
                  type: '',
                  rotation: gradientBackground.angle
                },
              }),
        },
        cornersSquareOptions: {
          ...(qrDataLocal.colors.square.isSolid
            ? { color: qrDataLocal.colors.square.color }
            : {
                gradient: {
                  colorStops: gradientBorder.stops,
                  type: '',
                  rotation: gradientBorder.angle
                },
              }),
          type: qrDataLocal.types.corner.type,
        },
        cornersDotOptions: {
          ...(qrDataLocal.colors.cornerDots.isSolid
            ? { color: qrDataLocal.colors.cornerDots.color }
            : {
                gradient: {
                  colorStops: gradientCenter.stops,
                  type: '',
                  rotation: gradientCenter.angle
                },
              }),
          type: qrDataLocal.types.cornerDots.type,
        },
        imageOptions: {
          crossOrigin: "anonymous",
          margin: qrDataLocal.logoSetting.margin,
          hideBackgroundDots: qrDataLocal?.logoSetting.backgrounddots,
        },
        qrOptions: {
          errorCorrectionLevel: qrDataLocal.correction,
        },

      });

      setQrCode(newQrCode);
      newQrCode.append(canvasElement);
      setIsLoading(false); // End loading

    }
  }, [qrDataLocal, canvasRef, qrData]); // Dependencies include qrCodeSettings and canvasRef to re-run the effect appropriately

  function handleDownloadClick(typeOfImg, qrName) {
    // console.log(typeOfImg, qrName)
    if (qrCode && qrCode.download) {
      qrCode
        .download({
          name: qrName,
          extension: typeOfImg,
        })
        .then(() => {})
        .catch((error) => {
          console.error("Error downloading QR code:", error);
        });
    }
  }
  const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: animation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <>
    <div className={liveDemo ? "mobile-screen" : ""}>
    {!template && <div className={liveDemo ? "live-demo" : "qr-home-container"}>
     {qrData ? (
    isLoading ? (
      // Show Lottie animation when there is data and it's loading
      <Lottie options={defaultOptions} height={300} width={300} />
    ) : (
      // Show QR code when there is data and it's not loading
      <>
      <div ref={canvasRef} className={liveDemo ? "qr-code-container-mobile" : "qr-code-container"}></div>
    </>
    )
  ) : (
    // Show placeholder image when there's no data
    <div className="qr-code-container">
      <Lottie options={defaultOptions} height={280} width={280} />
    </div>
  )}
      {!liveDemo && !template && (
        <div className="button-home-container">
          {/* <Button variant="contained" color="primary" disabled={!qrCode} onClick={() => handleDownloadClick("png", qrCodeSettings.qrName)} style={{ color: "white", fontSize: ".8rem" }} className="button">
            Download PNG
          </Button>
          <Button variant="contained" style={{ color: "white", fontSize: ".8rem" }} disabled={!qrCode} onClick={() => handleDownloadClick("webp", qrCodeSettings.qrName)} className="button">
            Download WEBP
          </Button> */}
          <DownloadOnMobile prop={{handleDownloadClick, qrCodeSettings}}/>
        </div>
      )}

    </div>} {template && <div style={{maxHeight:'180px', maxWidth:'180px', margin:'auto'}}>
      <div ref={canvasRef} className="qr-template-container"></div>

      </div>}
      {liveDemo && <div className="center" style={{marginTop:'10px'}}> <DownloadOnMobile prop={{handleDownloadClick, qrCodeSettings}}/> </div>}</div></>
  );
};

export default QrGenerator;