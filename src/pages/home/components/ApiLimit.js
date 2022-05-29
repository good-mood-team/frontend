/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { ApiLimitContainer } from "./styled/ApiLimit.styled";

const ApiLimit = ({ handleRestart }) => {
    return (
        <ApiLimitContainer>
            <p>
                Vous avez été trop nombreux a utiliser le site! Notre nombre de
                crédits YouTube quotidien pour la récupération de musique est
                dépassé. Revenez demain (10:00, heure française) lorsque nos
                crédits seront à nouveau disponibles! Nous travaillons avec
                YouTube pour augmenter cette limite dans les prochains jours.
            </p>
            <button type="button" onClick={handleRestart}>
                Retour à la page d'accueil
            </button>
        </ApiLimitContainer>
    );
};

export default ApiLimit;
