import React, { useRef, useState } from "react";
import { useInterval } from "usehooks-ts";
import Webcam from "../../components/Webcam";
import YouTubeAudio from "../../components/YouTubeAudio";
import { sampleDuration } from "../../config/audioProps";
import { genres } from "../../config/genres";

const PRODUCTION = true;

const initialState = {
    numGenres: 3,
    fps: 10,
    init: true,
    delay: null,
    isRunStarted: false,
    screenCount: 0,
    toPlayGenres: [],
    waitingForNextGenre: false,
    isVideoLoaded: false,
    isPaused: true,
    isFinished: false,
    currGenre: null,
    data: {},
    emotions: {},
};

const Home = () => {
    const [
        {
            numGenres,
            fps,
            init,
            delay,
            isRunStarted,
            screenCount,
            toPlayGenres,
            waitingForNextGenre,
            isVideoLoaded,
            isPaused,
            isFinished,
            currGenre,
            data,
            emotions,
        },
        setState,
    ] = useState(initialState);

    const clearState = () => {
        setState({ ...initialState });
    };

    const webcamRef = useRef(null);

    useInterval(() => {
        if (isPaused) {
            if (!init && isRunStarted && toPlayGenres.length === 0) {
                setState((prevState) => ({ ...prevState, delay: null })); // stops the interval

                // run successfully finished
                if (toPlayGenres.length === 0) {
                    setState((prevState) => ({
                        ...prevState,
                        isFinished: true,
                    }));
                }
                // run is not completed so it is aborted
                else {
                    clearState();
                }
            }
        } else if (!isPaused) {
            if (!init && isRunStarted && toPlayGenres.length !== 0) {
                // if the genre is over, ask user to move to next one
                if (
                    screenCount !== 0 &&
                    screenCount + 1 === fps * sampleDuration
                ) {
                    toPlayGenres.shift();

                    const dataToSend = { ...data };
                    const currGenreToSend = { ...currGenre };

                    setState((prevState) => ({
                        ...prevState,
                        currGenre: toPlayGenres[0],
                        toPlayGenres,
                        isPaused: true,
                        waitingForNextGenre: true,
                    }));

                    // sends all the screenshots to the server
                    fetch(
                        PRODUCTION
                            ? "https://gm-api.ggbonsai.app/getUserStats"
                            : "http://localhost:5000/getUserStats",
                        {
                            method: "POST",
                            body: JSON.stringify(dataToSend),
                            headers: {
                                "Content-Type": "application/json;",
                            },
                        }
                    )
                        .then((r) => r.json())
                        .then((r) => {
                            console.log(r);
                            setState((prevState) => ({
                                ...prevState,
                                emotions: {
                                    ...emotions,
                                    [currGenreToSend.genre]:
                                        r.emotions[currGenre.genre],
                                },
                            }));
                        });
                }

                // logic to take a screenshot and add it to the data dict
                const imageSrc = webcamRef.current.getScreenshot();
                setState((prevState) => ({
                    ...prevState,
                    data: {
                        [currGenre.genre]: [
                            ...(prevState.data[currGenre.genre] ?? []),
                            imageSrc,
                        ],
                    },
                    screenCount: screenCount + 1,
                }));
            }
        }
    }, delay);

    const handleRunState = () => {
        if (!isRunStarted) {
            const unusedGenres = [...genres];
            const rndGenres = [];

            for (let i = 0; i < numGenres; i++) {
                const rndGenre =
                    unusedGenres[
                        Math.floor(Math.random() * unusedGenres.length)
                    ];
                rndGenres.push(rndGenre);
                unusedGenres.splice(unusedGenres.indexOf(rndGenre), 1);
            }

            fetch(
                PRODUCTION
                    ? "https://gm-api.ggbonsai.app/getYoutubeUrl"
                    : "http://localhost:5000/getYoutubeUrl",
                {
                    method: "POST",
                    body: JSON.stringify({
                        genres: rndGenres,
                    }),
                    headers: {
                        "Content-Type": "application/json;",
                    },
                }
            )
                .then((r) => r.json())
                .then((r) => {
                    setState((prevState) => ({
                        ...prevState,
                        currGenre: r.tracks[0],
                        toPlayGenres: r.tracks,
                    }));
                })
                .then(() => {
                    if (init) {
                        setState((prevState) => ({
                            ...prevState,
                            init: false,
                            isPaused: false,
                        }));
                    }
                });

            // (* 10) converts to delay between every screenshot
            setState((prevState) => ({
                ...prevState,
                delay: (numGenres * 1000) / (fps * numGenres),
                isRunStarted: !isRunStarted,
            }));
        } else {
            clearState();
        }
    };

    const handleNextGenre = () => {
        setState((prevState) => ({
            ...prevState,
            waitingForNextGenre: false,
            isPaused: false,
            data: initialState.data,
            screenCount: initialState.screenCount,
        }));
    };

    const handleRestart = () => {
        clearState();
    };

    return (
        <>
            {currGenre && (
                <YouTubeAudio
                    videoId={currGenre.videoId}
                    isPaused={isPaused}
                    isVideoLoaded={isVideoLoaded}
                    setState={setState}
                />
            )}
            <h1>Home</h1>
            <Webcam webcamRef={webcamRef} />
            <br />
            {!isRunStarted && (
                <>
                    <br />
                    <p>
                        Number of genres to be tested on (one genre ~= 10 sec) :
                    </p>
                    <input
                        type="number"
                        min="1"
                        max={genres.length.toString()}
                        onChange={(ev) =>
                            setState((prevState) => ({
                                ...prevState,
                                numGenres: ev.target.value,
                            }))
                        }
                        value={numGenres}
                    />
                    <br />
                    <p>FPS :</p>
                    <input
                        type="number"
                        min="1"
                        max="10"
                        onChange={(ev) =>
                            setState((prevState) => ({
                                ...prevState,
                                fps: ev.target.value,
                            }))
                        }
                        value={fps}
                    />
                </>
            )}
            {!isFinished && waitingForNextGenre && (
                <button type="button" onClick={handleNextGenre}>
                    Next genre
                </button>
            )}
            {!isFinished && (
                <>
                    <p>Number of screens : {screenCount}</p>
                    <button type="button" onClick={handleRunState}>
                        {isRunStarted ? "Stop the run!" : "Start the run!"}
                    </button>
                </>
            )}
            {isFinished && Object.keys(emotions).length !== numGenres && (
                <p>Loading...</p>
            )}
            {isFinished && Object.keys(emotions).length === numGenres && (
                <>
                    <p>
                        Settings : {fps} images/second for{" "}
                        {numGenres * sampleDuration} seconds
                    </p>
                    <div>
                        <pre>{JSON.stringify(emotions, null, 2)}</pre>
                    </div>
                    {emotions && <p>Emotions received!</p>}
                    <button type="button" onClick={handleRestart}>
                        Restart
                    </button>
                </>
            )}
        </>
    );
};

export default Home;
