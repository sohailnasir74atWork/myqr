import React, { useEffect, useRef, useState } from "react";
import QRCodeStyling from "qr-code-styling";
import qrPlaceHolder from "../../../Assets/qrPlaceHolder.svg";
import { Button } from "@mui/material";
import { parseLinearGradient } from "./gradientParser";
import './qrgeneratorStyle.css'
import { ImportStats } from "../../GlobelStats/GlobelStats";
import animation from "../../../Assets/animation.json"
import Lottie from "react-lottie";
const QrGenerator = ({ prop }) => {
  const { liveDemo } = prop;
  const {qrCodeSettings} = ImportStats()
  const [isLoading, setIsLoading] = useState(false);
  console.log(qrCodeSettings)
  const [qrCode, setQrCode] = useState(null);
  const canvasRef = useRef(null);
  const img = qrCodeSettings.logo;
  let qrData = '';
if (qrCodeSettings.inputData.url.value) {
    qrData = qrCodeSettings.inputData.url.value;
}
else if (qrCodeSettings.inputData.text.value) {
    qrData = qrCodeSettings.inputData.text.value;
}
else if (qrCodeSettings.inputData.mail.email && qrCodeSettings.inputData.mail.message) {
    qrData = `mailto:${qrCodeSettings.inputData.mail.email}?body=${encodeURIComponent(qrCodeSettings.inputData.mail.message)}`;
}
else if (qrCodeSettings.inputData.whatsapp.number && qrCodeSettings.inputData.whatsapp.message) {
    const encodedMessage = encodeURIComponent(qrCodeSettings.inputData.whatsapp.message);
    qrData = `https://wa.me/${qrCodeSettings.inputData.whatsapp.number}?text=${encodedMessage}`;
}
else if (qrCodeSettings.inputData.message.number && qrCodeSettings.inputData.message.message) {
  const encodedMessage = encodeURIComponent(qrCodeSettings.inputData.message.message);
  qrData = `sms:${qrCodeSettings.inputData.message.number}?body=${encodedMessage}`;
}
else if (qrCodeSettings.inputData.call.number) {
  qrData = `tel:${qrCodeSettings.inputData.call.number}`;
}
else if (
  qrCodeSettings.inputData.wifi.networkName &&
  qrCodeSettings.inputData.wifi.networkType &&
  qrCodeSettings.inputData.wifi.password
) {
  const { networkName, networkType, password, isHide } = qrCodeSettings.inputData.wifi;

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
} else if  (qrCodeSettings.inputData.vcard.firstName) {
  const vcard = qrCodeSettings.inputData.vcard;
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
      const gradientBackground = parseLinearGradient(qrCodeSettings.colors.background.color);
      const gradientBorder = parseLinearGradient(qrCodeSettings.colors.square.color);
      const gradientQR = parseLinearGradient(qrCodeSettings.colors.dots.color);
      const gradientCenter = parseLinearGradient(qrCodeSettings.colors.cornerDots.color);

      // Generate a new QR code
      const newQrCode = new QRCodeStyling({
        width: qrCodeSettings.size.width,
        height: qrCodeSettings.size.height,
        data: qrData,
        image: img,
        dotsOptions: {
          ...(qrCodeSettings.colors.dots.isSolid
            ? { color: qrCodeSettings.colors.dots.color }
            : {
                gradient: {
                  colorStops: gradientQR,
                },
              }),
          type: qrCodeSettings.types.dots.type,
        },
        backgroundOptions: {
          ...(qrCodeSettings.colors.background.isSolid
            ? { color: qrCodeSettings.colors.background.color }
            : {
                gradient: {
                  colorStops: gradientBackground,
                },
              }),
        },
        cornersSquareOptions: {
          ...(qrCodeSettings.colors.square.isSolid
            ? { color: qrCodeSettings.colors.square.color }
            : {
                gradient: {
                  colorStops: gradientBorder,
                },
              }),
          type: qrCodeSettings.types.corner.type,
        },
        cornersDotOptions: {
          ...(qrCodeSettings.colors.cornerDots.isSolid
            ? { color: qrCodeSettings.colors.cornerDots.color }
            : {
                gradient: {
                  colorStops: gradientCenter,
                },
              }),
          type: qrCodeSettings.types.cornerDots.type,
        },
        imageOptions: {
          crossOrigin: "anonymous",
          margin: qrCodeSettings.logoSetting.margin,
          hideBackgroundDots: qrCodeSettings.logoSetting.backgrounddots,
        },

      });

      setQrCode(newQrCode);
      newQrCode.append(canvasElement);
      setIsLoading(false); // End loading

    }
  }, [qrCodeSettings, canvasRef, qrData]); // Dependencies include qrCodeSettings and canvasRef to re-run the effect appropriately

  function handleDownloadClick(typeOfImg, qrName) {
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
    <div className={liveDemo ? "live-demo" : "qr-home-container"}>
     {qrData ? (
    isLoading ? (
      // Show Lottie animation when there is data and it's loading
      <Lottie options={defaultOptions} height={300} width={300} />
    ) : (
      // Show QR code when there is data and it's not loading
      <div ref={canvasRef} className={liveDemo ? "qr-code-container-mobile" : "qr-code-container"}></div>
    )
  ) : (
    // Show placeholder image when there's no data
    <div className="qr-box-home">
      <Lottie options={defaultOptions} height={280} width={280} />
    </div>
  )}
      {!liveDemo && (
        <div className="button-home-container">
          <Button variant="contained" color="primary" disabled={!qrCode} onClick={() => handleDownloadClick("png", qrCodeSettings.qrName)} style={{ color: "white", fontSize: ".8rem" }} className="button">
            Download PNG
          </Button>
          <Button variant="contained" style={{ color: "white", fontSize: ".8rem" }} disabled={!qrCode} onClick={() => handleDownloadClick("webp", qrCodeSettings.qrName)} className="button">
            Download WEBP
          </Button>
        </div>
      )}
    </div>
  );
};

export default QrGenerator;