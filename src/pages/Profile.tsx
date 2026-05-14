"use client";

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  User, Settings, Trophy, Mail, Building2, 
  Medal, Swords, Save, GraduationCap, Camera 
} from "lucide-react";
import { UserProfile, Sport } from "@/types/sports";
import { showSuccess } from "@/utils/toast";

const sportsList: Sport[] = ['Judô', 'Jiu-jitsu', 'Basquete', 'Futebol', 'Vôlei'];

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  
  const [editData, setEditData] = useState<Partial<UserProfile>>({});

  useEffect(() => {
    const saved = localStorage.getItem("userProfile");
    if (saved) {
      const p = JSON.parse(saved);
      setProfile(p);
      setEditData(p);
    } else {
      navigate("/onboarding");
    }
  }, [navigate]);

  const handleSaveProfile = () => {
    if (!profile) return;
    const updatedProfile = { ...profile, ...editData } as UserProfile;
    localStorage.setItem("userProfile", JSON.stringify(updatedProfile));
    setProfile(updatedProfile);
    setIsEditDialogOpen(false);
    showSuccess("Perfil atualizado com sucesso!");
  };

  if (!profile) return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex">
      <Sidebar />
      
      <main className="flex-1 ml-16 p-6 md:p-10">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <Card className="p-8 rounded-3xl border-none shadow-sm bg-white dark:bg-gray-900 text-center">
              <div className="relative inline-block mb-4 group">
                <div className="w-32 h-32 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center text-red-600 mx-auto border-4 border-white dark:border-gray-800 shadow-lg overflow-hidden">
                  {profile.avatar ? (
                    <img src={profile.avatar} alt={profile.name} className="w-full h-full object-cover" />
                  ) : (
                    <User size={64} />
                  )}
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">{profile.name}</h2>
              <p className="text-gray-500 mb-4 font-medium">{profile.role}</p>
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {profile.favoriteSports.map(s => (
                  <Badge key={s} className="bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-500 border-none font-bold">{s}</Badge>
                ))}
              </div>
              
              <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full rounded-xl gap-2 border-gray-200 dark:border-gray-800 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20">
                    <Settings size={18} /> Editar Perfil
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px] rounded-3xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Editar Perfil Completo</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-6 py-4">
                    <div className="space-y-2">
                      <Label>URL da Foto de Perfil</Label>
                      <div className="relative">
                        <Input 
                          placeholder="https://exemplo.com/foto.jpg"
                          value={editData.avatar || ""} 
                          onChange={e => setEditData({...editData, avatar: e.target.value})}
                          className="pl-10"
                        />
                        <Camera className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Nome</Label>
                        <Input 
                          value={editData.name} 
                          onChange={e => setEditData({...editData, name: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Contato (Gmail)</Label>
                        <Input 
                          value={editData.contact} 
                          onChange={e => setEditData({...editData, contact: e.target.value})}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Academia / Clube</Label>
                        <Input 
                          value={editData.club} 
                          onChange={e => setEditData({...editData, club: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Faixa Atual (se houver)</Label>
                        <Input 
                          value={editData.currentBelt} 
                          onChange={e => setEditData({...editData, currentBelt: e.target.value})}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Quadro de Medalhas</Label>
                      <Textarea 
                        value={editData.medalBoard} 
                        onChange={e => setEditData({...editData, medalBoard: e.target.value})}
                        placeholder="Ex: 3 Ouros, 2 Pratas..."
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Campeonatos que participou</Label>
                      <Textarea 
                        value={editData.championships} 
                        onChange={e => setEditData({...editData, championships: e.target.value})}
                        placeholder="Ex: Estadual 2023, Copa Brasil..."
                      />
                    </div>

                    <div className="space-y-3">
                      <Label>Esportes Favoritos</Label>
                      <div className="grid grid-cols-3 gap-2">
                        {sportsList.map((sport) => (
                          <div key={sport} className="flex items-center space-x-2 bg-gray-50 dark:bg-gray-800 p-2 rounded-lg">
                            <Checkbox 
                              id={`edit-${sport}`} 
                              checked={editData.favoriteSports?.includes(sport)}
                              onCheckedChange={(checked) => {
                                const current = editData.favoriteSports || [];
                                if (checked) setEditData({...editData, favoriteSports: [...current, sport]});
                                else setEditData({...editData, favoriteSports: current.filter(s => s !== sport)});
                              }}
                            />
                            <Label htmlFor={`edit-${sport}`} className="text-xs cursor-pointer">{sport}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <Button onClick={handleSaveProfile} className="w-full bg-red-600 hover:bg-red-700 rounded-xl gap-2 font-bold">
                    <Save size={18} /> Salvar Alterações
                  </Button>
                </DialogContent>
              </Dialog>
            </Card>
          </div>

          <div className="lg:col-span-3 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6 rounded-2xl border-none shadow-sm bg-white dark:bg-gray-900 flex items-start gap-4">
                <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 rounded-xl">
                  <Medal size={24} />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500 font-medium mb-1">Quadro de Medalhas</p>
                  <p className="text-lg font-bold dark:text-white">{profile.medalBoard || "Nenhuma medalha registrada"}</p>
                </div>
              </Card>
              
              <Card className="p-6 rounded-2xl border-none shadow-sm bg-white dark:bg-gray-900 flex items-start gap-4">
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-xl">
                  <Swords size={24} />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500 font-medium mb-1">Campeonatos</p>
                  <p className="text-lg font-bold dark:text-white">{profile.championships || "Nenhum campeonato registrado"}</p>
                </div>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-6 rounded-2xl border-none shadow-sm bg-white dark:bg-gray-900 space-y-2">
                <div className="flex items-center gap-2 text-red-600 mb-2">
                  <Building2 size={18} />
                  <span className="text-xs font-black uppercase tracking-widest">Clube / Academia</span>
                </div>
                <p className="text-xl font-black dark:text-white">{profile.club || "Não informado"}</p>
              </Card>

              <Card className="p-6 rounded-2xl border-none shadow-sm bg-white dark:bg-gray-900 space-y-2">
                <div className="flex items-center gap-2 text-red-600 mb-2">
                  <GraduationCap size={18} />
                  <span className="text-xs font-black uppercase tracking-widest">Graduação</span>
                </div>
                <p className="text-xl font-black dark:text-white">{profile.currentBelt || "N/A"}</p>
              </Card>

              <Card className="p-6 rounded-2xl border-none shadow-sm bg-white dark:bg-gray-900 space-y-2">
                <div className="flex items-center gap-2 text-red-600 mb-2">
                  <Mail size={18} />
                  <span className="text-xs font-black uppercase tracking-widest">Contato</span>
                </div>
                <p className="text-lg font-bold dark:text-white truncate">{profile.contact || "Não informado"}</p>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;