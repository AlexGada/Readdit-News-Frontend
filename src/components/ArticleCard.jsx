import React from "react";
import { Link } from "@reach/router";
import Voter from "./Voter";
import { formatDate } from "../utils/utils";

export default function ArticleCard(props) {
  return (
    <div className="ArticleCard" key={props.article.title}>
      <div className="ArticleCardMain">
        <Link to={`/articles/${props.article.article_id}`}>
          <h2>{props.article.title}</h2>
        </Link>
        <p>
          <b>{props.article.topic}</b> | posted by{" "}
          <em>{props.article.author}</em>
          <br />
          {formatDate(props.article.created_at)}
        </p>
      </div>
      <div className="ArticleCardSmall">
        {props.article.author === "weegembump" ? (
          <h4>you can't vote on your own article!</h4>
        ) : (
          <Voter
            key={`vot${props.article.comment_id}`}
            votes={props.article.votes}
            article_id={props.article.article_id}
          />
        )}

        <Link to={`/articles/${props.article.article_id}`}>
          {props.article.comment_count} comments <br></br>
        </Link>
      </div>
    </div>
  );
}

//  {
//    props.article.author === "weegembump" ? (
//      <button
//        onClick={props.deleteArticle(props.article.article_id)}
//        value={props.article.comment_id}
//        className="deleteButton"
//      >
//        {" "}
//        Delete Article
//      </button>
//    ) : (
//      <Voter
//        key={`vot${props.article.comment_id}`}
//        votes={props.article.votes}
//        article_id={props.article.article_id}
//      />
//    );
//  }
