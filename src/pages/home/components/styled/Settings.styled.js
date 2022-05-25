import styled from "styled-components";

export const SettingsContainer = styled.div`
    background-color: black;
    height: 100vh;

    overflow-y: scroll;

    @media (min-width: 1500px) {
        overflow-y: hidden;
    }

    .version {
        position: absolute;
        bottom: 10px;
        left: 10px;

        font-family: "hack-NF";
        color: ${(props) => props.theme.mainColors.lightGreen};
    }
`;

export const Container = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    height: 100%;

    div {
        display: none;

        height: 100%;

        @media (min-width: 1500px) {
            flex-basis: 50%;
            min-width: 750px;
            display: flex;
        }

        color: white;
    }

    .form {
        position: relative;

        @media (max-width: 1500px) {
            width: 100%;
        }

        display: block;
    }
`;

export const FormContainer = styled.div`
    height: 100%;

    display: flex !important;
    flex-direction: column;

    justify-content: center;
    align-items: center;

    * {
        font-family: "hack-NF";
        color: ${(props) => props.theme.mainColors.lightGreen};
    }

    h1 {
        font-size: 2rem;
        margin-bottom: 50px;
    }

    input,
    button,
    video,
    select {
        position: relative;

        padding: 10px 0 10px 0;
        margin: 10px 0 10px 0;

        width: 75%;

        text-align: center;

        border: 3px solid ${(props) => props.theme.mainColors.lightGreen};
        background-color: black;
        outline: none;

        font-size: 1rem;
    }

    input,
    button,
    video,
    select,
    label {
        width: 75%;

        @media (min-width: 768px) {
            width: 50%;
        }
        @media (min-width: 1024px) {
            width: 40%;
        }
        @media (min-width: 1280px) {
            width: 55%;
        }
    }

    label {
        text-align: left;
        margin-top: 15px;
    }

    button {
        margin-top: 100px;
        font-size: 1rem;

        cursor: pointer;
    }
`;
