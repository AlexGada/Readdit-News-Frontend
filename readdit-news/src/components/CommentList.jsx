import React, { Component } from "react";
import * as api from "../api";
import Loader from "./Loader";
import CommentCard from "./CommentCard";
import Button from "@material-ui/core/Button";
import CommentPost from "./CommentPost";

class CommentList extends Component {
  state = {
    comments: [],
    isLoading: true,
    sort_by: "votes",
  };

  getQuery = (event) => {
    const newSortBy = event;
    this.setState(() => {
      return { sort_by: newSortBy };
    });
  };
  componentDidMount() {
    this.getComments();
  }
  componentDidUpdate(prevProps, prevState) {
    const { sort_by } = this.state;
    if (sort_by !== prevState.sort_by) {
      this.setState({ isLoading: true });
      this.getComments();
    }
  }
  render() {
    const { comments, isLoading } = this.state;
    const { article_id } = this.props;
    return isLoading ? (
      <Loader />
    ) : (
      <main className="ArticleList">
        <h4>Filters:</h4>
        <Button onClick={() => this.getQuery("created_at")} color="primary">
          Date
        </Button>
        <Button onClick={() => this.getQuery("votes")} color="primary">
          Votes
        </Button>
        <CommentPost />
        {comments.map(({ comment_id, author, votes, created_at, body }) => {
          return (
            <CommentCard
              key={`art${comment_id}`}
              comment={{
                article_id,
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
  getComments = () => {
    const { article_id } = this.props;
    const { sort_by } = this.state;
    api.fetchComments(article_id, sort_by).then((comments) => {
      this.setState({ comments, isLoading: false });
    });
  };
}

export default CommentList;
