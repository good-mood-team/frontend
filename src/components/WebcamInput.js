import React from "react";

const WebcamInput = ({ devices, currDevice, setCurrDevice }) => {
    return (
        <select
            name="devices"
            value={currDevice}
            onChange={(ev) => setCurrDevice(ev.target.value)}
        >
            <option value="" disabled>
                Please choose a camera
            </option>
            {devices.map((device) => {
                return (
                    <option key={device.deviceId} value={device.deviceId}>
                        {device.label.replace(/\([^)]*\)/, "")}
                    </option>
                );
            })}
        </select>
    );
};

export default WebcamInput;
