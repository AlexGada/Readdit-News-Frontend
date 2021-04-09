import React, { Component } from "react";
// import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

class CommentPost extends Component {
  render() {
    return (
      <form>
        <TextField id="standard-basic" label="Add a comment..." />
      </form>
    );
  }
}

export default CommentPost;
