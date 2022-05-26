import React from "react";
import { EmotionCardContainer } from "./styled/EmotionCard.styled";

const EmotionCard = ({ emotionName, emotions }) => {
    return (
        <EmotionCardContainer>
            <h1>{emotionName}</h1>
            <div className="separator" />
            <div className="emotionResults">
                {Object.keys(emotions[emotionName]).length > 0 && (
                    <>
                        {Object.keys(emotions[emotionName]).map(
                            (key, index) => {
                                return (
                                    <p key={index} className="emotionResult">
                                        {key}: {emotions[emotionName][key]}%
                                    </p>
                                );
                            }
                        )}
                    </>
                )}
                {Object.keys(emotions[emotionName]).length === 0 && (
                    <p className="emotionResult">Aucun visage détecté.</p>
                )}
            </div>
        </EmotionCardContainer>
    );
};

export default EmotionCard;
