import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Link } from "@reach/router";
import Voter from "./Voter";
import { formatDate } from "../utils/utils";

const useStyles = makeStyles({
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

export default function ArticleCard(props) {
  const classes = useStyles();
  console.log(props.article);
  // const bull = <span className={classes.bullet}>•</span>;
  // {article} = this.props
  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {props.article.topic}
        </Typography>
        <Link to={`/articles/${props.article.article_id}`}>
          <Typography variant="h5" component="h2">
            <h2>{props.article.title}</h2>
          </Typography>
        </Link>
        <Typography className={classes.pos} color="textSecondary">
          by {props.article.author}
        </Typography>
        <Voter
          key={`vot${props.article.article_id}`}
          votes={props.article.votes}
          article_id={props.article.article_id}
        />
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {props.article.comment_count} comments <br></br>
          posted {formatDate(props.article.created_at)}
        </Typography>
      </CardContent>
    </Card>
  );
}
