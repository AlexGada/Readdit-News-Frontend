import React, { Component } from "react";
import * as api from "../api";
import ErrorDisplayer from "../components/ErrorDisplayer";
import Loader from "./Loader";
import { formatDate } from "../utils/utils";
import Voter from "./Voter";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
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
    const classes = makeStyles({
      root: {
        minWidth: 275,
      },
      bullet: {
        display: "inline-block",
        margin: "0 2px",
        transform: "scale(0.8)",
      },
      title: {
        fontSize: 14,
      },
      pos: {
        marginBottom: 12,
      },
    });

    const { isLoading, article, err } = this.state;
    const {
      article_id,
      title,
      author,
      body,
      // topic,
      created_at,
      votes,
      comment_count,
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
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <Typography variant="h5" component="h2">
            <h2>{title}</h2>
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            by {author}
          </Typography>
          <Typography variant="body2" component="p">
            {body}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            posted {formatDate(created_at)}
          </Typography>
          <Voter
            key={`vot${article_id}`}
            votes={votes}
            article_id={article_id}
          />
        </CardContent>
        <CardActions>
          <Button size="small">{comment_count}comments</Button>
        </CardActions>
        <CommentList article_id={article_id} />
      </Card>
    );
  }
}

export default SingleArticle;
