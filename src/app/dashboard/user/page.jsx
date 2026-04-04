"use client";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { usePosts } from "@/hooks/usePosts";
import PostCard from "@/components/PostCard";
import PostForm from "@/components/PostForm";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useRouter } from "next/navigation";

export default function UserDashboard() {
  const { user, logout } = useAuth();
  const { posts, loading, error, handleCreate, handleUpdate, handleDelete } =
    usePosts();
  const [editingPost, setEditingPost] = useState(null);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const handleSubmit = async (title, content) => {
    if (editingPost) {
      await handleUpdate(editingPost.id, title, content);
      setEditingPost(null);
    } else {
      await handleCreate(title, content);
    }
  };

  const userPosts = posts.filter((p) => p.author.id === user?.userId);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <ProtectedRoute allowedRole="USER">
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">My Dashboard</h1>
          <button
            onClick={handleLogout}
            className="text-sm bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 transition"
          >
            Logout
          </button>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <PostForm
          onSubmit={handleSubmit}
          editingPost={editingPost}
          onCancel={() => setEditingPost(null)}
        />

        <div className="space-y-4">
          <h2 className="font-semibold text-lg">My Posts</h2>
          {userPosts.length === 0 ? (
            <p className="text-gray-500 text-sm">
              No posts yet. Create one above.
            </p>
          ) : (
            userPosts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                currentUserId={user?.userId}
                onDelete={handleDelete}
                onEdit={setEditingPost}
              />
            ))
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
