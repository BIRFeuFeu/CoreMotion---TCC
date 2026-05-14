"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Moon, Sun, Bell, Shield, Eye } from "lucide-react";
import { UserProfile } from "@/types/sports";
import { showSuccess } from "@/utils/toast";

const Settings = () => {
  const [isDark, setIsDark] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("userProfile");
    if (saved) setProfile(JSON.parse(saved));
    
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = (checked: boolean) => {
    setIsDark(checked);
    if (checked) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
    showSuccess(`Tema ${checked ? "escuro" : "claro"} ativado!`);
  };

  const toggleNotifications = (checked: boolean) => {
    if (!profile) return;
    const updated = { ...profile, notificationsEnabled: checked };
    setProfile(updated);
    localStorage.setItem("userProfile", JSON.stringify(updated));
    showSuccess(`Notificações ${checked ? "ativadas" : "desativadas"}!`);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex">
      <Sidebar />
      
      <main className="flex-1 ml-20 p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-black tracking-tighter dark:text-white">Configurações</h1>
            <p className="text-gray-500">Personalize sua experiência no CoreMotion</p>
          </div>

          <div className="grid gap-6">
            <Card className="p-6 border-none shadow-sm dark:bg-gray-900">
              <h3 className="font-bold mb-6 flex items-center gap-2 dark:text-white">
                <Eye size={20} className="text-red-600" /> Aparência
              </h3>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base font-bold dark:text-white">Modo Escuro</Label>
                  <p className="text-sm text-gray-500">Altera o visual do site para cores mais escuras</p>
                </div>
                <div className="flex items-center gap-2">
                  {isDark ? <Moon size={18} className="text-gray-400" /> : <Sun size={18} className="text-yellow-500" />}
                  <Switch checked={isDark} onCheckedChange={toggleTheme} />
                </div>
              </div>
            </Card>

            <Card className="p-6 border-none shadow-sm dark:bg-gray-900">
              <h3 className="font-bold mb-6 flex items-center gap-2 dark:text-white">
                <Bell size={20} className="text-red-600" /> Notificações
              </h3>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base font-bold dark:text-white">Alertas do Sistema</Label>
                  <p className="text-sm text-gray-500">Receba avisos sobre novos treinos e eventos</p>
                </div>
                <Switch 
                  checked={profile?.notificationsEnabled ?? true} 
                  onCheckedChange={toggleNotifications} 
                />
              </div>
            </Card>

            <Card className="p-6 border-none shadow-sm dark:bg-gray-900">
              <h3 className="font-bold mb-6 flex items-center gap-2 dark:text-white">
                <Shield size={20} className="text-red-600" /> Privacidade
              </h3>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base font-bold dark:text-white">Perfil Público</Label>
                  <p className="text-sm text-gray-500">Permite que outros atletas vejam suas conquistas</p>
                </div>
                <Switch defaultChecked />
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;