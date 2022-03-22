import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import NotFound from "./pages/notfound/NotFound";

function App() {
    return (
        <Switch>
            <Route exact path="/">
                <Home />
            </Route>

            <Route>
                <NotFound />
            </Route>
        </Switch>
    );
}

export default App;
