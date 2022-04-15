import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";
import { sampleDuration } from "../config/audioProps";

const rnd = Math.floor(Math.random() * 1800); // between 0 min and 30 min (in seconds)

const opts = {
    height: "500",
    width: "700",
    playerVars: {
        autoplay: 1,
        start: rnd,
        end: sampleDuration + rnd,
        origin: "http://localhost:3000",
    },
};

const YouTubeAudio = ({ videoId, isFinished, isRunStarted, setState }) => {
    const [player, setPlayer] = useState(null);

    useEffect(() => {
        if (player) {
            if (isFinished || !isRunStarted) {
                player.stopVideo();
            } else {
                player.playVideo();
            }
        }
    }, [isFinished, isRunStarted, player]);

    return (
        <div style={{ position: "relative", display: "block" }}>
            <YouTube
                videoId={videoId}
                onEnd={() => {
                    setState((prevState) => ({
                        ...prevState,
                        isPaused: true,
                    }));
                }}
                onReady={(ev) => {
                    setPlayer(ev.target);
                    setState((prevState) => ({
                        ...prevState,
                        isPaused: false,
                    }));
                }}
                opts={opts}
            />
        </div>
    );
};

export default YouTubeAudio;
