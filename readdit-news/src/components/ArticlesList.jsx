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
  };

  getQuery = (event) => {
    const newSortBy = event;
    this.setState(() => {
      return { sort_by: newSortBy };
    });
  };
  componentDidMount() {
    const { topic } = this.props;
    this.getArticles();
  }
  componentDidUpdate(prevProps, prevState) {
    const { topic } = this.props;
    const { sort_by } = this.state;
    if (topic !== prevProps.topic || sort_by !== prevState.sort_by) {
      this.setState({ isLoading: true });
      this.getArticles();
    }
  }

  render() {
    const { articles, isLoading } = this.state;

    return isLoading ? (
      <Loader />
    ) : (
      <main className="ArticleList">
        <h4>Filters:</h4>
        <Button onClick={() => this.getQuery("author")} color="primary">
          Author
        </Button>
        <Button onClick={() => this.getQuery("comment_count")} color="primary">
          Comments
        </Button>
        <Button onClick={() => this.getQuery("votes")} color="primary">
          Votes
        </Button>
        {articles.map(
          ({ article_id, title, topic, author, comment_count, votes }) => {
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
                }}
              />
            );
          }
        )}
      </main>
    );
  }
  getArticles = () => {
    const { topic } = this.props;
    const {
      sort_by,
      order,
      author,
      p,
      limit,
      comment_count,
      votes,
    } = this.state;
    api
      .fetchArticles(topic, sort_by, order, author, p, limit)
      .then((articles) => {
        this.setState({ articles, isLoading: false });
      });
  };
}
export default ArticlesList;
