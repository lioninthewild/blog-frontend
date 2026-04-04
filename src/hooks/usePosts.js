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
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 5,
    totalPages: 1,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchPosts = async (page = 1) => {
    try {
      setLoading(true);
      const data = await getAllPosts(token, page, pagination.limit);
      setPosts(data.posts);
      setPagination(data.pagination);
    } catch (err) {
      setError("Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchPosts(1);
  }, [token]);

  const handleCreate = async (title, content) => {
    try {
      await createPost(token, title, content);
      await fetchPosts(pagination.page);
    } catch (err) {
      setError("Failed to create post");
    }
  };

  const handleUpdate = async (id, title, content) => {
    try {
      await updatePost(token, id, title, content);
      await fetchPosts(pagination.page);
    } catch (err) {
      setError("Failed to update post");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deletePost(token, id);
      await fetchPosts(pagination.page);
    } catch (err) {
      setError("Failed to delete post");
    }
  };

  const goToPage = (page) => {
    fetchPosts(page);
  };

  return {
    posts,
    pagination,
    loading,
    error,
    handleCreate,
    handleUpdate,
    handleDelete,
    goToPage,
    fetchPosts,
  };
};
