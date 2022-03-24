import React from "react";
import Webcam from "react-webcam";

const WebcamCapture = ({ videoConstraints, currDevice }) => {
    return (
        <Webcam
            style={{ transform: "scaleX(-1)" }}
            audio={false}
            height={420}
            width={750}
            screenshotFormat="image/jpeg"
            videoConstraints={{
                ...videoConstraints,
                deviceId: currDevice,
            }}
        >
            {({ getScreenshot }) => (
                <button
                    type="button"
                    onClick={() => {
                        const imageSrc = getScreenshot();
                        const bytes = encodeURIComponent(imageSrc).length;
                        console.log(
                            `${bytes} bytes\n${
                                (bytes * 0.000001) / 8
                            } MB\nTheoric size for 10img/sec for 30sec : ${
                                ((bytes * 0.000001) / 8) * 300
                            } MB\nTheoric size for 10img/sec for 60sec : ${
                                ((bytes * 0.000001) / 8) * 600
                            } MB`
                        );
                    }}
                >
                    Capture photo
                </button>
            )}
        </Webcam>
    );
};

export default WebcamCapture;
