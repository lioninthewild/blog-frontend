import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { addComment, deleteComment } from "@/services/comment.service";

export const useComments = (refetchPosts) => {
  const { token } = useAuth();
  const [error, setError] = useState("");

  const handleAddComment = async (postId, content) => {
    try {
      await addComment(token, postId, content);
      await refetchPosts();
    } catch (err) {
      setError("Failed to add comment");
    }
  };

  const handleDeleteComment = async (postId, commentId) => {
    try {
      await deleteComment(token, postId, commentId);
      await refetchPosts();
    } catch (err) {
      setError("Failed to delete comment");
    }
  };

  return { handleAddComment, handleDeleteComment, error };
};
