import { screenProps } from "./screenProps";

// returns the different time codes to switch samples

const SAMPLE_DURATION = 10; // in seconds

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
                (i * SAMPLE_DURATION - SAMPLE_DURATION) * screenProps.fps - 1
            ] = {
                genre: samples[i - 1].genre,
                videoId: samples[i - 1].videoId,
            };
        }
    }
    return timeCodes;
};
