import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import GraphView from "./views/Graph";
import HomeView from "./views/Home";
import EditView from "./views/Edit";
import "./App.scss";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/graph">
            <GraphView />
          </Route>
          <Route path="/edit">
            <EditView />
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
