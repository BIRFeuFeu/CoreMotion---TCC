"use client";

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Settings, LogOut, Bell, ShieldCheck, Trophy, Activity, Target } from "lucide-react";
import { UserProfile } from "@/types/sports";

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("userProfile");
    if (saved) setProfile(JSON.parse(saved));
    else navigate("/onboarding");
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("userProfile");
    navigate("/onboarding");
  };

  if (!profile) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <Card className="p-8 rounded-3xl border-none shadow-sm bg-white text-center">
              <div className="relative inline-block mb-4">
                <div className="w-32 h-32 rounded-full bg-red-50 flex items-center justify-center text-red-600 mx-auto border-4 border-white shadow-lg">
                  <User size={64} />
                </div>
                <div className="absolute bottom-0 right-0 bg-green-500 w-6 h-6 rounded-full border-4 border-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{profile.name}</h2>
              <p className="text-gray-500 mb-4 font-medium">{profile.role}</p>
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {profile.favoriteSports.map(s => (
                  <Badge key={s} className="bg-red-50 text-red-600 border-none font-bold">{s}</Badge>
                ))}
              </div>
              <Button variant="outline" className="w-full rounded-xl gap-2 border-gray-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200">
                <Settings size={18} /> Editar Perfil
              </Button>
            </Card>

            <Card className="p-6 rounded-3xl border-none shadow-sm bg-gray-900 text-white">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <Trophy size={18} className="text-red-500" /> Conquistas
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">🥇</div>
                  <div>
                    <p className="text-sm font-bold">Primeiro Treino</p>
                    <p className="text-xs text-gray-400">Concluído em Maio</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <div className="lg:col-span-3 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-6 rounded-2xl border-none shadow-sm bg-white flex items-center gap-4">
                <div className="p-3 bg-red-50 text-red-600 rounded-xl">
                  <Activity size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Treinos</p>
                  <p className="text-2xl font-black">12</p>
                </div>
              </Card>
              <Card className="p-6 rounded-2xl border-none shadow-sm bg-white flex items-center gap-4">
                <div className="p-3 bg-green-50 text-green-600 rounded-xl">
                  <Target size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Meta Semanal</p>
                  <p className="text-2xl font-black">85%</p>
                </div>
              </Card>
              <Card className="p-6 rounded-2xl border-none shadow-sm bg-white flex items-center gap-4">
                <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
                  <Trophy size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Pontos</p>
                  <p className="text-2xl font-black">2.450</p>
                </div>
              </Card>
            </div>

            <section className="space-y-4">
              <h3 className="text-xl font-bold text-gray-900 tracking-tight">Configurações CoreMotion</h3>
              <Card className="divide-y divide-gray-100 border-none shadow-sm rounded-3xl overflow-hidden bg-white">
                <div className="p-6 flex items-center justify-between hover:bg-gray-50 cursor-pointer transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-gray-100 rounded-lg text-gray-600">
                      <Bell size={20} />
                    </div>
                    <div>
                      <p className="font-bold">Notificações</p>
                      <p className="text-sm text-gray-500">Alertas de novos treinos e amistosos</p>
                    </div>
                  </div>
                  <div className="w-12 h-6 bg-red-600 rounded-full relative">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                  </div>
                </div>
              </Card>
            </section>

            <Button 
              variant="ghost" 
              className="text-red-500 hover:text-red-600 hover:bg-red-50 rounded-xl px-8 font-bold"
              onClick={handleLogout}
            >
              <LogOut size={20} className="mr-2" />
              Sair da Conta
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;