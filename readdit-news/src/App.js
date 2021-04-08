import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Title from "./components/Title";
import { Router } from "@reach/router";
import ArticlesList from "./components/ArticlesList";
import SingleArticle from "./components/SingleArticle";
import ErrorDisplayer from "./components/ErrorDisplayer";

class App extends React.Component {
  state = {
    sort_by: "created_at",
  };

  getQuery = (event) => {
    const newSortBy = event.target.value;
    this.setState(() => {
      return { sort_by: newSortBy };
    });
  };

  render() {
    return (
      <div className="App">
        <Title />
        <Navbar getQuery={this.getQuery} />

        <Router className="content">
          <ArticlesList path="/" sort_by={this.state.sort_by} />
          <ArticlesList path="/:topic/articles" sort_by={this.state.sort_by} />
          <SingleArticle path="/articles/:article_id" />
          <ErrorDisplayer
            default
            status={404}
            msg={"Wrong turn! Path not found!"}
          />
        </Router>
      </div>
    );
  }
}

export default App;
