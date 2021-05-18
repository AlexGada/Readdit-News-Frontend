import React, { Component } from "react";
import * as api from "../api";
import ArticleCard from "./ArticleCard";
import Loader from "./Loader";
// import Voter from "./Voter";
import Button from "@material-ui/core/Button";

class ArticlesList extends Component {
  state = {
    articles: [],
    isLoading: true,
    sort_by: "created_at",
    page: 1,
  };

  componentDidMount() {
    const { topic } = this.props;
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
          <Button onClick={() => this.getQuery("created_at")} color="primary">
            Date
          </Button>
          <Button onClick={() => this.getQuery("author")} color="primary">
            Author
          </Button>
          <Button
            onClick={() => this.getQuery("comment_count")}
            color="primary"
          >
            Comments
          </Button>
          <Button onClick={() => this.getQuery("votes")} color="primary">
            Votes
          </Button>
        </div>
        {/* <select name="filters" id="filters">
          Filters
          <option value="Date" onClick={() => this.getQuery("created_at")}>
            Date
          </option>
          <option value="Author" onClick={() => this.getQuery("author")}>
            Author
          </option>
          <option
            value="Comments"
            onClick={() => this.getQuery("comment_count")}
          >
            Comments
          </option>
          <option value="Votes" onClick={() => this.getQuery("votes")}>
            Votes
          </option>
        </select> */}
        <section>
          <button disabled={page === 1} onClick={() => this.changePage(-1)}>
            {"<"}
          </button>
          <span>{this.state.page}</span>
          <button onClick={() => this.changePage(1)}>{">"}</button>
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
          <button disabled={page === 1} onClick={() => this.changePage(-1)}>
            {"<"}
          </button>
          <span>{this.state.page}</span>
          <button onClick={() => this.changePage(1)}>{">"}</button>
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
