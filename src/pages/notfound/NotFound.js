import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, NotFoundContainer } from "./styled/NotFound.styled";

const NotFound = () => {
    const [init, setInit] = useState(false);

    useEffect(() => {
        setInit(true);
    }, []);

    return (
        <NotFoundContainer>
            <Container className={init ? "init-done" : "init-waiting"}>
                <h1>404 not found.</h1>
                <Link to="/">back to a safer place</Link>
            </Container>
        </NotFoundContainer>
    );
};

export default NotFound;
