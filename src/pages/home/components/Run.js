import React from "react";
import { LoadingContainer, RunContainer } from "./styled/Run.styled";
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
                        <div className="controls">
                            <p>Genre joué : {currGenre.genre}</p>
                            {!isFinished && waitingForNextGenre && (
                                <button type="button" onClick={handleNextGenre}>
                                    Next genre
                                </button>
                            )}
                            {!isFinished &&
                                !waitingForNextGenre &&
                                isRunStarted &&
                                currGenre && (
                                    <p>{Math.round(10 - screenCount / fps)}</p>
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
            {!currGenre && (
                <LoadingContainer>
                    <p>Chargement...</p>
                </LoadingContainer>
            )}
        </>
    );
};

export default Run;
