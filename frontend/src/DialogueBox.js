import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./DialogueBox.css";

const currentDialogue = {
  question: "are you dumb, stupid or dumb?",
  answers: ["I love yuo Belle", "Duck my sick", "Omae wa mou shindeiru"],
};

class DialogueBox extends React.Component {
  render() {
    return (
      <div className="container">
        <p>{currentDialogue.question}</p>
        <div className = "answers">
          {currentDialogue.answers.map((a) => (
            <p>{">" + a}</p>
          ))}
        </div>
      </div>
    );  
  }
}

export default DialogueBox;
