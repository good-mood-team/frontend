import React, { useRef, useState, useEffect } from "react";
import { useInterval } from "usehooks-ts";
import Settings from "./components/Settings";
import YouTubeAudio from "./components/YouTubeAudio";
import { sampleDuration } from "../../config/audioProps";
import { genres } from "../../config/genres";
import useUserInfos from "../../hooks/useUserInfo";
import Run from "./components/Run";
import Loading from "./components/Loading";
import Results from "./components/Results";

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
    rnd: Math.floor(120, Math.random() * 1800), // between 2 min and 30 min (in seconds)
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
            rnd,
        },
        setState,
    ] = useState(initialState);

    const [currDevice, setCurrDevice] = useState("");

    const { userInfos } = useUserInfos();

    const clearState = () => {
        setState({ ...initialState });
    };

    const webcamRef = useRef(null);

    useEffect(() => {
        if (!userInfos) {
            window.location.href = "/";
        }
    }, [userInfos]);

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
                    }));

                    setTimeout(() => {
                        setState((prevState) => ({
                            ...prevState,
                            waitingForNextGenre: true,
                        }));
                    }, 2000);

                    // sends all the screenshots to the server
                    fetch(
                        process.env.REACT_APP_PRODUCTION === "true"
                            ? "https://api.good-mood.icu/getUserStats"
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
                            setState((prevState) => ({
                                ...prevState,
                                emotions: {
                                    ...emotions,
                                    [currGenreToSend.genre]:
                                        r.emotions[currGenreToSend.genre],
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
                process.env.REACT_APP_PRODUCTION === "true"
                    ? "https://api.good-mood.icu/getYoutubeUrl"
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
                    rnd={rnd}
                    setState={setState}
                />
            )}
            {!isRunStarted && (
                <Settings
                    genres={genres}
                    numGenres={numGenres}
                    fps={fps}
                    isRunStarted={isRunStarted}
                    handleRunState={handleRunState}
                    currDevice={currDevice}
                    setCurrDevice={setCurrDevice}
                    setState={setState}
                    webcamRef={webcamRef}
                />
            )}
            {!isFinished && isRunStarted && (
                <Run
                    currDevice={currDevice}
                    webcamRef={webcamRef}
                    currGenre={currGenre}
                    handleRunState={handleRunState}
                    isRunStarted={isRunStarted}
                    handleNextGenre={handleNextGenre}
                    isFinished={isFinished}
                    waitingForNextGenre={waitingForNextGenre}
                    screenCount={screenCount}
                    fps={fps}
                />
            )}
            {isFinished &&
                Object.keys(emotions).length !== parseInt(numGenres, 10) && (
                    <Loading isFinished />
                )}
            {isFinished &&
                Object.keys(emotions).length === parseInt(numGenres, 10) && (
                    <Results
                        emotions={emotions}
                        handleRestart={handleRestart}
                    />
                )}
        </>
    );
};

export default Home;
