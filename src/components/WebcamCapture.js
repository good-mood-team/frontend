import React from "react";
import Webcam from "react-webcam";

const WebcamCapture = ({
    videoConstraints,
    currDevice,
    webcamRef,
}) => {
    return (
        <Webcam
            style={{ transform: "scaleX(-1)", position: "absolute", top: "0", left: "0", zIndex: "1000" }}
            audio={false}
            height={420}
            width={750}
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
