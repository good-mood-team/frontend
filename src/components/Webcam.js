import React, { useCallback, useEffect, useState } from "react";
import WebcamCapture from "./WebcamCapture";
import WebcamInput from "./WebcamInput";

const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
};

const Webcam = ({ webcamRef, setState, duration, fps }) => {
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
            <br />
            <p>Duration (in seconds) :</p>
            <input
                type="text"
                pattern="[0-9]*"
                onChange={(ev) =>
                    setState((prevState) => ({
                        ...prevState,
                        duration: ev.target.value,
                    }))
                }
                value={duration}
            />
            <br />
            <p>FPS :</p>
            <input
                type="text"
                pattern="[0-9]*"
                onChange={(ev) =>
                    setState((prevState) => ({
                        ...prevState,
                        fps: ev.target.value,
                    }))
                }
                value={fps}
            />
        </>
    );
};

export default Webcam;
