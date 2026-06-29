import {
  Home,
  FileText,
  User,
  Settings,
  X,
  LayoutDashboard,
  LogOut,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Sidebar({
  isOpen,
  onClose,
  user,
  logout
}) {
    const links = [

        {
            link:"/",
            name:"Home",
            icon:<Home size={20}/>
        },
        {
            link:"/dashboard",
            name:"Dashboard",
            icon:<LayoutDashboard size={20}/>
        },
        {
            link:"/profile",
            name:"Profile",
            icon:<User size={20}/>
        },
        {
            link:"/settings",
            name:"Settings",
            icon:<Settings size={20}/>
        },
    ]
  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/50 transition-opacity duration-300 z-40
        ${
          isOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible"
        }`}
      />

      {/* Sidebar */}
      <aside
        onClick={onClose}
        className={`fixed top-0 left-0 h-screen w-full sm:w-72
        bg-background text-foreground shadow-xl
        transition-transform duration-300
        z-50
        ${
          isOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b border-zinc-700">
          <h2 className="font-bold text-lg">
            Resume Builder
          </h2>

          <X
            className="cursor-pointer"
            onClick={onClose}
          />
        </div>

        {/* Links */}
        <nav className="flex flex-col p-3 gap-2">

            {links.map((link,idx)=>(
                <Link 
                    key={idx}
                    to={link.link}
                    onClick={onClose}
                    className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-primary/20"
                >
                    {link.icon}
                    {link.name}
                </Link>
            ))}

        </nav>
        {user &&
        <div className="fixed bottom-0 border-t flex p-3">
            {user.avatar_url?
                <img src={user.avatar_url} className="rounded-full border w-10" alt="Profile avatar"/>
                : 
                <User className="text-white bg-gray rounded-full border"/>
              }
            <div className="leading-4 flex flex-col justify-between w-50 ml-3">
                <h4 className="font-semibold text-foreground">{user?.name}</h4>
                <span className="text-xs text-foreground/50">{user?.email}</span>
            </div>
            <div className="p-2 rounded-lg hover:bg-primary/50">
                <LogOut onClick={()=>logout()} size={20} className="hover:cursor-pointer" alt="logout"/>
            </div>
        </div>
        }
      </aside>
    </>
  );
}