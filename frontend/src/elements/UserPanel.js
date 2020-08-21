import React from "react";
import { connect } from "react-redux";
import CredentialsForm from "../components/CredentialsForm";
import { FirebaseContext } from "../Firebase";

import "./UserPanel.scss";
import Button from "../components/Button";
import { mkClassName } from "../utils/JSX";

const mapStateToProps = ({ user }) => ({ user });

class UserPanel extends React.Component {
  state = { open: false };

  render() {
    const { user } = this.props;
    const { open } = this.state;

    return (
      <div className={mkClassName("UserPanel", this.props.className)}>
        <Button secondary onClick={() => this.setState({ open: !open })} className="UserPanelButton">
          {open ? "Close" : user ? "Account" : "Login"}
        </Button>
        <div className={mkClassName("UserPanelDropdown", !open && "inactive")}>
          <FirebaseContext.Consumer>
            {(firebase) => {
              if (user) {
                return (
                  <div className="UserPanelDetails">
                    <span>{user.email}</span>
                    <Button
                      className="UserPanelLogout"
                      onClick={firebase.logout}
                    >
                      Logout
                    </Button>
                  </div>
                );
              } else {
                return <CredentialsForm action={firebase.login} />;
              }
            }}
          </FirebaseContext.Consumer>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(UserPanel);
