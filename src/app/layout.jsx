import { AuthProvider } from "@/context/AuthContext";
import "./global.css";

export const metadata = {
  title: "Blog App",
  description: "Role-based blog platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
