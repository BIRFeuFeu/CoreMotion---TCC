"use client";

import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Home, Film, Calendar, ShoppingBag, User, 
  Settings, ChevronRight, ChevronLeft, LogOut, Newspaper 
} from "lucide-react";
import { cn } from "@/lib/utils";

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const location = useLocation();

  const menuItems = [
    { icon: Home, label: "Início", path: "/" },
    { icon: Newspaper, label: "Notícias", path: "/news" },
    { icon: Film, label: "Mídia", path: "/media" },
    { icon: Calendar, label: "Agenda", path: "/agenda" },
    { icon: ShoppingBag, label: "Marketplace", path: "/marketplace" },
    { icon: User, label: "Perfil", path: "/profile" },
    { icon: Settings, label: "Configurações", path: "/settings" },
  ];

  return (
    <aside 
      className={cn(
        "fixed left-0 top-0 h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-all duration-300 z-50",
        isExpanded ? "w-56" : "w-16"
      )}
    >
      <div className="flex flex-col h-full p-3">
        <div className="flex items-center justify-between mb-8 px-1">
          <div className={cn("flex items-center gap-2 overflow-hidden transition-all", isExpanded ? "opacity-100" : "opacity-0 w-0")}>
            <div className="bg-red-600 w-8 h-8 rounded-lg flex items-center justify-center shrink-0">
              <span className="text-white font-black text-xl italic">C</span>
            </div>
            <span className="font-black text-lg tracking-tighter dark:text-white">CoreMotion</span>
          </div>
          
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all text-gray-500"
          >
            {isExpanded ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
          </button>
        </div>

        <nav className="flex-1 space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 p-2.5 rounded-xl transition-all relative group/item",
                  isActive 
                    ? "bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-500" 
                    : "text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800"
                )}
              >
                <item.icon size={20} className="shrink-0" />
                <span className={cn(
                  "font-bold text-sm whitespace-nowrap transition-all",
                  isExpanded ? "opacity-100" : "opacity-0 w-0"
                )}>
                  {item.label}
                </span>
                
                {!isExpanded && (
                  <div className="absolute left-full ml-4 px-2 py-1 bg-gray-900 text-white text-[10px] rounded opacity-0 group-hover/item:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                    {item.label}
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        <button 
          onClick={() => {
            localStorage.removeItem("userProfile");
            window.location.href = "/onboarding";
          }}
          className="flex items-center gap-3 p-2.5 rounded-xl text-gray-400 hover:bg-red-50 hover:text-red-600 transition-all mt-auto"
        >
          <LogOut size={20} className="shrink-0" />
          <span className={cn(
            "font-bold text-sm whitespace-nowrap transition-all",
            isExpanded ? "opacity-100" : "opacity-0 w-0"
          )}>
            Sair
          </span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;