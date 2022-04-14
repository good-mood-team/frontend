import { sampleDuration } from "../config/audioProps";

// returns the different time codes to switch samples

export const getTimeCodes = (samples, fps) => {
    const timeCodes = {};
    for (let i = 1; i <= samples.length; i++) {
        if (i === 1) {
            timeCodes[0] = {
                genre: samples[i - 1].genre,
                videoId: samples[i - 1].videoId,
            };
        } else {
            timeCodes[
                (i * sampleDuration - sampleDuration) * fps - 1
            ] = {
                genre: samples[i - 1].genre,
                videoId: samples[i - 1].videoId,
            };
        }
    }
    return timeCodes;
};
