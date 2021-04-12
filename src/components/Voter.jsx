import React from "react";
import * as api from "../api";
// import ErrorDisplayer from "./ErrorDisplayer";

class Voter extends React.Component {
  state = {
    voteChange: 0,
    err: null,
  };

  updateVotes = (id, increment) => {
    console.log(id);
    this.setState((currentState) => {
      return {
        voteChange: currentState.voteChange + increment,
      };
    });
    api.changeVotes(id, increment).catch((err) => {
      this.setState((currentState) => {
        return {
          voteChange: currentState.voteChange - increment,
        };
      });
    });
  };
  render() {
    const { article_id, comment_id, votes } = this.props;
    const { voteChange } = this.state;
    console.log(article_id, comment_id);
    return (
      <div>
        <button onClick={() => this.updateVotes(article_id || comment_id, 1)}>
          +
        </button>
        <p className="votes">{votes + voteChange} votes</p>
        <button onClick={() => this.updateVotes(article_id || comment_id, -1)}>
          -
        </button>
      </div>
    );
  }
}

export default Voter;
