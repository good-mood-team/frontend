import React from "react";
import Webcam from "react-webcam";

const WebcamCapture = ({ videoConstraints, currDevice }) => {
    return (
        <Webcam
            style={{ transform: "scaleX(-1)" }}
            audio={false}
            height={420}
            width={750}
            videoConstraints={{
                ...videoConstraints,
                deviceId: currDevice,
            }}
        />
    );
};

export default WebcamCapture;
