import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./ActionBox.css";
import itemIcon from "./assets/pouchIcon.png";
import fightIcon from "./assets/fightIcon.png";
import timeIcon from "./assets/hourglassIcon.png";

class ActionBox extends React.Component {
  render() {
    return (
      <div className="box">
        <img className="actionIcon" 
                src={fightIcon}></img>
        <img className="actionIcon"
                src={itemIcon}></img>
        <img className="actionIcon"
                src={timeIcon}></img>
      </div>
    );
  }
}

export default ActionBox;
