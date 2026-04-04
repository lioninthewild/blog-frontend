import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  getAllPosts,
  createPost,
  updatePost,
  deletePost,
} from "@/services/post.service";

export const usePosts = () => {
  const { token } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchPosts = async () => {
    try {
      const data = await getAllPosts(token);
      setPosts(data.posts);
    } catch (err) {
      setError("Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchPosts();
  }, [token]);

  const handleCreate = async (title, content) => {
    try {
      await createPost(token, title, content);
      await fetchPosts();
    } catch (err) {
      setError("Failed to create post");
    }
  };

  const handleUpdate = async (id, title, content) => {
    try {
      await updatePost(token, id, title, content);
      await fetchPosts();
    } catch (err) {
      setError("Failed to update post");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deletePost(token, id);
      await fetchPosts();
    } catch (err) {
      setError("Failed to delete post");
    }
  };

  return { posts, loading, error, handleCreate, handleUpdate, handleDelete };
};
