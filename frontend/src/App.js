import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import GameView from "./views/Game";
import HomeView from "./views/Home";
import RegisterView from "./views/Register";
import "./App.scss";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/game">
            <GameView />
          </Route>
          <Route path="/register">
            <RegisterView />
          </Route>
          <Route path="/">
            <HomeView />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
