import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import GameView from "./views/Game";
import HomeView from "./views/Home";
import LoginView from "./views/Login";
import "./App.scss";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/game">
            <GameView />
          </Route>
          <Route path="/login">
            <LoginView />
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
