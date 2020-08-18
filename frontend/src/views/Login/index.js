import React from "react";


import { FirebaseContext } from "../../Firebase";
import LoginForm from "./Form";
import TopBar from "../../elements/TopBar";

const form = (firebase) => (
  <div>
    <TopBar />
    <LoginForm action={firebase.login} buttonHint="No dalej zaloguj się" />
    <LoginForm action={firebase.register} buttonHint="Rejestruj bro" />
  </div>
);

export default () => (
  <FirebaseContext.Consumer>
    {form}
  </FirebaseContext.Consumer>
);
