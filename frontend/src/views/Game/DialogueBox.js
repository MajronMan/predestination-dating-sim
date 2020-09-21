import React from "react";
import { connect } from "react-redux";
import { getDialogue } from "../../store/actions";

import "./DialogueBox.scss";

const mapStateToProps = ({ dialogue }) => ({
  dialogue: dialogue.response,
});

const mapDispatchToProps = (dispatch) => ({
  getDialogue: () => dispatch(getDialogue("Faithful Encounter")),
});

class DialogueBox extends React.Component {
  componentDidMount() {
    this.props.getDialogue();
    
  }
  render() {
    const {dialogue} = this.props
    const st = (dialogue && dialogue._statements[0]) || {_text: "", _answers: []}
    return (
      <div className="container">
        <p>{st._text}</p>
        <div className="answers">
          {st._answers.map((a, i) => (
            <p key={`dialogue_option_${i}`}>{"> " + a._text}</p>
          ))}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DialogueBox);
