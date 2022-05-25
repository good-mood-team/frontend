import React from "react";
import { LoadingContainer } from "./styled/Loading.styled";

const Loading = ({ isFinished }) => {
    return (
        <LoadingContainer>
            {isFinished
                ? "Acquisition des résultats..."
                : "Acquisition des musiques..."  }
        </LoadingContainer>
    );
};

export default Loading;
