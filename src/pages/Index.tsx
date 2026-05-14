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
      
      <main className="flex-1 ml-16 p-6 md:p-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8"
        >
          <div className="lg:col-span-3 space-y-8">
            <motion.section 
              whileHover={{ scale: 1.005 }}
              className="relative overflow-hidden rounded-[2.5rem] bg-red-600 p-10 md:p-16 text-white shadow-2xl shadow-red-100/50"
            >
              <div className="relative z-10 max-w-2xl space-y-6">
                <Badge className="bg-white/20 text-white border-none px-4 py-1">Destaque CoreMotion</Badge>
                <h1 className="text-5xl md:text-7xl font-black leading-[1.1] tracking-tighter">
                  Sua performance <br /> em movimento.
                </h1>
                <p className="text-red-100 text-xl max-w-lg">
                  Acompanhe notícias, agende treinos e conecte-se com a comunidade esportiva global.
                </p>
                <button 
                  onClick={() => navigate("/news")}
                  className="bg-white text-red-600 px-8 py-4 rounded-2xl font-black text-lg flex items-center gap-3 hover:bg-red-50 transition-all shadow-xl active:scale-95"
                >
                  Explorar Agora <ArrowRight size={24} />
                </button>
              </div>
              <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
                <TrendingUp size={500} className="translate-x-20 -translate-y-10" />
              </div>
            </motion.section>

            <section className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Notícias para Você</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {news.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="group overflow-hidden rounded-3xl border-none shadow-sm hover:shadow-xl transition-all dark:bg-gray-900 cursor-pointer">
                      <div className="relative h-56 overflow-hidden">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <Badge className="absolute top-4 left-4 bg-white/90 text-red-600 font-bold">{item.sport}</Badge>
                      </div>
                      <div className="p-6 space-y-3">
                        <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">{item.date}</span>
                        <h4 className="font-bold text-xl text-gray-900 dark:text-white leading-tight group-hover:text-red-600 transition-colors">{item.title}</h4>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </section>
          </div>

          <div className="lg:col-span-1 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Card className="p-8 rounded-[2rem] border-none shadow-sm bg-white dark:bg-gray-900">
                <h3 className="font-black text-xl mb-6 dark:text-white tracking-tight">Sugestões</h3>
                <div className="space-y-6">
                  {profile?.favoriteSports.map((sport) => (
                    <motion.div 
                      key={sport} 
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors"
                    >
                      <div className="w-14 h-14 rounded-2xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center text-red-600">
                        <Trophy size={28} />
                      </div>
                      <div>
                        <p className="font-black text-base dark:text-white">Comunidade {sport}</p>
                        <p className="text-sm text-gray-500">1.2k membros</p>
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