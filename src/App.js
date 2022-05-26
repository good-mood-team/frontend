import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import ReactGA from "react-ga4";
import Home from "./pages/home/Home";
import Landing from "./pages/landing/Landing";
import NotFound from "./pages/notfound/NotFound";

function App() {
    const theme = {
        mainColors: {
            lightGreen: "#00FF00",
        },
    };

    useEffect(() => {
        if (process.env.REACT_APP_PRODUCTION === "true") {
            ReactGA.initialize(process.env.REACT_APP_GA_ID);
            ReactGA.send({
                hitType: "pageview",
                page: window.location + window.location.search,
            });
        }
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <Switch>
                <Route exact path="/">
                    <Landing />
                </Route>

                <Route exact path="/app">
                    <Home />
                </Route>

                <Route>
                    <NotFound />
                </Route>
            </Switch>
        </ThemeProvider>
    );
}

export default App;
