"use client";
import { useAuth } from "@/context/AuthContext";
import { usePosts } from "@/hooks/usePosts";
import { useComments } from "@/hooks/useComments";
import ProtectedRoute from "@/components/ProtectedRoute";
import Pagination from "@/components/Pagination";
import CommentSection from "@/components/CommentSection";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const {
    posts,
    pagination,
    loading,
    error,
    handleDelete,
    goToPage,
    fetchPosts,
  } = usePosts();
  const { handleAddComment, handleDeleteComment } = useComments(fetchPosts);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <ProtectedRoute allowedRole="ADMIN">
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p className="text-sm text-gray-500">{user?.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="text-sm bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 transition"
          >
            Logout
          </button>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div className="space-y-4">
          <h2 className="font-semibold text-lg">
            All Posts ({pagination.total})
          </h2>

          {posts.length === 0 ? (
            <p className="text-gray-500 text-sm">No posts found.</p>
          ) : (
            posts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-lg shadow-sm border p-5 space-y-2"
              >
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <h2 className="text-lg font-semibold">{post.title}</h2>
                    <p className="text-gray-600 text-sm">{post.content}</p>
                    <p className="text-xs text-gray-400">
                      By {post.author.email}{" "}
                      <span className="bg-blue-100 text-blue-600 px-1 rounded text-xs ml-1">
                        {post.author.role}
                      </span>
                    </p>
                  </div>

                  <button
                    onClick={() => handleDelete(post.id)}
                    className="text-sm px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition ml-4 shrink-0"
                  >
                    Delete
                  </button>
                </div>

                <CommentSection
                  post={post}
                  currentUserId={user?.userId}
                  currentUserRole={user?.role}
                  onAddComment={handleAddComment}
                  onDeleteComment={handleDeleteComment}
                />
              </div>
            ))
          )}
        </div>

        <Pagination pagination={pagination} onPageChange={goToPage} />
      </div>
    </ProtectedRoute>
  );
}
