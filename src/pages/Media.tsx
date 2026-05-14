"use client";

import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, MessageCircle, Share2, User, Music, Newspaper, PlayCircle } from "lucide-react";
import CreatePostDialog from "@/components/CreatePostDialog";
import { Card } from "@/components/ui/card";

const Media = () => {
  const [posts, setPosts] = useState([
    { id: 1, user: "Coach Silva", content: "Treino pesado hoje! 🥋 #jiujitsu #oss", sport: "Jiu-jitsu", likes: "1.2k", comments: "45", image: "https://images.unsplash.com/photo-1552072805-2a9039d00e57?w=800&q=80" },
    { id: 2, user: "Ana Vôlei", content: "Aquele saque perfeito! 🏐 #volei #brasil", sport: "Vôlei", likes: "850", comments: "12", image: "https://images.unsplash.com/photo-1592656670411-591e9c174695?w=800&q=80" },
  ]);

  const news = [
    { id: 1, title: "Brasil conquista ouro no Judô em Paris", sport: "Judô", date: "2h atrás", image: "https://images.unsplash.com/photo-1555597673-b21d5c935865?w=800&q=80", summary: "Uma vitória histórica que coloca o Brasil no topo do pódio mundial." },
  ];

  const handleNewPost = (newPost: any) => {
    setPosts([newPost, ...posts]);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex">
      <Sidebar />
      
      <main className="flex-1 ml-20">
        <Tabs defaultValue="feed" className="w-full">
          <div className="sticky top-0 z-40 bg-gray-900/80 backdrop-blur-md border-b border-gray-800">
            <TabsList className="w-full justify-center bg-transparent h-14 gap-8">
              <TabsTrigger value="feed" className="data-[state=active]:bg-transparent data-[state=active]:text-red-500 text-gray-400 font-bold text-lg border-b-2 border-transparent data-[state=active]:border-red-500 rounded-none px-4">
                Feed
              </TabsTrigger>
              <TabsTrigger value="news" className="data-[state=active]:bg-transparent data-[state=active]:text-red-500 text-gray-400 font-bold text-lg border-b-2 border-transparent data-[state=active]:border-red-500 rounded-none px-4">
                Notícias
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="feed" className="m-0">
            <div className="h-[calc(100vh-56px)] overflow-y-scroll snap-y snap-mandatory scrollbar-hide">
              {posts.map((post) => (
                <div key={post.id} className="h-[calc(100vh-56px)] w-full flex items-center justify-center snap-start relative">
                  <div className="relative w-full max-w-[450px] h-[95%] bg-black rounded-3xl overflow-hidden shadow-2xl border border-gray-800">
                    <img src={post.image} className="w-full h-full object-cover opacity-90" alt="content" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-red-600 border-2 border-white flex items-center justify-center">
                          <User size={24} />
                        </div>
                        <div>
                          <p className="font-bold text-lg">@{post.user}</p>
                          <Badge className="bg-white/20 text-white border-none text-[10px]">{post.sport}</Badge>
                        </div>
                      </div>
                      <p className="text-sm leading-relaxed">{post.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <CreatePostDialog onPostCreated={handleNewPost} />
          </TabsContent>

          <TabsContent value="news" className="m-0 bg-gray-50 dark:bg-gray-950 min-h-[calc(100vh-56px)] p-8">
            <div className="max-w-4xl mx-auto space-y-6">
              {news.map((item) => (
                <Card key={item.id} className="overflow-hidden border-none shadow-sm bg-white dark:bg-gray-900 rounded-3xl flex flex-col md:flex-row">
                  <div className="md:w-1/3 h-48 md:h-auto relative">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6 md:w-2/3 space-y-3">
                    <Badge className="bg-red-600 text-white border-none font-bold">{item.sport}</Badge>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white leading-tight">{item.title}</h3>
                    <p className="text-gray-500 text-sm line-clamp-2">{item.summary}</p>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Media;