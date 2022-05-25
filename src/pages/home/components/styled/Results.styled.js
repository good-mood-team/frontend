import styled from "styled-components";

export const ResultsContainer = styled.div`
    height: 100vh;
    background-color: black;

    overflow-y: scroll;

    color: white;

    display: flex;
    flex-direction: column;
    align-items: center;

    padding: 50px;

    .ascii {
        width: 100%;

        margin-bottom: 50px;

        @media (min-width: 640px) {
            width: 50%;
        }

        @media (min-width: 1024px) {
            width: 35%;
        }
    }

    button {
        display: flex;
        justify-content: center;
        align-items: center;

        font-family: "hack-NF";

        border: 3px solid ${(props) => props.theme.mainColors.lightGreen};
        background-color: black;
        color: ${(props) => props.theme.mainColors.lightGreen};

        margin-top: 75px;
        padding: 15px 100px;

        text-align: center;

        font-size: 1rem;

        cursor: pointer;
    }
`;
