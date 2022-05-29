import styled from "styled-components";

export const ApiLimitContainer = styled.div`
    height: 100vh;

    padding: 50px;

    overflow-y: hidden;
    background-color: black;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    p,
    button {
        font-family: "hack-NF";
        color: ${(props) => props.theme.mainColors.lightGreen};

        font-size: 1.15rem;

        background: none;

        text-align: center;
    }

    p {
        line-height: 20px;

        margin: 10px 0;

        max-width: 50%;
    }

    button {
        text-decoration: underline;
        cursor: pointer;
        border: none;
        outline: none;

        margin: 50px 0;
    }
`;
