import React, { useRef, useState } from "react";
import { useInterval } from "usehooks-ts";
import Webcam from "../../components/Webcam";
import YouTubeAudio from "../../components/YouTubeAudio";
import { sampleDuration } from "../../config/audioProps";
import { genres } from "../../config/genres";
import { getTimeCodes } from "../../utils/getTimeCodes";

const initialState = {
    duration: 30,
    fps: 10,
    init: false,
    delay: null,
    isRunStarted: false,
    screenCount: 0,
    isPaused: true,
    isFinished: false,
    timeCodes: null,
    currSample: null,
    data: {},
    emotions: {},
};

const Home = () => {
    const [
        {
            duration,
            fps,
            init,
            delay,
            isRunStarted,
            screenCount,
            isPaused,
            isFinished,
            timeCodes,
            currSample,
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
        // if it's not the first page load && the run was stopped && the number of screenshots wanted is exceeded
        if (!isPaused) {
            if (!(init && isRunStarted && screenCount < fps * duration)) {
                setState((prevState) => ({ ...prevState, delay: null })); // stops the interval

                // run successfully finished
                if (screenCount >= fps * duration) {
                    setState((prevState) => ({
                        ...prevState,
                        isFinished: true,
                    }));

                    // sends all the screenshots to the server
                    fetch(`https://gm-api.ggbonsai.app/getUserStats`, {
                        method: "POST",
                        body: JSON.stringify(data),
                        headers: {
                            "Content-Type": "application/json;",
                        },
                    })
                        .then((r) => r.json())
                        .then((r) => {
                            console.log(r);
                            setState((prevState) => ({
                                ...prevState,
                                emotions: r,
                            }));
                        });
                }
                // run is not completed so it is aborted
                else {
                    clearState();
                }
            } else {
                // if the timeCode is in the timeCodes array, switch sample
                if (screenCount !== 0 && screenCount in timeCodes) {
                    setState((prevState) => ({
                        ...prevState,
                        currSample: timeCodes[screenCount],
                        isPaused: true,
                    }));
                }

                // logic to take a screenshot and add it to the data dict
                const imageSrc = webcamRef.current.getScreenshot();
                setState((prevState) => ({
                    ...prevState,
                    data: {
                        ...prevState.data,
                        [currSample.genre]: [
                            ...(prevState.data[currSample.genre] ?? []),
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

            for (let i = 0; i < duration / sampleDuration; i++) {
                const rndGenre =
                    unusedGenres[
                        Math.floor(Math.random() * unusedGenres.length)
                    ];
                rndGenres.push(rndGenre);
                unusedGenres.splice(unusedGenres.indexOf(rndGenre), 1);
            }

            fetch(`https://gm-api.ggbonsai.app/getYoutubeUrl`, {
                method: "POST",
                body: JSON.stringify({
                    genres: rndGenres,
                }),
                headers: {
                    "Content-Type": "application/json;",
                },
            })
                .then((r) => r.json())
                .then((r) => {
                    setState((prevState) => ({
                        ...prevState,
                        timeCodes: getTimeCodes(r.tracks),
                        currSample: r.tracks[0],
                    }));
                })
                .then(() => {
                    if (!init) {
                        setState((prevState) => ({ ...prevState, init: true }));
                    }
                });
        }

        // (* 10) converts to delay between every screenshot
        setState((prevState) => ({
            ...prevState,
            delay: (duration * 1000) / (fps * duration),
            isRunStarted: !isRunStarted,
        }));
    };

    const handleRestart = () => {
        clearState();
    };

    return (
        <>
            {currSample && (
                <YouTubeAudio
                    videoId={currSample.videoId}
                    isFinished={isFinished}
                    isRunStarted={isRunStarted}
                    init={init}
                    setState={setState}
                />
            )}
            <h1>Home</h1>
            <Webcam webcamRef={webcamRef} />
            <br />
            {!isRunStarted && (
                <>
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
            )}
            <br />
            <p>Number of screens : {screenCount}</p>
            {!isFinished && (
                <button type="button" onClick={handleRunState}>
                    {isRunStarted ? "Stop the run!" : "Start the run!"}
                </button>
            )}
            {isFinished && (
                <>
                    <p>
                        Settings : {fps} images/second for {duration} seconds
                    </p>
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
