import React, { useState } from "react";
import WebcamCapture from "./WebcamCapture";
import WebcamInput from "./WebcamInput";

const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
};

const Webcam = () => {
    const [devices, setDevices] = useState([]);
    const [currDevice, setCurrDevice] = useState([]);

    const handleDevices = React.useCallback(
        (mediaDevices) =>
            setDevices(
                mediaDevices.filter(({ kind }) => kind === "videoinput")
            ),
        [setDevices]
    );

    React.useEffect(() => {
        navigator.mediaDevices.enumerateDevices().then(handleDevices);
    }, [handleDevices]);

    const handleClick = () => {
        fetch("http://127.0.0.1:5000/api/receiveVideo").then((r) =>
            console.log(r)
        );
    };

    return (
        <>
            <WebcamCapture
                videoConstraints={videoConstraints}
                currDevice={currDevice}
            />
            <br />
            <WebcamInput
                devices={devices}
                currDevice={currDevice}
                setCurrDevice={setCurrDevice}
            />
            <br />
            <button type="button" onClick={handleClick}>
                Start the run!
            </button>
        </>
    );
};

export default Webcam;
