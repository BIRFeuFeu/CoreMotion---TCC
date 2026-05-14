"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, MessageCircle, Share2, User, Music, Newspaper, PlayCircle } from "lucide-react";
import CreatePostDialog from "@/components/CreatePostDialog";
import { Card } from "@/components/ui/card";

const Media = () => {
  const [posts, setPosts] = useState([
    { id: 1, user: "Coach Silva", content: "Treino pesado hoje! 🥋 #jiujitsu #oss", sport: "Jiu-jitsu", likes: "1.2k", comments: "45", image: "https://images.unsplash.com/photo-1552072805-2a9039d00e57?w=800&q=80" },
    { id: 2, user: "Ana Vôlei", content: "Aquele saque perfeito! 🏐 #volei #brasil", sport: "Vôlei", likes: "850", comments: "12", image: "https://images.unsplash.com/photo-1592656670411-591e9c174695?w=800&q=80" },
    { id: 3, user: "Dunk Master", content: "Enterrada do dia 🏀 #nba #basquete", sport: "Basquete", likes: "2.5k", comments: "89", image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&q=80" },
  ]);

  const news = [
    { id: 1, title: "Brasil conquista ouro no Judô em Paris", sport: "Judô", date: "2h atrás", image: "https://images.unsplash.com/photo-1555597673-b21d5c935865?w=800&q=80", summary: "Uma vitória histórica que coloca o Brasil no topo do pódio mundial." },
    { id: 2, title: "Final do campeonato de Jiu-jitsu agita SP", sport: "Jiu-jitsu", date: "5h atrás", image: "https://images.unsplash.com/photo-1552072805-2a9039d00e57?w=800&q=80", summary: "Os melhores lutadores do país se reúnem para a grande final." },
    { id: 3, title: "Novo recorde na NBA impressiona fãs", sport: "Basquete", date: "1d atrás", image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&q=80", summary: "A performance incrível de ontem quebrou marcas de décadas." },
  ];

  const handleNewPost = (newPost: any) => {
    setPosts([newPost, ...posts]);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      
      <Tabs defaultValue="feed" className="w-full">
        <div className="sticky top-16 z-40 bg-gray-900/80 backdrop-blur-md border-b border-gray-800">
          <TabsList className="w-full justify-center bg-transparent h-14 gap-8">
            <TabsTrigger value="feed" className="data-[state=active]:bg-transparent data-[state=active]:text-orange-500 text-gray-400 font-bold text-lg border-b-2 border-transparent data-[state=active]:border-orange-500 rounded-none px-4">
              Feed
            </TabsTrigger>
            <TabsTrigger value="news" className="data-[state=active]:bg-transparent data-[state=active]:text-orange-500 text-gray-400 font-bold text-lg border-b-2 border-transparent data-[state=active]:border-orange-500 rounded-none px-4">
              Notícias
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="feed" className="m-0">
          <main className="h-[calc(100vh-120px)] overflow-y-scroll snap-y snap-mandatory scrollbar-hide">
            {posts.map((post) => (
              <div key={post.id} className="h-[calc(100vh-120px)] w-full flex items-center justify-center snap-start relative">
                <div className="relative w-full max-w-[450px] h-[95%] bg-black rounded-3xl overflow-hidden shadow-2xl border border-gray-800">
                  <img src={post.image} className="w-full h-full object-cover opacity-90" alt="content" />
                  
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
          <CreatePostDialog onPostCreated={handleNewPost} />
        </TabsContent>

        <TabsContent value="news" className="m-0 bg-gray-50 min-h-[calc(100vh-120px)]">
          <div className="container mx-auto px-4 py-8 max-w-4xl space-y-6">
            <div className="flex items-center gap-2 mb-8">
              <Newspaper className="text-orange-600" size={28} />
              <h2 className="text-2xl font-bold text-gray-900">Últimas do Esporte</h2>
            </div>
            
            {news.map((item) => (
              <Card key={item.id} className="overflow-hidden border-none shadow-sm hover:shadow-md transition-all bg-white rounded-3xl flex flex-col md:flex-row">
                <div className="md:w-1/3 h-48 md:h-auto relative">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  <Badge className="absolute top-4 left-4 bg-orange-600 text-white border-none">
                    {item.sport}
                  </Badge>
                </div>
                <div className="p-6 md:w-2/3 space-y-3">
                  <span className="text-xs text-gray-400 font-medium">{item.date}</span>
                  <h3 className="text-xl font-bold text-gray-900 leading-tight hover:text-orange-600 cursor-pointer transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-sm line-clamp-2">
                    {item.summary}
                  </p>
                  <button className="text-orange-600 font-bold text-sm flex items-center gap-1 hover:underline">
                    Ler matéria completa <PlayCircle size={16} />
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Media;