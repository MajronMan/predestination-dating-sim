import React from "react";

import "./CredentialsForm.scss";
import Button from "./Button";

class CredentialsForm extends React.Component {
  state = { email: "", password: "", error: null };
  login = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    this.props.action(email, password, (error) => this.setState({ error }));
  };
  render() {
    const { error } = this.state;
    return (
      <form className="CredentialsForm" onSubmit={this.login}>
        <div className="CredentialsFormField">
          <label className="CredentialsFormLabel">Username</label>
          <input
            type="email"
            onChange={({ target: { value } }) =>
              this.setState({ email: value })
            }
          />
        </div>
        <div className="CredentialsFormField">
        <label className="CredentialsFormLabel">Password</label>
          <input
            type="password"
            onChange={({ target: { value } }) =>
              this.setState({ password: value })
            }
          />
        </div>
        <Button className="CredentialsFormButton">
          {this.props.buttonHint || "Login"}
        </Button>
        <span className="CredentialsFormError">{error && error.message}</span>
      </form>
    );
  }
}

export default CredentialsForm;
