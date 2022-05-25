import React from "react";
import Webcam from "react-webcam";

const WebcamCapture = ({ currDevice, webcamRef }) => {
    const videoConstraints = {
        width: 1280,
        height: 720,
        facingMode: "user",
    };

    return (
        <Webcam
            style={{ transform: "scaleX(-1)", objectFit: "cover" }}
            audio={false}
            height="100%"
            width="100%"
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={{
                ...videoConstraints,
                deviceId: currDevice,
            }}
        />
    );
};

export default WebcamCapture;
