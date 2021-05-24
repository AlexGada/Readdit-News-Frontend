import React, { Component } from "react";
import * as api from "../api";
import Loader from "./Loader";
import CommentPost from "./CommentPost";
import { Link } from "@reach/router";
import Voter from "./Voter";
import { formatDate } from "../utils/utils";

class CommentList extends Component {
  state = {
    comments: [],
    isLoading: true,
    sort_by: "votes",
    page: 1,
  };

  // on deleting comments there is no refresh/page update or ui exp

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
    const { sort_by, page } = this.state;
    if (sort_by !== prevState.sort_by || page !== prevState.page) {
      this.setState({ isLoading: true });
      this.getComments();
    }
  }

  changePage = (increment) => {
    this.setState((currState) => {
      return { page: currState.page + increment };
    });
  };

  getComments = () => {
    const { article_id } = this.props;
    const { sort_by, page } = this.state;
    api.fetchComments(article_id, sort_by, page).then((comments) => {
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
    const { page } = this.state;
    api
      .deleteComment(value)
      .then(() => {
        api.fetchComments(article_id, page).then((comments) => {
          this.setState({ comments, isLoading: false });
        });
      })
      .catch((err) => {
        this.setState({ err, isLoading: false });
      });
  };
  render() {
    const { comments, isLoading, page } = this.state;
    const { article_id } = this.props;
    return isLoading ? (
      <Loader />
    ) : (
      <main className="CommentList">
        <div className="filters">
          <h4>Filters:</h4>
          <button
            onClick={() => this.getQuery("created_at")}
            className="filterButton"
          >
            Date
          </button>
          <button
            onClick={() => this.getQuery("votes")}
            className="filterButton"
          >
            Votes
          </button>
        </div>
        <CommentPost
          article_id={article_id}
          postNewComment={this.postNewComment}
          path={`/articles/${article_id}`}
        />
        <section>
          <button disabled={page === 1} onClick={() => this.changePage(-1)}>
            {"<"}
          </button>
          <span>{page}</span>
          <button onClick={() => this.changePage(1)}>{">"}</button>
        </section>
        <h4>Comments:</h4>
        {comments.map(({ comment_id, author, votes, created_at, body }) => {
          return (
            <div className="singleComment" key={comment_id}>
              <div className="singleCommentBody">
                <h4>{`Author: ${author}`}</h4>
                <p>{body}</p>
                <h4>{formatDate(created_at)}</h4>
              </div>
              <div className="commentBodySmall">
                <Voter
                  key={`vot${comment_id}`}
                  votes={votes}
                  article_id={article_id}
                />
                {author === "weegembump" ? (
                  <button
                    onClick={this.deleteCommentClick}
                    value={comment_id}
                    className="filterButton"
                  >
                    {" "}
                    Delete Comment
                  </button>
                ) : (
                  <div></div>
                )}
              </div>
            </div>
          );
        })}
        <section>
          <button disabled={page === 1} onClick={() => this.changePage(-1)}>
            {"<"}
          </button>
          <span>{page}</span>
          <button onClick={() => this.changePage(1)}>{">"}</button>
        </section>
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
