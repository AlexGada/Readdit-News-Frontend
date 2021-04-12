import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Title from "./components/Title";
import { Router } from "@reach/router";
import ArticlesList from "./components/ArticlesList";
import SingleArticle from "./components/SingleArticle";
import ErrorDisplayer from "./components/ErrorDisplayer";
// import { UserContext } from "./utils/user";

class App extends React.Component {
  state = {
    loggedInUser: "cooljmessy",
    sort_by: "created_at",
  };
  logout = () => {
    this.setState({ loggedInUser: null });
  };
  render() {
    return (
      <div className="App">
        <Title user={this.state.user} />
        <Navbar />

        <Router className="content">
          <ArticlesList path="/" sort_by={this.state.sort_by} />
          <ArticlesList path="/:topic/articles" sort_by={this.state.sort_by} />
          <SingleArticle
            path="/articles/:article_id"
            user={this.state.loggedInUser}
          />
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
