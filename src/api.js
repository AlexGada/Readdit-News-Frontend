import axios from "axios";

const request = axios.create({
  baseURL: "https://readdit-news.herokuapp.com/api",
});

export const fetchTopics = async () => {
  const { data } = await request.get("/topics");
  return data.topics;
};

export const fetchArticles = async (
  topic,
  sort_by,
  order,
  author,
  page,
  limit
) => {
  const { data } = await request.get("/articles", {
    params: { topic, sort_by, order, author, p: page, limit },
  });
  return data.articles;
};

export const fetchArticleById = async (article_id) => {
  const { data } = await request.get(`/articles/${article_id}`);
  return data.article;
};

export const changeVotes = (article_id, votes) => {
  return request
    .patch(`/articles/${article_id}`, { inc_votes: votes })
    .then((res) => console.log(res));
};

export const fetchComments = async (article_id, sort_by, page) => {
  const { data } = await request.get(`/articles/${article_id}/comments`, {
    params: { sort_by, p: page },
  });
  return data.comments;
};

export const postComment = (article_id, username, body) => {
  const comment = { username, body };
  return request
    .post(`/articles/${article_id}/comments`, comment)
    .then(({ data }) => {
      return data.comment;
    });
};

export const deleteComment = (comment_id) => {
  return request.delete(`/comments/${comment_id}`);
};

export const deleteArticle = (article_id) => {
  return request.delete(`/articles/${article_id}`);
};
