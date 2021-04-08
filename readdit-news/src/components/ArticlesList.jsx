import React, { Component } from "react";
import * as api from "../api";
import ArticleCard from "./ArticleCard";
import Loader from "./Loader";
// import Voter from "./Voter";

class ArticlesList extends Component {
  state = {
    articles: [],
    isLoading: true,
  };

  getArticles = () => {
    const { sort_by, topic, order, author, p, limit } = this.props;

    api
      .fetchArticles(topic, sort_by, order, author, p, limit)
      .then((articles) => {
        this.setState({ articles, isLoading: false });
      });
  };

  componentDidMount() {
    const { topic } = this.props;
    this.getArticles();
  }
  componentDidUpdate(prevProps) {
    const { topic, sort_by } = this.props;
    if (topic !== prevProps.topic || sort_by !== prevProps.sort_by) {
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
}

export default ArticlesList;
