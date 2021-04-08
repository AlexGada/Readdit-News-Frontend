import React, { Component } from "react";
import * as api from "../api";
import Loader from "./Loader";
import CommentCard from "./CommentCard";

class CommentList extends Component {
  state = {
    comments: [],
    isLoading: true,
  };
  getComments = () => {
    const { article_id } = this.props;
    api.fetchComments(article_id).then((comments) => {
      this.setState({ comments, isLoading: false });
    });
  };

  componentDidMount() {
    this.getComments();
  }

  render() {
    const { comments, isLoading } = this.state;
    console.log(comments);

    return isLoading ? (
      <Loader />
    ) : (
      <main className="ArticleList">
        {comments.map(({ comment_id, author, votes, created_at, body }) => {
          return (
            <CommentCard
              key={`art${comment_id}`}
              comment={{
                comment_id,
                author,
                votes,
                created_at,
                body,
              }}
            />
          );
        })}
      </main>
    );
  }
}

export default CommentList;
