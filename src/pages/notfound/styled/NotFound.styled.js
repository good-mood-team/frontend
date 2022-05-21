import styled from "styled-components";

export const NotFoundContainer = styled.div`
    height: 100vh;
    background-color: black;

    overflow-x: hidden;
    overflow-y: scroll;

    .init-waiting {
        opacity: 0;
    }

    .init-done {
        opacity: 1;
        transition: all 1s;
    }
`;

export const Container = styled.div`
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    font-family: "hack-NF";
    color: ${(props) => props.theme.mainColors.lightGreen};

    padding: 25px;

    h1 {
        margin-bottom: 50px;
    }

    a {
        color: ${(props) => props.theme.mainColors.lightGreen};
    }
`;
