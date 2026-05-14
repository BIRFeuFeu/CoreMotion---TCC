"use client";

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Settings, LogOut, Bell, ShieldCheck, Trophy } from "lucide-react";
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
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="bg-orange-600 h-48 relative">
        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
          <div className="w-24 h-24 rounded-full bg-white p-1 shadow-xl">
            <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center text-orange-600">
              <User size={48} />
            </div>
          </div>
        </div>
        <div className="absolute top-6 right-6 text-white">
          <Settings size={24} />
        </div>
      </div>

      <main className="mt-16 p-6 space-y-8 max-w-md mx-auto">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-gray-900">{profile.name}</h2>
          <div className="flex justify-center gap-2">
            <Badge variant="outline" className="border-orange-200 text-orange-700">
              {profile.role}
            </Badge>
            <Badge variant="outline" className="border-blue-200 text-blue-700">
              Nível 1
            </Badge>
          </div>
        </div>

        <section className="space-y-4">
          <h3 className="font-bold text-gray-900">Meus Esportes</h3>
          <div className="flex flex-wrap gap-2">
            {profile.favoriteSports.map((sport) => (
              <Badge key={sport} className="bg-gray-900 text-white px-4 py-1 rounded-full">
                {sport}
              </Badge>
            ))}
          </div>
        </section>

        <section className="space-y-3">
          <h3 className="font-bold text-gray-900">Configurações da Experiência</h3>
          <Card className="divide-y divide-gray-100 border-none shadow-sm rounded-2xl overflow-hidden">
            <div className="p-4 flex items-center justify-between hover:bg-gray-50 cursor-pointer">
              <div className="flex items-center gap-3">
                <Bell size={20} className="text-gray-400" />
                <span className="text-sm font-medium">Notificações de {profile.favoriteSports[0]}</span>
              </div>
              <div className="w-10 h-5 bg-orange-600 rounded-full relative">
                <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full" />
              </div>
            </div>
            <div className="p-4 flex items-center justify-between hover:bg-gray-50 cursor-pointer">
              <div className="flex items-center gap-3">
                <ShieldCheck size={20} className="text-gray-400" />
                <span className="text-sm font-medium">Privacidade do Perfil</span>
              </div>
            </div>
            <div className="p-4 flex items-center justify-between hover:bg-gray-50 cursor-pointer">
              <div className="flex items-center gap-3">
                <Trophy size={20} className="text-gray-400" />
                <span className="text-sm font-medium">Minhas Conquistas</span>
              </div>
            </div>
          </Card>
        </section>

        <Button 
          variant="ghost" 
          className="w-full text-red-500 hover:text-red-600 hover:bg-red-50 rounded-xl"
          onClick={handleLogout}
        >
          <LogOut size={20} className="mr-2" />
          Sair da Conta
        </Button>
      </main>

      <BottomNav />
    </div>
  );
};

export default Profile;