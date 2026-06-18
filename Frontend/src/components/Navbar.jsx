import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="flex justify-between backdrop-blur-xs p-4 border-b">
      <Link to="/">
        Resume Builder
      </Link>

      <div className="flex gap-4">
        {user ? (
          <>
            <span>{user.name}</span>

            <button onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">
              Login
            </Link>

            <Link to="/signup">
              Signup
            </Link>
          </>
        )}

        <ThemeToggle/>
      </div>
    </nav>
  );
}