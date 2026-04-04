import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/services/auth.service";
import { useAuth } from "@/context/AuthContext";
import { jwtDecode } from "jwt-decode";

export const useLogin = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = async (email, password) => {
    setError("");
    setLoading(true);

    try {
      const data = await loginUser(email, password);
      const decoded = jwtDecode(data.token);

      login(data.token, {
        userId: decoded.userId,
        role: decoded.role,
        email,
      });

      if (decoded.role === "ADMIN") {
        router.push("/dashboard/admin");
      } else {
        router.push("/dashboard/user");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin, error, loading };
};
