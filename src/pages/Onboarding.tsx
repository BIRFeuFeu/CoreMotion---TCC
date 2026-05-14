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
    showSuccess(`Bem-vindo, ${name}!`);
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 space-y-6 shadow-2xl rounded-3xl border-none">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">SportHub</h1>
          <p className="text-gray-500">Personalize sua experiência esportiva</p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Como quer ser chamado?</Label>
            <Input 
              id="name" 
              placeholder="Seu nome" 
              value={name} 
              onChange={(e) => setName(e.target.value)}
              className="rounded-xl"
            />
          </div>

          <div className="space-y-2">
            <Label>Você é:</Label>
            <RadioGroup value={role} onValueChange={(v) => setRole(v as UserRole)} className="flex gap-4">
              {['Atleta', 'Técnico', 'Civil'].map((r) => (
                <div key={r} className="flex items-center space-x-2">
                  <RadioGroupItem value={r} id={r} />
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
                  />
                  <Label htmlFor={sport} className="cursor-pointer">{sport}</Label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Button 
          className="w-full bg-orange-600 hover:bg-orange-700 text-white rounded-xl h-12 text-lg font-semibold"
          disabled={!name || selectedSports.length === 0}
          onClick={handleFinish}
        >
          Começar Jornada
        </Button>
      </Card>
    </div>
  );
};

export default Onboarding;