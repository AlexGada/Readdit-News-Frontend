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
        <Voter
          key={`vot${props.article.article_id}`}
          votes={props.article.votes}
          article_id={props.article.article_id}
        />
        <Link to={`/articles/${props.article.article_id}`}>
          {props.article.comment_count} comments <br></br>
        </Link>
      </div>
    </div>
  );
}

//   <Card className={classes.root} variant="outlined">
//    <CardContent>
//      <Typography className={classes.title} color="textSecondary" gutterBottom>
//        {props.article.topic}
//      </Typography>
//      <Link to={`/articles/${props.article.article_id}`}>
//        <Typography variant="h5" component="h2">
//          <h2>{props.article.title}</h2>
//        </Typography>
//      </Link>
//      <Typography className={classes.pos} color="textSecondary">
//        by {props.article.author}
//      </Typography>
//      <Voter
//        key={`vot${props.article.article_id}`}
//        votes={props.article.votes}
//        article_id={props.article.article_id}
//      />
//      <Typography className={classes.title} color="textSecondary" gutterBottom>
//        {props.article.comment_count} comments <br></br>
//        posted {formatDate(props.article.created_at)}
//      </Typography>
//    </CardContent>
//  </Card>

// const useStyles = makeStyles({
//   root: {
//     minWidth: 275,
//   },
//   bullet: {
//     display: "inline-block",
//     margin: "0 2px",
//     transform: "scale(0.8)",
//   },
//   title: {
//     fontSize: 14,
//   },
//   pos: {
//     marginBottom: 12,
//   },
// });
//   );
// }
