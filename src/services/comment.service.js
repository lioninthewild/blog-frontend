import api from "./api";

export const addComment = async (token, postId, content) => {
  const response = await api.post(
    `/posts/${postId}/comments`,
    { content },
    { headers: { Authorization: `Bearer ${token}` } },
  );
  return response.data;
};

export const deleteComment = async (token, postId, commentId) => {
  const response = await api.delete(`/posts/${postId}/comments/${commentId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
