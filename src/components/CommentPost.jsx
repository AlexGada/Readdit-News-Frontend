import React, { Component } from "react";

import * as api from "../api";
import ErrorDisplayer from "./ErrorDisplayer";

// remove material ui and fix post comments add bland items and then css the rest

class CommentPost extends Component {
  state = {
    body: "",
    username: "weegembump",
    err: null,
    isLoading: true,
  };

  handleChange = (event) => {
    const { value } = event.target;
    this.setState({ body: value });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    const { username, body } = this.state;
    const { article_id } = this.props;

    api
      .postComment(article_id, username, body)
      .then((newComment) => {
        this.setState({ body: "" });
        this.props.postNewComment(newComment);
      })
      .catch((err) => {
        this.setState({ err, isLoading: false });
      });
  };

  render() {
    const { err } = this.state;

    if (err) {
      const { response } = err;
      return <ErrorDisplayer status={response.status} msg={response.msg} />;
    }
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Post Comment:
          <br />
          <textarea
            value={this.state.body}
            onChange={this.handleChange}
            type="text"
            placeholder="Type your comment here..."
            className="postComment"
          ></textarea>
          <br />
          <input type="submit" value="Post Comment!" className="submitButton" />
        </label>
      </form>
    );
  }
}

export default CommentPost;
