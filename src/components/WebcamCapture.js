import React from "react";
import Webcam from "react-webcam";

const WebcamCapture = ({
    videoConstraints,
    currDevice,
    webcamRef,
}) => {
    return (
        <Webcam
            style={{ transform: "scaleX(-1)", margin: "0 !important", padding: "0 !important", float: "left !important", display: "block !important" }}
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
