"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageCircle, Share2, User, Music } from "lucide-react";

const Media = () => {
  const posts = [
    { id: 1, user: "Coach Silva", content: "Treino pesado hoje! 🥋 #jiujitsu #oss", sport: "Jiu-jitsu", likes: "1.2k", comments: "45", image: "https://images.unsplash.com/photo-1552072805-2a9039d00e57?w=800&q=80" },
    { id: 2, user: "Ana Vôlei", content: "Aquele saque perfeito! 🏐 #volei #brasil", sport: "Vôlei", likes: "850", comments: "12", image: "https://images.unsplash.com/photo-1592656670411-591e9c174695?w=800&q=80" },
    { id: 3, user: "Dunk Master", content: "Enterrada do dia 🏀 #nba #basquete", sport: "Basquete", likes: "2.5k", comments: "89", image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&q=80" },
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      
      <main className="h-[calc(100vh-64px)] overflow-y-scroll snap-y snap-mandatory scrollbar-hide">
        {posts.map((post) => (
          <div key={post.id} className="h-[calc(100vh-64px)] w-full flex items-center justify-center snap-start relative">
            <div className="relative w-full max-w-[450px] h-[90%] bg-black rounded-3xl overflow-hidden shadow-2xl border border-gray-800">
              <img src={post.image} className="w-full h-full object-cover opacity-90" alt="content" />
              
              {/* Overlay Info */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-orange-600 border-2 border-white flex items-center justify-center">
                    <User size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-lg">@{post.user}</p>
                    <Badge className="bg-white/20 text-white border-none text-[10px]">{post.sport}</Badge>
                  </div>
                </div>
                <p className="text-sm leading-relaxed">{post.content}</p>
                <div className="flex items-center gap-2 text-xs text-gray-300">
                  <Music size={14} />
                  <span>Som original - {post.user}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="absolute bottom-20 right-4 flex flex-col gap-6 text-white items-center">
                <div className="flex flex-col items-center gap-1 group cursor-pointer">
                  <div className="p-3 bg-white/10 rounded-full backdrop-blur-md group-hover:bg-red-500 transition-colors">
                    <Heart size={28} fill="white" />
                  </div>
                  <span className="text-xs font-bold">{post.likes}</span>
                </div>
                <div className="flex flex-col items-center gap-1 group cursor-pointer">
                  <div className="p-3 bg-white/10 rounded-full backdrop-blur-md group-hover:bg-blue-500 transition-colors">
                    <MessageCircle size={28} />
                  </div>
                  <span className="text-xs font-bold">{post.comments}</span>
                </div>
                <div className="p-3 bg-white/10 rounded-full backdrop-blur-md hover:bg-green-500 transition-colors cursor-pointer">
                  <Share2 size={28} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default Media;