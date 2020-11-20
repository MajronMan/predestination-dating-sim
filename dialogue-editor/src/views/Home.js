import React from "react";
  
import Button from "../components/Button";
import { connect } from "react-redux";

import { testServer } from "../store/actions";

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
 

const mapStateToProps = ({ backend, firebase }) => ({
  backend,
  firebase,
});

const mapDispatchToProps = (dispatch) => ({
  testServer: () => dispatch(testServer()),
});

const Home = ({ backend, testServer }) => (
  <div className="Home"> 
    <div>
      <h2>Test connection to server</h2>
      <div>
        <Button onClick={testServer}>TEST</Button>
        <ResponseText response={backend.response} error={backend.error} />
      </div>
    </div>
  </div>
);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
