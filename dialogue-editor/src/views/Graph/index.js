import React from "react";
import { connect } from "react-redux";
import { getDialogue } from "../../store/actions";
import { DataSet, Network } from "vis-network/standalone";
import "vis-network/styles/vis-network.css";
import "./Graph.scss";

const mapStateToProps = ({ dialogue }) => ({
  dialogue: dialogue.response,
});

const mapDispatchToProps = (dispatch) => ({
  getDialogue: () => dispatch(getDialogue("Faithful Encounter")),
});

class GraphView extends React.Component {
  state = { currentStatement: null, graphCreated: false };
  constructor(props) {
    super(props);
    this.networkContainer = null;
  }
  setNetworkContainer = (element) => {
    this.networkContainer = element;
  };
  componentDidMount() {
    this.props.getDialogue();
  }

  componentDidUpdate(prevProps) {
    if (this.props.dialogue && !prevProps.dialogue) {
      this.createGraph();
    }
  }

  createGraph() {
    if (!this.networkContainer) {
      return null;
    }
    const { dialogue } = this.props;

    const options = {
      height: "90%",
    };

    const statementNodes = dialogue._statements.map((s) => ({
      id: s._id,
      label: s._text,
      shape: "box",
      widthConstraint: { maximum: 150 },
      color: "#a0e0f0",
      physics: false,
    }));

    const answerNodes = dialogue._statements
      .map((s) =>
        s._answers.map((a) => ({
          id: a._id,
          label: a._text,
          shape: "box",
          widthConstraint: { maximum: 150 },
          color: "#f0c0e0",
          physics: true,
        }))
      )
      .flat();

    const nodes = new DataSet(statementNodes.concat(answerNodes));

    const statementEdges = dialogue._statements
      .map((s) =>
        s._answers.map((a) => ({
          from: s._id,
          to: a._id,
          arrows: "to",
          color: "#d080c0",
          physics: true,
          length: 300,
        }))
      )
      .flat();

    const answerEdges = dialogue._statements
      .map((s) =>
        s._answers.map((a) => ({
          from: a._id,
          to: a._next,
          arrows: "to",
          color: "#80c0d0",
          physics: true,
          length: 500,
        }))
      )
      .flat();

    const edges = new DataSet(statementEdges.concat(answerEdges));

    // create a network
    const data = {
      nodes: nodes,
      edges: edges,
    };
    return new Network(this.networkContainer, data, options);
  }

  render() {
    const { dialogue } = this.props;
    if (!dialogue) {
      return null;
    }
    return (
      <div className="screen">
        <div id="network" ref={this.setNetworkContainer}></div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GraphView);
