import React from "react";

import './Form.css'

class LoginForm extends React.Component {
  state = { email: "", password: "" };
  login = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    console.log("aaaa", email, password);
    this.props.action(email, password);
  };
  render() {
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
      </div>
    );
  }
}



export default LoginForm
