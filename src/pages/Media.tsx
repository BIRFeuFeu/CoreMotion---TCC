"use client";

import React from "react";
import BottomNav from "@/components/BottomNav";
import { Heart, MessageCircle, Share2, User } from "lucide-react";

const Media = () => {
  const posts = [
    { id: 1, user: "Coach Silva", type: "video", content: "Treino pesado hoje! 🥋", sport: "Jiu-jitsu", likes: "1.2k", image: "https://images.unsplash.com/photo-1552072805-2a9039d00e57?w=800&q=80" },
    { id: 2, user: "Ana Vôlei", type: "photo", content: "Aquele saque perfeito! 🏐", sport: "Vôlei", likes: "850", image: "https://images.unsplash.com/photo-1592656670411-591e9c174695?w=800&q=80" },
    { id: 3, user: "Dunk Master", type: "video", content: "Enterrada do dia 🏀", sport: "Basquete", likes: "2.5k", image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&q=80" },
  ];

  return (
    <div className="h-screen bg-black overflow-y-scroll snap-y snap-mandatory pb-16">
      {posts.map((post) => (
        <div key={post.id} className="h-screen w-full relative snap-start flex items-center justify-center">
          <img src={post.image} className="absolute inset-0 w-full h-full object-cover opacity-80" alt="content" />
          
          <div className="absolute bottom-24 left-4 right-16 text-white space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center">
                <User size={20} />
              </div>
              <span className="font-bold">@{post.user}</span>
            </div>
            <p className="text-sm">{post.content}</p>
            <span className="text-xs bg-white/20 px-2 py-1 rounded-full">{post.sport}</span>
          </div>

          <div className="absolute bottom-24 right-4 flex flex-col gap-6 text-white items-center">
            <div className="flex flex-col items-center gap-1">
              <div className="p-3 bg-white/10 rounded-full backdrop-blur-md">
                <Heart size={28} fill="white" />
              </div>
              <span className="text-xs font-medium">{post.likes}</span>
            </div>
            <div className="p-3 bg-white/10 rounded-full backdrop-blur-md">
              <MessageCircle size={28} />
            </div>
            <div className="p-3 bg-white/10 rounded-full backdrop-blur-md">
              <Share2 size={28} />
            </div>
          </div>
        </div>
      ))}
      <BottomNav />
    </div>
  );
};

export default Media;