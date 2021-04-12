import React, { Component } from "react";
import * as api from "../api";
import Loader from "./Loader";
import Button from "@material-ui/core/Button";
import CommentPost from "./CommentPost";
import { Link } from "@reach/router";
import Voter from "./Voter";
import { formatDate } from "../utils/utils";

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
  getComments = () => {
    const { article_id } = this.props;
    const { sort_by } = this.state;
    api.fetchComments(article_id, sort_by).then((comments) => {
      this.setState({ comments, isLoading: false });
    });
  };

  postNewComment = (newComment) => {
    this.setState((currState) => {
      return {
        comments: [newComment, ...currState.comments],
      };
    });
  };
  deleteCommentClick = (event) => {
    const { value } = event.target;
    const { article_id } = this.props;
    api
      .deleteComment(value)
      .then(() => {
        api.fetchComments(article_id).then((comments) => {
          this.setState({ comments, isLoading: false });
        });
      })
      .catch((err) => {
        this.setState({ err, isLoading: false });
      });
  };
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
        <CommentPost
          article_id={article_id}
          postNewComment={this.postNewComment}
          path={`/articles/${article_id}`}
        />
        {comments.map(({ comment_id, author, votes, created_at, body }) => {
          return (
            <section key={comment_id}>
              <Link to={`/users/${author}`}>
                <h4>{`Author: ${author}`}</h4>
              </Link>
              <p>{body}</p>
              <h3>{formatDate(created_at)}</h3>
              <Voter
                key={`vot${comment_id}`}
                votes={votes}
                article_id={article_id}
              />
              {author === "weegembump" ? (
                <button onClick={this.deleteCommentClick} value={comment_id}>
                  Delete Comment
                </button>
              ) : (
                <div></div>
              )}
            </section>
          );
        })}
      </main>
    );
  }
}
export default CommentList;

// <CommentCard
//             key={`art${comment_id}`}
//             comment={{
//               article_id,
//               comment_id,
//               author,
//               votes,
//               created_at,
//               body,
//             }}
//           />
