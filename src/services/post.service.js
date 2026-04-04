import api from "./api";

export const getAllPosts = async (token) => {
  const response = await api.get("/posts", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const createPost = async (token, title, content) => {
  const response = await api.post(
    "/posts",
    { title, content },
    { headers: { Authorization: `Bearer ${token}` } },
  );
  return response.data;
};

export const updatePost = async (token, id, title, content) => {
  const response = await api.put(
    `/posts/${id}`,
    { title, content },
    { headers: { Authorization: `Bearer ${token}` } },
  );
  return response.data;
};

export const deletePost = async (token, id) => {
  const response = await api.delete(`/posts/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
