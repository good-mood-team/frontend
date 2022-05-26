/* eslint-disable react/no-unescaped-entities */
import React from "react";
import EmotionCard from "./EmotionCard";
import { ResultsContainer } from "./styled/Results.styled";

const Results = ({ emotions, handleRestart }) => {
    return (
        <ResultsContainer>
            <img
                src={`${process.env.PUBLIC_URL}/medias/images/ascii_results.png`}
                className="ascii"
                alt="ascii"
            />
            {Object.keys(emotions).map((key) => {
                return (
                    <EmotionCard
                        key={key}
                        emotionName={key}
                        emotions={emotions}
                    />
                );
            })}
            <button type="button" onClick={handleRestart}>
                Retour à la page d'accueil
            </button>
        </ResultsContainer>
    );
};

export default Results;
