import React, { useCallback, useMemo } from 'react';
import { Box } from '@mui/material';
import  { Suspense, useState, useEffect } from 'react';
import './newqrStyle.css';
import { useNavigate } from 'react-router-dom';
import { ImportStats } from '../GlobelStats/GlobelStats';
import { staticTools } from '../DynamicData';

// Lazy load the QrDemo component
const QrDemoLazy = React.lazy(() => import('./QrDemo'));

const SelectScreenForIframe = () => {
    const { 
        qrCodeSettings,
        setQrCodeSettings,
        setActiveTool,
        isMobile,
        setActiveStep,
    } = ImportStats();

    const navigate = useNavigate();

    // Optimized callback with minimized dependencies
    const inputClick = useCallback((e) => {
        setActiveTool(e);
        setQrCodeSettings((prevSettings) => ({
            ...prevSettings,
            type: e,
            inputData: {
                ...prevSettings.inputData,
                url: { value: null },
                app: { value: null },
                text: { value: null },
                mail: { email: null, message: null },
                whatsapp: { number: null, message: null },
                message: { number: null, message: null },
                call: { call: null },
                wifi: { networkName: null, networkType: null, password: null, isHide: false },
                vcard: {
                    ...prevSettings.inputData.vcard,
                    firstName: null,
                    lastName: null,
                    phoneNumber: null,
                    mobile: null,
                    email: null,
                    website: null,
                    company: null,
                    jobTitle: null,
                    address: null,
                    fax: null,
                    city: null,
                    postalCode: null,
                    country: null
                }
            }
        }));
        setActiveStep(1);
        navigate('/create/input');
    }, [setActiveTool, setQrCodeSettings, setActiveStep, navigate]);

    const handleExplore = useCallback(() => {
        window.open('https://aspireai.io/create', '_blank');
    }, []);

    // Pre-calculate staticTools for iframe scenario outside of the component's body to avoid re-calculation

    return (
        <Box className="container-iframe">
            <div className="types-of-qr-container-select-iframe" style={{ width: isMobile ? "100%" : "" }}>
                <div className={isMobile ? "container-custom-mobile" : "container-custom-iframe"}>
                    <div className="flex-col">
                        <div className="heading-container-iframe">
                            <span className="heading-2-iframe">Start Creating Your Desired QR with One Click</span>{" "}
                        </div>
                        <div className='grid-container-iframe'>
                            {staticTools.map((item) => (
                                <div
                                    className={`static-qr-tabs-iframe ${qrCodeSettings.type === item.heading ? 'selected' : ''}`}
                                    key={item.id}
                                    onClick={() => inputClick(item.heading)}
                                >
                                    <div className="static-qr-icons-iframe">{item.icon}</div>
                                    <div className="flex-col">
                                        <span className="text-primary">{item.heading}</span>
                                       {!isMobile && <span className="text-secondary">{item.text}</span>}
                                    </div>
                                </div>
                            ))}
                          </div>
                    </div>
                </div>
                {!isMobile && (
                    <Suspense fallback={<div>Loading...</div>}>
                        <QrDemoLazy prop={{ qrCodeSettings }} />
                    </Suspense>
                )}
            </div>
        </Box>
    );
};

export default React.memo(SelectScreenForIframe);
