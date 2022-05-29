import React from "react";
import { sampleDuration } from "../../../config/audioProps";
import Loading from "./Loading";
import { RunContainer } from "./styled/Run.styled";
import WebcamCapture from "./WebcamCapture";

const Run = ({
    currDevice,
    webcamRef,
    handleRunState,
    currGenre,
    isFinished,
    waitingForNextGenre,
    handleNextGenre,
    screenCount,
    fps,
    isRunStarted,
}) => {
    return (
        <>
            {currGenre && (
                <RunContainer>
                    <>
                        <WebcamCapture
                            currDevice={currDevice}
                            webcamRef={webcamRef}
                        />
                        {!isFinished && waitingForNextGenre && (
                            <button
                                className="nextGenre"
                                type="button"
                                onClick={handleNextGenre}
                            >
                                Appuyer pour continuer
                            </button>
                        )}
                        <div className="controls">
                            <p>Genre joué : {currGenre.genre}</p>
                            {!isFinished &&
                                !waitingForNextGenre &&
                                isRunStarted &&
                                currGenre && (
                                    <p>
                                        {Math.round(
                                            sampleDuration - screenCount / fps
                                        )}
                                    </p>
                                )}
                            <button type="button" onClick={handleRunState}>
                                {isRunStarted
                                    ? "Arrêter l'analyse"
                                    : "Démarrer l'analyse!"}
                            </button>
                        </div>
                    </>
                </RunContainer>
            )}
            {!currGenre && <Loading />}
        </>
    );
};

export default Run;
