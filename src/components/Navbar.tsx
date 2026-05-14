"use client";

import { Home, Film, Calendar, ShoppingBag, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const location = useLocation();
  
  const navItems = [
    { icon: Home, label: "Início", path: "/" },
    { icon: Film, label: "Mídia", path: "/media" },
    { icon: Calendar, label: "Agenda", path: "/agenda" },
    { icon: ShoppingBag, label: "Marketplace", path: "/marketplace" },
    { icon: User, label: "Perfil", path: "/profile" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-red-600 w-10 h-10 rounded-xl flex items-center justify-center shadow-lg shadow-red-200">
            <span className="text-white font-black text-2xl italic">C</span>
          </div>
          <span className="text-xl font-black tracking-tighter bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
            CoreMotion
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-2 text-sm font-bold transition-colors hover:text-red-600",
                  isActive ? "text-red-600" : "text-gray-600"
                )}
              >
                <item.icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-4">
          <button className="md:hidden p-2 text-gray-600">
            <Home size={24} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;