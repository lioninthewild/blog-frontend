"use client";
import { useState } from "react";

export default function CommentSection({
  post,
  currentUserId,
  currentUserRole,
  onAddComment,
  onDeleteComment,
}) {
  const [content, setContent] = useState("");
  const [showComments, setShowComments] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    await onAddComment(post.id, content);
    setContent("");
  };

  return (
    <div className="mt-3 border-t pt-3 space-y-3">
      <button
        onClick={() => setShowComments(!showComments)}
        className="text-sm text-blue-600 hover:underline"
      >
        {showComments ? "Hide" : "Show"} Comments ({post.comments?.length || 0})
      </button>

      {showComments && (
        <div className="space-y-3">
          {post.comments?.length === 0 && (
            <p className="text-xs text-gray-400">No comments yet.</p>
          )}

          {post.comments?.map((comment) => (
            <div
              key={comment.id}
              className="flex justify-between items-start bg-gray-50 rounded p-3"
            >
              <div className="space-y-1">
                <p className="text-sm">{comment.content}</p>
                <p className="text-xs text-gray-400">
                  By {comment.author.email}
                </p>
              </div>

              {(comment.author.id === currentUserId ||
                currentUserRole === "ADMIN") && (
                <button
                  onClick={() => onDeleteComment(post.id, comment.id)}
                  className="text-xs text-red-500 hover:underline ml-4 shrink-0"
                >
                  Delete
                </button>
              )}
            </div>
          ))}

          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write a comment..."
              className="flex-1 border rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-3 py-1.5 rounded-md text-sm hover:bg-blue-700 transition"
            >
              Post
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
