import React from "react";

const WebcamInput = ({ devices, currDevice, id, setCurrDevice }) => {
    return (
        <select
            id={id}
            name="devices"
            value={currDevice}
            onChange={(ev) => setCurrDevice(ev.target.value)}
        >
            <option value="" disabled>
                Veuillez choisir une caméra
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
