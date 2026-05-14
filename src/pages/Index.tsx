"use client";

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UserProfile } from "@/types/sports";
import { ArrowRight, TrendingUp, Trophy } from "lucide-react";

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
    { id: 4, title: "Vôlei brasileiro se prepara para o mundial", sport: "Vôlei", date: "3h atrás", image: "https://images.unsplash.com/photo-1592656670411-591e9c174695?w=800&q=80" },
    { id: 5, title: "Libertadores: Confrontos das quartas definidos", sport: "Futebol", date: "1h atrás", image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80" },
  ];

  const filteredNews = profile 
    ? news.filter(n => profile.favoriteSports.includes(n.sport as any))
    : news;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <section className="relative overflow-hidden rounded-3xl bg-red-600 p-8 md:p-12 text-white shadow-xl shadow-red-100">
              <div className="relative z-10 max-w-lg space-y-4">
                <Badge className="bg-white/20 text-white border-none">Destaque CoreMotion</Badge>
                <h1 className="text-4xl md:text-5xl font-black leading-tight tracking-tighter">
                  Sua performance em movimento.
                </h1>
                <p className="text-red-100 text-lg">
                  Acompanhe notícias, agende treinos e conecte-se com a comunidade do {profile?.favoriteSports[0] || "esporte"}.
                </p>
                <button className="bg-white text-red-600 px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-red-50 transition-colors shadow-lg">
                  Explorar Agora <ArrowRight size={20} />
                </button>
              </div>
              <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none">
                <TrendingUp size={300} className="translate-x-20 -translate-y-10" />
              </div>
            </section>

            <section className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Notícias para Você</h2>
                <span className="text-red-600 font-bold cursor-pointer hover:underline">Ver todas</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredNews.map((item) => (
                  <Card key={item.id} className="group overflow-hidden rounded-2xl border-none shadow-sm hover:shadow-md transition-all">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                      <Badge className="absolute top-4 left-4 bg-white/90 text-red-600 hover:bg-white font-bold">
                        {item.sport}
                      </Badge>
                    </div>
                    <div className="p-4 space-y-2">
                      <span className="text-xs text-gray-400">{item.date}</span>
                      <h4 className="font-bold text-gray-900 leading-tight group-hover:text-red-600 transition-colors">
                        {item.title}
                      </h4>
                    </div>
                  </Card>
                ))}
              </div>
            </section>
          </div>

          <div className="space-y-8">
            <Card className="p-6 rounded-2xl border-none shadow-sm bg-white">
              <h3 className="font-bold text-lg mb-4">Sugestões CoreMotion</h3>
              <div className="space-y-4">
                {profile?.favoriteSports.map((sport) => (
                  <div key={sport} className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
                    <div className="w-12 h-12 rounded-lg bg-red-50 flex items-center justify-center text-red-600">
                      <Trophy size={24} />
                    </div>
                    <div>
                      <p className="font-bold text-sm">Comunidade {sport}</p>
                      <p className="text-xs text-gray-500">1.2k membros ativos</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6 rounded-2xl border-none shadow-sm bg-gray-900 text-white">
              <h3 className="font-bold text-lg mb-2">CoreMotion Pro</h3>
              <p className="text-gray-400 text-sm mb-4">Acesse treinos exclusivos e estatísticas avançadas.</p>
              <button className="w-full bg-red-600 py-2 rounded-lg font-bold hover:bg-red-700 transition-colors shadow-lg shadow-red-900/20">
                Assinar Agora
              </button>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;