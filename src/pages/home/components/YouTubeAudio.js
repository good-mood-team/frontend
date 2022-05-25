import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";
import { sampleDuration } from "../../../config/audioProps";

const YouTubeAudio = ({ videoId, isPaused, isVideoLoaded, rnd, setState }) => {
    const [player, setPlayer] = useState(null);

    const opts = {
        height: "0",
        width: "0",
        playerVars: {
            autoplay: 1,
            playsinline: 1,
            start: rnd,
            end: sampleDuration + rnd,
            origin: "http://localhost:3000",
        },
    };

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
        <div style={{ position: "absolute", display: "block" }}>
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
