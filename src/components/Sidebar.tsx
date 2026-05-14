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
        "fixed left-0 top-0 h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-all duration-300 z-50 group",
        isExpanded ? "w-64" : "w-20"
      )}
    >
      <div className="flex flex-col h-full p-4">
        <div className="flex items-center justify-between mb-10">
          <div className={cn("flex items-center gap-3 overflow-hidden transition-all", isExpanded ? "opacity-100" : "opacity-0 w-0")}>
            <div className="bg-red-600 w-10 h-10 rounded-xl flex items-center justify-center shrink-0">
              <span className="text-white font-black text-2xl italic">C</span>
            </div>
            <span className="font-black text-xl tracking-tighter dark:text-white">CoreMotion</span>
          </div>
          
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className={cn(
              "p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all",
              !isExpanded && "opacity-0 group-hover:opacity-100"
            )}
          >
            {isExpanded ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>
        </div>

        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-4 p-3 rounded-xl transition-all relative group/item",
                  isActive 
                    ? "bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-500" 
                    : "text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800"
                )}
              >
                <item.icon size={24} className="shrink-0" />
                <span className={cn(
                  "font-bold whitespace-nowrap transition-all",
                  isExpanded ? "opacity-100" : "opacity-0 w-0"
                )}>
                  {item.label}
                </span>
                
                {!isExpanded && (
                  <div className="absolute left-full ml-6 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover/item:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
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
          className="flex items-center gap-4 p-3 rounded-xl text-gray-500 hover:bg-red-50 hover:text-red-600 transition-all mt-auto"
        >
          <LogOut size={24} className="shrink-0" />
          <span className={cn(
            "font-bold whitespace-nowrap transition-all",
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