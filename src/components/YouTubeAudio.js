import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";
import { sampleDuration } from "../config/audioProps";

const rnd = Math.floor(30, Math.random() * 1800); // between 0 min and 30 min (in seconds)

const opts = {
    height: "500",
    width: "700",
    playerVars: {
        start: rnd,
        end: sampleDuration + rnd,
        origin: "http://localhost:3000",
    },
};

console.log(`Youtube video will start at ${rnd} seconds.`);

const YouTubeAudio = ({ videoId, isPaused, isVideoLoaded, setState }) => {
    const [player, setPlayer] = useState(null);

    useEffect(() => {
        if (player) {
            if (isPaused) {
                player.stopVideo();
            } else if (!isPaused && isVideoLoaded) {
                player.playVideo();
            } else {
                player.stopVideo();
            }
        }
    }, [isPaused, isVideoLoaded, player]);

    return (
        <div style={{ position: "relative", display: "block" }}>
            <YouTube
                videoId={videoId}
                loading="lazy"
                onEnd={() => {
                    setState((prevState) => ({
                        ...prevState,
                        isPaused: true,
                        isVideoLoaded: false,
                    }));
                }}
                onReady={(ev) => {
                    setPlayer(ev.target);
                    setState((prevState) => ({
                        ...prevState,
                        isVideoLoaded: true,
                    }));
                }}
                opts={opts}
            />
        </div>
    );
};

export default YouTubeAudio;
