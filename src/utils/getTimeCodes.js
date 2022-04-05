import { sampleDuration } from "../config/audioProps";
import { screenProps } from "../config/screenProps";

// returns the different time codes to switch samples

export const getTimeCodes = (samples) => {
    const timeCodes = {};
    for (let i = 1; i <= samples.length; i++) {
        if (i === 1) {
            timeCodes[0] = {
                genre: samples[i - 1].genre,
                videoId: samples[i - 1].videoId,
            };
        } else {
            timeCodes[
                (i * sampleDuration - sampleDuration) * screenProps.fps - 1
            ] = {
                genre: samples[i - 1].genre,
                videoId: samples[i - 1].videoId,
            };
        }
    }
    return timeCodes;
};
