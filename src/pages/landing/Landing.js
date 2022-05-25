/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from "react";
import Typing from "react-typing-animation";
import { isMobile } from "react-device-detect";
import useUserInfos from "../../hooks/useUserInfo";
import CommandInput from "./components/CommandInput";
import { LandingContainer, Container } from "./styled/Landing.styled";

const initialState = {
    age: "",
    gender: "",
    index: 1,
    finished: false,
};

const Landing = () => {
    const { setUserInfos } = useUserInfos();

    const date = new Date();

    const [init, setInit] = useState(false);
    const [ip, setIP] = useState("");

    const [startQuestions, setStartQuestions] = useState(false);
    const [showInput, setShowInput] = useState(false);
    const [showDots, setShowDots] = useState(false);

    const [{ age, gender, index, finished }, setState] = useState(initialState);

    const numValues = Object.keys(initialState).length - 2;

    const questions = [
        {
            name: "age",
            value: age,
            question: "Quel est votre âge ?",
            regex: "([0-9])",
            length: "3",
            errorMsg: "Veuillez entrez un nombre.",
        },
        {
            name: "gender",
            value: gender,
            question: "Quel est votre genre ? [1: Homme / 2: Femme / 3: Autre]",
            regex: "([1-3])",
            length: "1",
            errorMsg:
                "Veuillez entrez le chiffre correspondant à l'option choisie (1, 2 ou 3).",
        },
    ];

    const slicedQuestion = questions.slice(0, index);

    useEffect(() => {
        setInit(true);
        fetch("https://geolocation-db.com/json/")
            .then((r) => r.json())
            .then((r) => setIP(r.IPv4));

        if (finished) {
            setUserInfos({
                age,
                gender,
            });
        }
    }, [age, finished, gender, setUserInfos]);

    const handleStartQuestions = () => {
        setTimeout(() => {
            setStartQuestions(true);
        }, 500);
    };

    const handleGoToApp = () => {
        setShowDots(true);
        setTimeout(() => {
            window.location.href = "/app";
        }, 3000);
    };

    return (
        <LandingContainer>
            <Container className={init ? "init-done" : "init-waiting"}>
                <img
                    src={`${process.env.PUBLIC_URL}/medias/images/ascii_landing.png`}
                    className="ascii"
                    alt="ascii"
                />
                <p>
                    Last Login: {date.toUTCString()} from {ip}
                </p>
                <p>Bienvenue !</p>
                <p>
                    Ce site vous est présenté par Good-Mood. Si vous avez une
                    question ou avez besoin d'aide, n'hésitez pas à nous
                    contacter sur support@good-mood.icu.
                </p>
                <p>
                    Le site a été réalisé dans le cadre d’une expérience
                    scientifique et sociologique à propos de l’impact de
                    différents genres musicaux sur l’humeur. Afin de récupérer
                    un large échantillon de données, nous avons décidé de mettre
                    en place une intelligence artificielle en accès libre
                    capable de reconnaitre les émotions. Il est important de
                    noter que nous ne récupérerons que les résultats de vos
                    "analyses" et que ceux-ci resteront anonymes. Afin de
                    pouvoir donner plus de sens à ces derniers, nous
                    souhaiterions vous poser quelques questions.
                </p>

                {isMobile && (
                    <Typing startDelay={500} speed={35} loop={false}>
                        <p>
                            Le site n'est pas accessible sur mobile ou tablette,
                            veuillez utiliser un ordinateur.
                        </p>
                    </Typing>
                )}
                {!isMobile && (
                    <>
                        <p>
                            /!\ Le site n'est pas fonctionnel sur mobile ou
                            tablette, veuillez utilier un ordinateur. Si vous
                            vous trouvez sur l'un de de ces appareils, vous ne
                            pourrez pas entendre les musiques lors de votre
                            expérience de l'application.
                        </p>

                        <Typing
                            startDelay={500}
                            speed={35}
                            loop={false}
                            onFinishedTyping={handleStartQuestions}
                        >
                            <p>
                                Avant d'accéder au site nous avons besoin de
                                reccueillir quelques informations pour notre
                                projet d'étude.
                            </p>
                        </Typing>

                        {startQuestions && (
                            <>
                                {slicedQuestion.map((el, elIndex) => (
                                    <React.Fragment key={el.name}>
                                        <Typing
                                            speed={35}
                                            loop={false}
                                            onBeforeType={() =>
                                                setShowInput(false)
                                            }
                                            onFinishedTyping={() =>
                                                setShowInput(true)
                                            }
                                        >
                                            <p>{el.question}</p>
                                        </Typing>
                                        {((showInput &&
                                            index - 1 === elIndex) ||
                                            index - 1 > elIndex) && (
                                            <CommandInput
                                                name={el.name}
                                                value={el.value}
                                                numValues={numValues}
                                                index={index}
                                                elIndex={elIndex}
                                                regex={el.regex}
                                                length={el.length}
                                                errorMsg={el.errorMsg}
                                                setState={setState}
                                            />
                                        )}
                                    </React.Fragment>
                                ))}
                            </>
                        )}

                        {finished && (
                            <div className="finishedMsg">
                                <Typing
                                    className="typing"
                                    speed={35}
                                    loop={false}
                                    onFinishedTyping={handleGoToApp}
                                >
                                    <p>
                                        Merci pour vos réponses! Déverouillage
                                        du site
                                    </p>
                                </Typing>
                                {showDots && (
                                    <Typing className="typing" speed={300} loop>
                                        <p>...</p>
                                        <Typing.Backspace count={3} />
                                    </Typing>
                                )}
                            </div>
                        )}
                    </>
                )}
            </Container>
        </LandingContainer>
    );
};

export default Landing;
