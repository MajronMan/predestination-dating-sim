import React from "react";
import Gilt from "./Gilt.js";
import DialogueBox from "./DialogueBox.js";
import ActionBox from "./ActionBox.js";
import "./Game.scss";

class GameView extends React.Component {
  render() {
    return (
      <div className="screen">
        <Gilt className="gilt" />
        <DialogueBox className="dialogues" />
        <ActionBox className="actions" />
      </div>
    );
  }
}

export default GameView;
