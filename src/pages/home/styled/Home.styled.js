import styled from "styled-components";

export const HomeContainer = styled.div`
    .centered {
        z-index: 100;

        font-family: "hack-NF";
        font-size: 1rem;

        position: absolute;
        bottom: 50px;
        left: 50%;
        transform: translate(-50%, -50%);

        border: 3px solid ${(props) => props.theme.mainColors.lightGreen};
        background-color: black;
        color: ${(props) => props.theme.mainColors.lightGreen};
        padding: 15px;

        text-align: center;

        width: 15%;

        cursor: pointer;
    }
`;
