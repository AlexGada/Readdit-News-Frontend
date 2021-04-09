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
  p,
  limit
) => {
  const { data } = await request.get("/articles", {
    params: { topic, sort_by, order, author, p, limit },
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

export const fetchComments = async (article_id, sort_by) => {
  const { data } = await request.get(`/articles/${article_id}/comments`, {
    params: { sort_by },
  });
  return data.comments;
};
