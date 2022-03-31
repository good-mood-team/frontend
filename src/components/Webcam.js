import React, { useCallback, useEffect, useState } from "react";
import WebcamCapture from "./WebcamCapture";
import WebcamInput from "./WebcamInput";

const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
};

const Webcam = ({ webcamRef }) => {
    const [devices, setDevices] = useState([]);
    const [currDevice, setCurrDevice] = useState("");

    const handleDevices = useCallback(
        (mediaDevices) =>
            setDevices(
                mediaDevices.filter(({ kind }) => kind === "videoinput") // used to query only webcams
            ),
        [setDevices]
    );

    useEffect(() => {
        navigator.mediaDevices.enumerateDevices().then(handleDevices);
    }, [handleDevices]);

    return (
        <>
            <WebcamCapture
                videoConstraints={videoConstraints}
                currDevice={currDevice}
                webcamRef={webcamRef}
            />
            <br />
            <WebcamInput
                devices={devices}
                currDevice={currDevice}
                setCurrDevice={setCurrDevice}
            />
        </>
    );
};

export default Webcam;
