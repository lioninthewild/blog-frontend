"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function ProtectedRoute({ children, allowedRole }) {
  const { user, token, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    if (!token || !user) {
      router.push("/login");
      return;
    }

    if (allowedRole && user.role !== allowedRole) {
      if (user.role === "ADMIN") {
        router.push("/dashboard/admin");
      } else {
        router.push("/dashboard/user");
      }
    }
  }, [user, token, loading]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!token || !user) return null;
  if (allowedRole && user.role !== allowedRole) return null;

  return children;
}
