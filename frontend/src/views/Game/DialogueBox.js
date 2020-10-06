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
  state = { currentStatement: null };
  componentDidMount() {
    this.props.getDialogue();
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.dialogue && this.props.dialogue) {
      this.setState({ currentStatement: this.props.dialogue._statements[0] });
    }
  }

  progressDialogue = (answer) => () => {
    const newStatement = this.props.dialogue._statements.find(
      (x) => x._id === answer._next
    );
    this.setState({ currentStatement: newStatement });
  };

  render() {
    if (!this.props.dialogue || !this.state.currentStatement) {
      return null;
    }

    const { currentStatement } = this.state;

    return (
      <div className="container">
        <p>{currentStatement._text}</p>
        <div className="answers">
          {currentStatement._answers.map((a, i) => (
            <p key={`dialogue_option_${i}`}>
              <a
                style={{ cursor: "pointer" }}
                onClick={this.progressDialogue(a)}
              >
                {"> " + a._text}
              </a>
            </p>
          ))}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DialogueBox);
