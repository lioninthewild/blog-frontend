"use client";

export default function Pagination({ pagination, onPageChange }) {
  const { page, totalPages } = pagination;

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-4">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="px-3 py-1 text-sm rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-40 disabled:cursor-not-allowed transition"
      >
        Previous
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`px-3 py-1 text-sm rounded transition ${
            p === page
              ? "bg-blue-600 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          {p}
        </button>
      ))}

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className="px-3 py-1 text-sm rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-40 disabled:cursor-not-allowed transition"
      >
        Next
      </button>
    </div>
  );
}
