import React from "react";
import { Switch, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Home from "./pages/home/Home";
import Landing from "./pages/landing/Landing";
import NotFound from "./pages/notfound/NotFound";

function App() {
    const theme = {
        mainColors: {
            lightGreen: "#00FF00",
        },
    };

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
