import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";

const opts = {
    height: "0",
    width: "0",
    playerVars: {
        autoplay: 1,
        start: 30,
    },
};

const YouTubeAudio = ({ videoId, finished, isRunStarted }) => {
    const [player, setPlayer] = useState(null);

    useEffect(() => {
        if (finished || !isRunStarted) {
            player.stopVideo();
        } else if (player) {
            player.playVideo();
        }
    }, [finished, isRunStarted, player]);

    return (
        <div style={{ position: "absolute", display: "none" }}>
            <YouTube
                videoId={videoId}
                onReady={(ev) => {
                    setPlayer(ev.target);
                }}
                opts={opts}
            />
        </div>
    );
};

export default YouTubeAudio;
