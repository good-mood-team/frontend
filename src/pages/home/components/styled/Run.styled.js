import styled from "styled-components";

export const RunContainer = styled.div`
    height: 100vh;
    overflow-y: hidden;

    .controls {
        position: absolute;

        bottom: 50px;

        width: 100%;

        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
    }

    p,
    button {
        display: flex;
        justify-content: center;
        align-items: center;

        font-family: "hack-NF";

        transform: translate(0, -50%);

        border: 3px solid ${(props) => props.theme.mainColors.lightGreen};
        background-color: black;
        color: ${(props) => props.theme.mainColors.lightGreen};
        padding: 15px 0;

        width: 30%;

        text-align: center;

        font-size: 1rem;

        @media (min-width: 768px) {
            width: 30%;
        }
        @media (min-width: 1024px) {
            width: 25%;
        }
        @media (min-width: 1280px) {
            width: 20%;
        }
    }

    button {
        cursor: pointer;
    }

    .nextGenre {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        font-size: 1.5rem;
        width: 50%;

        @media (min-width: 640px) {
            width: 60%;
        }
        @media (min-width: 768px) {
            width: 50%;
        }
        @media (min-width: 1024px) {
            width: 35%;
        }
        @media (min-width: 1280px) {
            width: 30%;
        }
    }
`;
