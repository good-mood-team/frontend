import { Howl } from "howler";

export const soundPlay = (src) => {
    console.log(`Playing ${src} on Youtube`);
    const sound = new Howl({
        src: `https://youtube.com/clip/Ugkx5i8TnLeMZdY6w6SYH1xcnn_d2QDrFm2c`,
        html5: true,
    });
    return sound;
};
