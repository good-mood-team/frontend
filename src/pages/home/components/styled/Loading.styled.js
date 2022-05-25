import styled from "styled-components";

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
