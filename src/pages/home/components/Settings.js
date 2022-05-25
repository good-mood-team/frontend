/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useCallback, useEffect, useState } from "react";
import {
    Container,
    FormContainer,
    SettingsContainer,
} from "./styled/Settings.styled";
import WebcamCapture from "./WebcamCapture";
import WebcamInput from "./WebcamInput";

const Settings = ({
    genres,
    numGenres,
    fps,
    isRunStarted,
    handleRunState,
    currDevice,
    setCurrDevice,
    setState,
}) => {
    const [devices, setDevices] = useState([]);

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
        <SettingsContainer>
            <Container>
                <div className="form">
                    <FormContainer>
                        <h1>Paramètres</h1>
                        <label htmlFor="webcams">
                            Choisissez votre caméra :
                        </label>
                        <WebcamInput
                            id="webcams"
                            devices={devices}
                            currDevice={currDevice}
                            setCurrDevice={setCurrDevice}
                        />
                        <label htmlFor="numGenres">
                            Nombre de genres sur lesquels être testé :
                        </label>
                        <input
                            type="number"
                            min="1"
                            id="numGenres"
                            max={genres.length.toString()}
                            onChange={(ev) =>
                                setState((prevState) => ({
                                    ...prevState,
                                    numGenres: ev.target.value,
                                }))
                            }
                            value={numGenres}
                        />
                        <label htmlFor="fps">Images par seconde :</label>
                        <input
                            type="number"
                            min="1"
                            max="10"
                            htmlFor="fps"
                            onChange={(ev) =>
                                setState((prevState) => ({
                                    ...prevState,
                                    fps: ev.target.value,
                                }))
                            }
                            value={fps}
                        />

                        <button type="button" onClick={handleRunState}>
                            {isRunStarted
                                ? "Arrêter l'analyse"
                                : "Démarrer l'analyse"}
                        </button>
                    </FormContainer>
                </div>
                <div>
                    <WebcamCapture currDevice={currDevice} />
                </div>
            </Container>
            <p className="version">v.{process.env.REACT_APP_VERSION}</p>
        </SettingsContainer>
    );
};

export default Settings;
