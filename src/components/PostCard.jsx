"use client";
import CommentSection from "./CommentSection";

export default function PostCard({
  post,
  currentUserId,
  currentUserRole,
  onDelete,
  onEdit,
  onAddComment,
  onDeleteComment,
}) {
  const isOwner = post.author.id === currentUserId;

  return (
    <div className="bg-white rounded-lg shadow-sm border p-5 space-y-2">
      <h2 className="text-lg font-semibold">{post.title}</h2>
      <p className="text-gray-600 text-sm">{post.content}</p>
      <p className="text-xs text-gray-400">By {post.author.email}</p>

      {isOwner && (
        <div className="flex gap-2 pt-2">
          <button
            onClick={() => onEdit(post)}
            className="text-sm px-3 py-1 bg-yellow-400 rounded hover:bg-yellow-500 transition"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(post.id)}
            className="text-sm px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Delete
          </button>
        </div>
      )}

      <CommentSection
        post={post}
        currentUserId={currentUserId}
        currentUserRole={currentUserRole}
        onAddComment={onAddComment}
        onDeleteComment={onDeleteComment}
      />
    </div>
  );
}
