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
        font-family: "hack-NF";

        transform: translate(0, -50%);

        border: 3px solid ${(props) => props.theme.mainColors.lightGreen};
        background-color: black;
        color: ${(props) => props.theme.mainColors.lightGreen};
        padding: 15px;

        text-align: center;

        width: 15%;

        font-size: 1rem;
    }

    button {
        cursor: pointer;
    }
`;

export const LoadingContainer = styled.div`
    height: 100vh;

    overflow-y: hidden;
    background-color: black;

    display: flex;
    justify-content: center;
    align-items: center;

    font-family: "hack-NF";
    color: ${(props) => props.theme.mainColors.lightGreen};

    font-size: 2rem;
`;
