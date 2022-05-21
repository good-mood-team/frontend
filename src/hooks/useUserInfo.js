import { useState } from "react";

export default function useUserInfos() {
    const getUserInfos = () => {
        const userInfosString = localStorage.getItem("userInfos");
        const userUserInfos = JSON.parse(userInfosString);
        return userUserInfos;
    };

    const [userInfos, setUserInfos] = useState(getUserInfos());

    const saveUserInfos = (userUserInfos) => {
        localStorage.setItem("userInfos", JSON.stringify(userUserInfos));
        setUserInfos(userUserInfos.userInfos);
    };

    const removeUserInfos = () => {
        localStorage.removeItem("userInfos");
    };

    return {
        removeUserInfos,
        setUserInfos: saveUserInfos,
        userInfos,
    };
}
