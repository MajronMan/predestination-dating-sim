import React from "react";

import { FirebaseContext } from "../Firebase";
import TopBar from "../elements/TopBar";
import Button from "../components/Button";
import { connect } from "react-redux";

import { testServer, testFirebase } from "../store/actions";

const ResponseText = ({ response, error }) => (
  <p
    style={{
      color: error && "red",
      visibility: !error && !response && "hidden",
      minHeight: "2rem",
    }}
  >
    {response || `${error}`}
  </p>
);

const FirebaseEnabledComponent = ({ response, error, testFirebase }) => (
  <FirebaseContext.Consumer>
    {(firebaseRef) => {
      return (
        <div>
          <h2>Test connection to firebase</h2>
          <div>
            <Button onClick={testFirebase(firebaseRef.storage.ref())}>
              TEST
            </Button>
            <ResponseText response={response} error={error} />
          </div>
        </div>
      );
    }}
  </FirebaseContext.Consumer>
);

const mapStateToProps = ({ backend, firebase }) => ({
  backend,
  firebase,
});

const mapDispatchToProps = (dispatch) => ({
  testServer: () => dispatch(testServer()),
  testFirebase: (storageRef) => () => dispatch(testFirebase(storageRef)),
});

const Home = ({ firebase, backend, testServer, testFirebase }) => (
  <div className="Home">
    <TopBar />
    <div>
      <h2>Test connection to server</h2>
      <div>
        <Button onClick={testServer}>TEST</Button>
        <ResponseText response={backend.response} error={backend.error} />
      </div>
    </div>
    <FirebaseEnabledComponent
      response={firebase.response}
      error={firebase.error}
      testFirebase={testFirebase}
    />
  </div>
);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
