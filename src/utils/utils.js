export const formatDate = (created_at) => {
  if (created_at) {
    const date = created_at.slice(0, 10);
    const time = created_at.slice(11, 16);
    return `${date} at ${time}`;
  }
};
