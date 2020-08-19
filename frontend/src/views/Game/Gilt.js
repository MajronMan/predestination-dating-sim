import React from "react";
import locha_source from "../../assets/locha1.jpg";
import "./Gilt.scss";

class Gilt extends React.Component {
  render() {
    return <img className={this.props.className} src={locha_source} alt="Gilt avatar"></img>;
  }
}

export default Gilt;
