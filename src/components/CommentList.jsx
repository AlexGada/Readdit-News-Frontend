import React, { Component } from "react";
import * as api from "../api";
import Loader from "./Loader";
import CommentPost from "./CommentPost";
import Voter from "./Voter";
import { formatDate } from "../utils/utils";
import { ReactComponent as Right } from "../images/chevron-circle-right-solid.svg";
import { ReactComponent as Left } from "../images/chevron-circle-left-solid.svg";
import { ReactComponent as Clock } from "../images/clock-solid.svg";
import { ReactComponent as Votes } from "../images/thumbs-up-solid.svg";
class CommentList extends Component {
  state = {
    comments: [],
    isLoading: true,
    sort_by: "votes",
    page: 1,
  };

  getQuery = (event) => {
    const newSortBy = event;
    this.setState(() => {
      return { sort_by: newSortBy };
    });
  };
  componentDidMount() {
    const { article_id } = this.props;
    Promise.all([
      api.fetchArticleById(article_id),
      api.fetchComments(article_id),
    ])
      .then(([article, comments]) => {
        this.setState({ article, comments, isLoading: false });
      })
      .catch((err) => {
        this.setState({ err, isLoading: false });
      });
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
    const { page, sort_by } = this.state;
    api
      .deleteComment(value)
      .then(() => {
        api.fetchComments(article_id, sort_by, page).then((comments) => {
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
            Date <Clock />
          </button>
          <button
            onClick={() => this.getQuery("votes")}
            className="filterButton"
          >
            Votes <Votes />
          </button>
        </div>
        <CommentPost
          article_id={article_id}
          postNewComment={this.postNewComment}
          path={`/articles/${article_id}`}
        />
        <section>
          <button
            disabled={page === 1}
            onClick={() => this.changePage(-1)}
            className="pagination"
          >
            <Left />
          </button>
          <span>{page}</span>
          <button onClick={() => this.changePage(1)} className="pagination">
            <Right />
          </button>
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
                {author === "weegembump" ? (
                  <button
                    onClick={this.deleteCommentClick}
                    value={comment_id}
                    className="deleteButton"
                  >
                    Delete Comment
                  </button>
                ) : (
                  <Voter
                    key={`vot${comment_id}`}
                    votes={votes}
                    article_id={article_id}
                  />
                )}
              </div>
            </div>
          );
        })}
        <section>
          <button
            disabled={page === 1}
            onClick={() => this.changePage(-1)}
            className="pagination"
          >
            <Left />
          </button>
          <span>{page}</span>
          <button onClick={() => this.changePage(1)} className="pagination">
            <Right />
          </button>
        </section>
      </main>
    );
  }
}
export default CommentList;
