import React, { useState } from "react";
import { useInterval } from "usehooks-ts";
import Webcam from "../../components/Webcam";

const screenProps = {
    fps: 10, // number of screenshots every second
    duration: 10, // run duration in seconds
};

const Home = () => {
    const [init, setInit] = useState(false); // prevent from interval to start on page load
    const [delay, setDelay] = useState(null);
    const [isRunStarted, setIsRunStarted] = useState(false); // true if the run is started
    const [count, setCount] = useState(0); // screenshots count
    const [finished, setFinished] = useState(false); // true if the run successfully finished

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
            }
            // if the run was stopped by the user (which means that the run is not completed so it is aborted)
            else {
                setIsRunStarted(false);
                setCount(0);
            }
        } else {
            setCount((currCount) => currCount + 1);
        }
    }, delay);

    const handleRunState = () => {
        if (!init) {
            setInit(true);
        }

        setDelay(screenProps.fps * 10); // (* 10) converts to delay between every screenshot
        setIsRunStarted((currRunState) => !currRunState);

        // fetch("http://127.0.0.1:5000/api/getUserStats", {
        //     method: "POST",
        //     body: JSON.stringify({
        //         title: "foo",
        //         body: "bar",
        //         userId: 1,
        //     }),
        //     headers: {
        //         "Content-Type": "application/json;",
        //     },
        // })
        //     .then((r) => r.json())
        //     .then((r) => console.log(r));
    };

    const handleRestart = () => {
        setIsRunStarted(false);
        setCount(0);
        setFinished(false);
    };

    return (
        <>
            <h1>Home</h1>
            <Webcam />
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
