"use client";

import { Home, Film, Calendar, ShoppingBag, User, Trophy } from "lucide-react";
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
          <div className="bg-orange-600 p-1.5 rounded-lg">
            <Trophy className="text-white" size={20} />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            SportHub
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
                  "flex items-center gap-2 text-sm font-medium transition-colors hover:text-orange-600",
                  isActive ? "text-orange-600" : "text-gray-600"
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