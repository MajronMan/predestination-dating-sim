import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider as StoreProvider } from "react-redux";
import createSagaMiddleware from "redux-saga";

import * as serviceWorker from "./serviceWorker"; 
import App from "./App";
import reducers from "./store/reducers";
import rootSaga from "./store/sagas";

import "./index.css";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();
const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware));

const store = createStore(reducers, enhancer);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider store={store}> 
        <App /> 
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
