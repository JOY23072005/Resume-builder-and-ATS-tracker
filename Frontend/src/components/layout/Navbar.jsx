import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import ThemeToggle from "../ThemeToggle";
import { Menu, User } from "lucide-react";
import { useState } from "react";
import Sidebar from "./sidebar";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isOpen,setIsOpen] = useState(false);
  return (
    <>
    <nav className="fixed top-0 w-full flex justify-between items-center backdrop-blur-xs p-4 border-b">
      <div className="flex gap-4">
        <Menu onClick={()=>setIsOpen(true)} className="hover:cursor-pointer"/>
        <Link className="flex gap-2  items-center" to="/">
          <img 
                  className="h-6 w-6" 
                  src="/logo-only.png" 
                  alt="Logo"
              />
          <span className="hidden sm:flex">Resume Builder AI</span>
        </Link>
      </div>
      <div className="flex gap-4">
        {user ? (
          <>
            <div className="h-5 w-8">
              <Link to="/profile">
              {user.avatar_url?
                <img src={user.avatar_url} className="rounded-full border" alt="Profile avatar"/>
                : 
                <User className="text-white bg-gray rounded-full border"/>
              }
              </Link>
            </div>
            <span className="hidden md:flex">{user.name}</span>

            <button className="hover:cursor-pointer" onClick={logout}>
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
    <Sidebar
      isOpen={isOpen}
      onClose={()=>setIsOpen(false)}
      user={user}
      logout={logout}
    />
    </>
  );
}