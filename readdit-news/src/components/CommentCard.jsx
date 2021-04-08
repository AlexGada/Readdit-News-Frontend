import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
// import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
// import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { formatDate } from "../utils/utils";
import Voter from "./Voter";

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

export default function CommentCard(props) {
  const classes = useStyles();
  // const bull = <span className={classes.bullet}>•</span>;
  console.log(props.comment);
  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {props.comment.author}
        </Typography>
        <Typography variant="body2" component="p">
          {props.comment.body}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          posted {formatDate(props.comment.created_at)}
        </Typography>
        <Voter
          key={`vot${props.comment.comment_id}`}
          votes={props.comment.votes}
          comment_id={props.comment.article_id}
        />
      </CardContent>
    </Card>
  );
}

//add voter
