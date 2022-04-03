import React, { useRef, useState } from "react";
import { useInterval } from "usehooks-ts";
import Webcam from "../../components/Webcam";
import { genres } from "../../utils/genres";
import { getTimeCodes } from "../../utils/getTimeCodes";
import { screenProps } from "../../utils/screenProps";
import { soundPlay } from "../../utils/soundPlay";

const Home = () => {
    // eslint-disable-next-line no-unused-vars
    const [init, setInit] = useState(false); // prevent from interval to start on page load
    const [delay, setDelay] = useState(null);
    const [isRunStarted, setIsRunStarted] = useState(false); // true if the run is started
    const [count, setCount] = useState(0); // screenshots count
    const [finished, setFinished] = useState(false); // true if the run successfully finished

    const webcamRef = useRef(null);

    const [timeCodes, setTimeCodes] = useState(null); // gets the timeCodes of the different samples

    const [currSample, setCurrSample] = useState(null); // object that contains the current music genre being played & ytb url to the music
    const[currSound, setCurrSound] = useState(null)
    const [data, setData] = useState({}); // contains all the screenshots

    useInterval(() => {
        // if it's not the first page load && the run was stopped && the number of screenshots wanted is exceeded
        if (
            !(
                init &&
                isRunStarted &&
                count < screenProps.fps * screenProps.duration
            )
        ) {
            setDelay(null); // setting the delay to null stops the interval

            // if the number of screenshots wanted is exceeded (which means that the run successfully finished)
            if (count >= screenProps.fps * screenProps.duration) {
                setFinished(true);
                currSound.stop()

                // sends all the screenshots to the server
                fetch("http://127.0.0.1:5000/api/getUserStats", {
                    method: "POST",
                    body: JSON.stringify(data),
                    headers: {
                        "Content-Type": "application/json;",
                    },
                })
                    .then((r) => r.json())
                    .then((r) => console.log(r));
            }
            // if the run was stopped by the user (which means that the run is not completed so it is aborted)
            else {
                setIsRunStarted(false);
                setCount(0);
                setData({});
            }
        } else {
            // if the timeCode is in the timeCodes array, switch sample
            if (count !== 0 && count in timeCodes) {
                setCurrSample(timeCodes[count]);
                currSound.stop()
                setCurrSound(soundPlay(timeCodes[count].url));
            }

            // logic to take a screenshot and add it to the data dict
            const imageSrc = webcamRef.current.getScreenshot();
            setData((currData) => {
                if (currData[currSample.genre]) {
                    currData[currSample.genre].push(imageSrc);
                    return currData;
                } else {
                    currData[currSample.genre] = [imageSrc];
                    return currData;
                }
            });

            setCount((currCount) => currCount + 1);
        }
    }, delay);

    const handleRunState = () => {
        if (!isRunStarted) {
            const unusedGenres = [...genres];
            const rndGenres = [];

            for (let i = 0; i < screenProps.duration / 10; i++) {
                const rndGenre =
                    unusedGenres[
                        Math.floor(Math.random() * unusedGenres.length)
                    ];
                rndGenres.push(rndGenre);
                unusedGenres.splice(unusedGenres.indexOf(rndGenre), 1);
            }

            fetch("http://127.0.0.1:5000/api/getYoutubeUrl", {
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
                    setTimeCodes(getTimeCodes(r.tracks));
                    setCurrSample(r.tracks[0]);
                    setCurrSound(soundPlay(r.tracks[0].url));
                })
                .then(() => {
                    if (!init) {
                        setInit(true);
                    }
                });
        }
        setDelay(screenProps.fps * 10); // (* 10) converts to delay between every screenshot
        setIsRunStarted((currRunState) => !currRunState);
    };

    const handleRestart = () => {
        setIsRunStarted(false);
        setCount(0);
        setFinished(false);
        setData({});
    };

    return (
        <>
            <h1>Home</h1>
            <Webcam webcamRef={webcamRef} />
            <br />
            <p>Number of screens : {count}</p>
            {!finished && (
                <button type="button" onClick={handleRunState}>
                    {isRunStarted ? "Stop the run!" : "Start the run!"}
                </button>
            )}
            {finished && (
                <>
                    <p>
                        Settings : {screenProps.fps} images/second for{" "}
                        {screenProps.duration} seconds
                    </p>
                    <button type="button" onClick={handleRestart}>
                        Restart
                    </button>
                </>
            )}
        </>
    );
};

export default Home;
