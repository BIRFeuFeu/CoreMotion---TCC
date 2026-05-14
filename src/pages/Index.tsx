"use client";

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UserProfile } from "@/types/sports";

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
    { id: 1, title: "Brasil conquista ouro no Judô em Paris", sport: "Judô", image: "https://images.unsplash.com/photo-1555597673-b21d5c935865?w=800&q=80" },
    { id: 2, title: "Final do campeonato de Jiu-jitsu agita SP", sport: "Jiu-jitsu", image: "https://images.unsplash.com/photo-1552072805-2a9039d00e57?w=800&q=80" },
    { id: 3, title: "Novo recorde na NBA impressiona fãs", sport: "Basquete", image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&q=80" },
    { id: 4, title: "Vôlei brasileiro se prepara para o mundial", sport: "Vôlei", image: "https://images.unsplash.com/photo-1592656670411-591e9c174695?w=800&q=80" },
  ];

  const filteredNews = profile 
    ? news.filter(n => profile.favoriteSports.includes(n.sport as any))
    : news;

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <header className="bg-white p-6 sticky top-0 z-40 border-b border-gray-100">
        <h1 className="text-2xl font-bold text-orange-600">SportHub</h1>
        <p className="text-sm text-gray-500">Olá, {profile?.name || "Atleta"}!</p>
      </header>

      <main className="p-4 space-y-6 max-w-md mx-auto">
        <section className="space-y-4">
          <div className="bg-orange-600 text-white p-6 rounded-3xl shadow-lg">
            <h2 className="text-xl font-bold mb-2">Bem-vindo ao seu Feed</h2>
            <p className="text-orange-100 text-sm">
              Aqui você encontra as últimas novidades do mundo dos esportes que você ama.
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="font-bold text-lg px-1">Notícias para você</h3>
          <div className="space-y-4">
            {filteredNews.map((item) => (
              <Card key={item.id} className="overflow-hidden rounded-2xl border-none shadow-sm">
                <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
                <div className="p-4 space-y-2">
                  <Badge variant="secondary" className="bg-orange-100 text-orange-700 hover:bg-orange-100">
                    {item.sport}
                  </Badge>
                  <h4 className="font-semibold text-gray-900 leading-tight">{item.title}</h4>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  );
};

export default Index;