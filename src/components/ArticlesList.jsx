import React, { Component } from "react";
import * as api from "../api";
import ArticleCard from "./ArticleCard";
import Loader from "./Loader";
import { ReactComponent as Right } from "../images/chevron-circle-right-solid.svg";
import { ReactComponent as Left } from "../images/chevron-circle-left-solid.svg";
import { ReactComponent as Clock } from "../images/clock-solid.svg";
import { ReactComponent as Votes } from "../images/thumbs-up-solid.svg";
import { ReactComponent as Pen } from "../images/pencil-alt-solid.svg";
import { ReactComponent as Comment } from "../images/comment-solid.svg";
// import Voter from "./Voter";

class ArticlesList extends Component {
  state = {
    articles: [],
    isLoading: true,
    sort_by: "created_at",
    page: 1,
  };

  componentDidMount() {
    this.getArticles();
  }
  componentDidUpdate(prevProps, prevState) {
    const { topic } = this.props;
    const { sort_by, page } = this.state;
    if (
      topic !== prevProps.topic ||
      sort_by !== prevState.sort_by ||
      page !== prevState.page
    ) {
      this.setState({ isLoading: true });
      this.getArticles();
    }
  }

  changePage = (increment) => {
    this.setState((currState) => {
      return { page: currState.page + increment };
    });
  };

  render() {
    const { articles, isLoading, page } = this.state;

    return isLoading ? (
      <Loader />
    ) : (
      <main className="ArticleList">
        <div className="filters">
          <h4>Filters:</h4>

          <button
            onClick={() => this.getQuery("created_at")}
            className="filterButton"
          >
            Date <Clock />
          </button>
          <button
            onClick={() => this.getQuery("author")}
            className="filterButton"
          >
            Author <Pen />
          </button>

          <button
            onClick={() => this.getQuery("comment_count")}
            className="filterButton"
          >
            Comments <Comment />
          </button>
          <button
            onClick={() => this.getQuery("votes")}
            className="filterButton"
          >
            Votes <Votes />
          </button>
        </div>
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
        {articles.map(
          ({
            article_id,
            title,
            topic,
            author,
            comment_count,
            votes,
            created_at,
          }) => {
            return (
              <ArticleCard
                key={`art${article_id}`}
                article={{
                  article_id,
                  title,
                  topic,
                  author,
                  comment_count,
                  votes,
                  created_at,
                }}
              />
            );
          }
        )}
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
  getArticles = () => {
    const { topic } = this.props;
    const { sort_by, order, author, page, limit, comment_count, votes } =
      this.state;
    api
      .fetchArticles(topic, sort_by, order, author, page, limit, comment_count)
      .then((articles) => {
        this.setState({ articles, isLoading: false });
      });
  };
  getQuery = (event) => {
    const newSortBy = event;
    this.setState(() => {
      return { sort_by: newSortBy };
    });
  };
}
export default ArticlesList;
