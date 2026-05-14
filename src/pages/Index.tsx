"use client";

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UserProfile } from "@/types/sports";
import { ArrowRight, TrendingUp, Trophy } from "lucide-react";
import { motion } from "framer-motion";

const Index = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("userProfile");
    if (!saved) {
      navigate("/onboarding");
    } else {
      setProfile(JSON.parse(saved));
    }
  }, [navigate]);

  const news = [
    { id: 1, title: "Brasil conquista ouro no Judô em Paris", sport: "Judô", date: "2h atrás", image: "https://images.unsplash.com/photo-1555597673-b21d5c935865?w=800&q=80" },
    { id: 2, title: "Final do campeonato de Jiu-jitsu agita SP", sport: "Jiu-jitsu", date: "5h atrás", image: "https://images.unsplash.com/photo-1552072805-2a9039d00e57?w=800&q=80" },
    { id: 3, title: "Novo recorde na NBA impressiona fãs", sport: "Basquete", date: "1d atrás", image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&q=80" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex">
      <Sidebar />
      
      <main className="flex-1 ml-20 p-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          <div className="lg:col-span-2 space-y-6">
            <motion.section 
              whileHover={{ scale: 1.01 }}
              className="relative overflow-hidden rounded-3xl bg-red-600 p-8 md:p-12 text-white shadow-xl shadow-red-100"
            >
              <div className="relative z-10 max-w-lg space-y-4">
                <Badge className="bg-white/20 text-white border-none">Destaque CoreMotion</Badge>
                <h1 className="text-4xl md:text-5xl font-black leading-tight tracking-tighter">
                  Sua performance em movimento.
                </h1>
                <p className="text-red-100 text-lg">
                  Acompanhe notícias, agende treinos e conecte-se com a comunidade.
                </p>
                <button 
                  onClick={() => navigate("/news")}
                  className="bg-white text-red-600 px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-red-50 transition-all shadow-lg active:scale-95"
                >
                  Explorar Agora <ArrowRight size={20} />
                </button>
              </div>
              <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none">
                <TrendingUp size={300} className="translate-x-20 -translate-y-10" />
              </div>
            </motion.section>

            <section className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Notícias para Você</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {news.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="group overflow-hidden rounded-2xl border-none shadow-sm hover:shadow-md transition-all dark:bg-gray-900 cursor-pointer">
                      <div className="relative h-48 overflow-hidden">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <Badge className="absolute top-4 left-4 bg-white/90 text-red-600 font-bold">{item.sport}</Badge>
                      </div>
                      <div className="p-4 space-y-2">
                        <span className="text-xs text-gray-400">{item.date}</span>
                        <h4 className="font-bold text-gray-900 dark:text-white leading-tight group-hover:text-red-600 transition-colors">{item.title}</h4>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </section>
          </div>

          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Card className="p-6 rounded-2xl border-none shadow-sm bg-white dark:bg-gray-900">
                <h3 className="font-bold text-lg mb-4 dark:text-white">Sugestões CoreMotion</h3>
                <div className="space-y-4">
                  {profile?.favoriteSports.map((sport) => (
                    <motion.div 
                      key={sport} 
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors"
                    >
                      <div className="w-12 h-12 rounded-lg bg-red-50 dark:bg-red-900/20 flex items-center justify-center text-red-600">
                        <Trophy size={24} />
                      </div>
                      <div>
                        <p className="font-bold text-sm dark:text-white">Comunidade {sport}</p>
                        <p className="text-xs text-gray-500">1.2k membros ativos</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Index;