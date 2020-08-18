import React from "react";

import "./Form.css";

class LoginForm extends React.Component {
  state = { email: "", password: "", error: null };
  login = (e) => {
    e.preventDefault();
    const { email, password } = this.state; 
    this.props.action(email, password, (error) => this.setState({ error }));
  };
  render() {
    const { error } = this.state;
    return (
      <div className="LoginForm">
        <input
          type="email"
          onChange={({ target: { value } }) => this.setState({ email: value })}
        ></input>
        <input
          type="password"
          onChange={({ target: { value } }) =>
            this.setState({ password: value })
          }
        ></input>
        <button onClick={this.login}>{this.props.buttonHint || "Login"}</button>
        {error && <span className="LoginFormError">{error.message}</span>}
      </div>
    );
  }
}

export default LoginForm;
