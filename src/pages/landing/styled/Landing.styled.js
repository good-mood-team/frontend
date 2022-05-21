import styled from "styled-components";

export const LandingContainer = styled.div`
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
    font-family: "hack-NF";
    color: ${(props) => props.theme.mainColors.lightGreen};

    padding: 25px;

    .ascii {
        width: 100%;

        margin-bottom: 25px;

        @media (min-width: 640px) {
            width: 50%;
        }

        @media (min-width: 1024px) {
            width: 35%;
        }
    }

    p {
        margin-bottom: 25px;
        max-width: 100%;

        @media (min-width: 640px) {
            width: 75%;
        }

        @media (min-width: 1024px) {
            width: 50%;
        }

        text-align: justify;
        line-height: 20px;
    }

    .finishedMsg {
        display: flex;
        flex-direction: row;

        .typing {
            margin: 0 !important;
            padding: 0 !important;

            p {
                width: max-content;
            }
        }
    }
`;
