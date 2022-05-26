/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { TimeoutContainer } from "./styled/Timeout.styled";

const Timeout = ({ handleRestart }) => {
    return (
        <TimeoutContainer>
            <p>
                Il semblerait que nous n'ayons pas réussi à charger les données
                d'analyse ! Pensez à vérifier votre connexion internet.
            </p>
            <p>
                Si le problème persiste, il se peut que votre débit soit
                insuffisant. Essayez de réduire le nombre d'image par seconde ou
                tout simplement le nombre de genres testés à la fois.
            </p>
            <button type="button" onClick={handleRestart}>
                Retour à la page d'accueil
            </button>
        </TimeoutContainer>
    );
};

export default Timeout;
