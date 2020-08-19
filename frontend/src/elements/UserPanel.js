import React from "react";
import { connect } from "react-redux";
import LoginForm from "../views/Login/Form";
import { FirebaseContext } from "../Firebase";

import "./UserPanel.scss"

const mapStateToProps = ({ user }) => ({ user });

class UserPanel extends React.Component {
  state = { dropdownOpen: false };

  renderDropdown = () => (
    <div className="UserPanelDropdown">
      <span>{this.props.user.email}</span>
      <FirebaseContext.Consumer>
        {(firebase) => <button onClick={firebase.logout}>Logout</button>}
      </FirebaseContext.Consumer>
    </div>
  );

  renderForm = () => (
    <div className="UserPanelDropdown">
      <LoginForm />
    </div>
  );

  renderLoggedInPanel = () => {
    if (!this.props.user) {
      return null;
    }
    if (this.state.open) {
      return this.renderDropdown();
    }
    return <button onClick={this.setState({ open: true })}>U</button>;
  };

  renderLoggedOutPanel = () => {};

  render() {
    return (
      <div className="UserPanel">
        {this.renderLoggedInPanel()}
        {this.renderLoggedOutPanel()}
      </div>
    );
  }
}

export default connect(mapStateToProps)(UserPanel);
