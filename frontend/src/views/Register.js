import React from "react";

import { FirebaseContext } from "../Firebase";
import CredentialsForm from "../components/CredentialsForm";
import TopBar from "../elements/TopBar";

const form = (firebase) => (
  <div>
    <TopBar /> 
    <CredentialsForm action={firebase.register} buttonHint="Register" />
  </div>
);

export default () => (
  <FirebaseContext.Consumer>{form}</FirebaseContext.Consumer>
);
