import API_CALL from "./axiosCall";

export const addComment = async (token, postId, content) => {
  const response = await API_CALL.post(
    `/posts/${postId}/comments`,
    { content },
    { headers: { Authorization: `Bearer ${token}` } },
  );
  return response.data;
};

export const deleteComment = async (token, postId, commentId) => {
  const response = await API_CALL.delete(
    `/posts/${postId}/comments/${commentId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  return response.data;
};
