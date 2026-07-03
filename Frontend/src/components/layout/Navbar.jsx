import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import ThemeToggle from "../ThemeToggle";
import { Menu, User } from "lucide-react";
import { useState } from "react";
import Sidebar from "./sidebar";
import TopProgressBar from "../TopProgressBar";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 w-full flex flex-col backdrop-blur-xs border-b z-50">
        
        <div className="flex justify-between items-center p-4 w-full">
          <div className="flex gap-4">
            <Menu onClick={() => setIsOpen(true)} className="hover:cursor-pointer" />
            <Link className="flex gap-2 items-center" to="/">
              <img className="h-6 w-6" src="/logo-only.png" alt="Logo" />
              <span className="hidden sm:flex">Resume Builder AI</span>
            </Link>
          </div>

          <div className="flex gap-4">
            {user ? (
              <>
                <div className="h-5 w-8">
                  <Link to="/profile">
                    {user.avatar_url ? (
                      <img src={user.avatar_url} className="rounded-full border" alt="Profile avatar" />
                    ) : (
                      <User className="text-white bg-gray rounded-full border" />
                    )}
                  </Link>
                </div>
                <span className="hidden md:flex">{user.name}</span>
                <button className="hover:cursor-pointer" onClick={logout}>Logout</button>
              </>
            ) : (
              <>
                <Link to="/login">Login</Link>
                <Link to="/signup">Signup</Link>
              </>
            )}
            <ThemeToggle />
          </div>
        </div>

        <TopProgressBar />
      </nav>

      <Sidebar
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        user={user}
        logout={logout}
      />
    </>
  );
}