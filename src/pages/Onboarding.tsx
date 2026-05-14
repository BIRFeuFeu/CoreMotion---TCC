"use client";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Sport, UserRole } from "@/types/sports";
import { showSuccess } from "@/utils/toast";

const sports: Sport[] = ['Judô', 'Jiu-jitsu', 'Basquete', 'Futebol', 'Vôlei'];

const Onboarding = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [role, setRole] = useState<UserRole>("Atleta");
  const [selectedSports, setSelectedSports] = useState<Sport[]>([]);

  const handleFinish = () => {
    if (!name || selectedSports.length === 0) return;
    
    const profile = { name, role, favoriteSports: selectedSports };
    localStorage.setItem("userProfile", JSON.stringify(profile));
    showSuccess(`Bem-vindo ao CoreMotion, ${name}!`);
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 space-y-6 shadow-2xl rounded-3xl border-none">
        <div className="text-center space-y-2">
          <div className="bg-red-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl shadow-red-100">
            <span className="text-white font-black text-4xl italic">C</span>
          </div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tighter">CoreMotion</h1>
          <p className="text-gray-500">Sua nova experiência esportiva</p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Como quer ser chamado?</Label>
            <Input 
              id="name" 
              placeholder="Seu nome" 
              value={name} 
              onChange={(e) => setName(e.target.value)}
              className="rounded-xl focus-visible:ring-red-600"
            />
          </div>

          <div className="space-y-2">
            <Label>Você é:</Label>
            <RadioGroup value={role} onValueChange={(v) => setRole(v as UserRole)} className="flex gap-4">
              {['Atleta', 'Técnico', 'Civil'].map((r) => (
                <div key={r} className="flex items-center space-x-2">
                  <RadioGroupItem value={r} id={r} className="text-red-600 border-red-600" />
                  <Label htmlFor={r}>{r}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="space-y-3">
            <Label>Esportes de interesse:</Label>
            <div className="grid grid-cols-2 gap-3">
              {sports.map((sport) => (
                <div key={sport} className="flex items-center space-x-2 bg-gray-50 p-3 rounded-xl border border-gray-100">
                  <Checkbox 
                    id={sport} 
                    checked={selectedSports.includes(sport)}
                    onCheckedChange={(checked) => {
                      if (checked) setSelectedSports([...selectedSports, sport]);
                      else setSelectedSports(selectedSports.filter(s => s !== sport));
                    }}
                    className="data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600"
                  />
                  <Label htmlFor={sport} className="cursor-pointer">{sport}</Label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Button 
          className="w-full bg-red-600 hover:bg-red-700 text-white rounded-xl h-12 text-lg font-bold shadow-lg shadow-red-100"
          disabled={!name || selectedSports.length === 0}
          onClick={handleFinish}
        >
          Começar Agora
        </Button>
      </Card>
    </div>
  );
};

export default Onboarding;