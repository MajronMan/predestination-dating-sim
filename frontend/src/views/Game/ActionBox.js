import React from "react";
import "./ActionBox.scss";
import itemIcon from "../../assets/pouchIcon.png";
import fightIcon from "../../assets/fightIcon.png";
import timeIcon from "../../assets/hourglassIcon.png";

class ActionBox extends React.Component {
  render() {
    return (
      <div className="box">
        <img className="actionIcon" src={fightIcon} alt="Fight icon"></img>
        <img className="actionIcon" src={itemIcon} alt="Item icon"></img>
        <img className="actionIcon" src={timeIcon} alt="Time icon"></img>
      </div>
    );
  }
}

export default ActionBox;
