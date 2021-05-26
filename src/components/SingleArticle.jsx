import React, { Component } from "react";
import * as api from "../api";
import ErrorDisplayer from "../components/ErrorDisplayer";
import Loader from "./Loader";
import { formatDate } from "../utils/utils";
import Voter from "./Voter";
import CommentList from "./CommentList";

class SingleArticle extends Component {
  state = {
    article: {},
    isLoading: true,
    err: null,
  };
  componentDidMount() {
    api
      .fetchArticleById(this.props.article_id)
      .then((article) => {
        this.setState({ article, isLoading: false });
      })
      .catch((err) => {
        this.setState({ err, isLoading: false });
      });
  }
  render() {
    const { isLoading, article, err } = this.state;
    const {
      article_id,
      title,
      author,
      body,

      created_at,
      votes,
    } = article;
    if (isLoading) {
      return <Loader />;
    }
    if (err) {
      const { response } = err;
      return (
        <ErrorDisplayer status={response.status} msg={response.data.msg} />
      );
    }

    //EVENTUALLY link to author page
    return (
      <div>
        <div className="singleArticle">
          <h2>{title}</h2>
          <h3>by {author}</h3>
          <h4>posted {formatDate(created_at)}</h4>
          <div className="singleArticleBody">
            <p className="articleBodyMain">{body}</p>
            <div className="articleBodySmall">
              <Voter
                key={`vot${article_id}`}
                votes={votes}
                article_id={article_id}
              />
            </div>
          </div>
        </div>
        <CommentList article_id={article_id} />
      </div>
    );
  }
}

export default SingleArticle;
