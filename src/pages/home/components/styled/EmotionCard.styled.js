import styled from "styled-components";

export const EmotionCardContainer = styled.div`
    margin: 25px;

    border: 3px solid ${(props) => props.theme.mainColors.lightGreen};
    font-family: "hack-NF";
    color: ${(props) => props.theme.mainColors.lightGreen};

    display: flex;
    flex-direction: row;

    justify-content: space-evenly;
    align-items: center;

    width: 90%;

    @media (min-width: 768px) {
        width: 75%;
    }
    @media (min-width: 1024px) {
        width: 60%;
    }
    @media (min-width: 1280px) {
        width: 40%;
    }

    h1,
    .emotionResults {
        text-align: center;
        padding: 10px 25px;
        flex-basis: 50%;
    }

    .separator {
        height: 100%;
        border-left: 3px solid ${(props) => props.theme.mainColors.lightGreen};
    }

    .emotionResults {
        display: flex;
        flex-direction: column;
    }

    .emotionResult {
        margin: 5px 0;
    }
`;
