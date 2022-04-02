import React, { useEffect, useRef, useState } from "react";
import { useInterval } from "usehooks-ts";
import Webcam from "../../components/Webcam";
import { genres } from "../../utils/genres";
import { screenProps } from "../../utils/screenProps";

// returns the different time codes to switch samples (sample length set to 5 seconds)
const samplesTimeCode = (samples) => {
    const timeCodes = {};
    for (let i = 1; i < samples.length; i++) {
        if (i === 1) {
            timeCodes[(i * 5 - 5) * screenProps.fps] = {
                genre: samples[i].genre,
                url: samples[i].url,
            };
        } else {
            timeCodes[(i * 5 - 5) * screenProps.fps - 1] = {
                genre: samples[i].genre,
                url: samples[i].url,
            };
        }
    }
    return timeCodes;
};

const Home = () => {
    const [init, setInit] = useState(false); // prevent from interval to start on page load
    const [delay, setDelay] = useState(null);
    const [isRunStarted, setIsRunStarted] = useState(false); // true if the run is started
    const [count, setCount] = useState(0); // screenshots count
    const [finished, setFinished] = useState(false); // true if the run successfully finished

    const webcamRef = useRef(null);

    const [timeCodes, setTimeCodes] = useState(null); // gets the timeCodes of the different samples

    const [currSample, setCurrSample] = useState(null);
    const [data, setData] = useState({}); // contains all the screenshots

    useEffect(() => {
        const fetchData = async () => {
            const samples = [];
            const usedGenre = genres;

            for (let i = 0; i < screenProps.duration / 10; i++) {
                const rndGenre =
                    usedGenre[Math.floor(Math.random() * usedGenre.length)];

                const res = fetch("http://127.0.0.1:5000/api/getYoutubeUrl", {
                    method: "POST",
                    body: JSON.stringify({
                        genre: rndGenre,
                    }),
                    headers: {
                        "Content-Type": "application/json;",
                    },
                }).then((r) => r.json());

                samples.push({ genre: rndGenre, url: res.url });
                usedGenre.splice(usedGenre.indexOf(rndGenre), 1);
            }
            await setTimeCodes(samplesTimeCode(samples));
            await setCurrSample(samples[0]);
        };

        fetchData().catch(console.error);
    }, []);

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
        if (!init) {
            setInit(true);
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
            {timeCodes && currSample && (
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
            )}
            {!timeCodes && !currSample && <p>Loading...</p>}
        </>
    );
};

export default Home;
