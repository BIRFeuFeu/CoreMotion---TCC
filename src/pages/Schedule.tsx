"use client";

import React, { useState, useEffect } from "react";
import BottomNav from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarIcon, MapPin, Users, Plus } from "lucide-react";
import { UserProfile, Event } from "@/types/sports";
import { showSuccess } from "@/utils/toast";

const Schedule = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [events, setEvents] = useState<Event[]>([
    { id: '1', title: 'Treino de Fundamentos', type: 'Treino', sport: 'Basquete', date: 'Hoje, 18:00', location: 'Quadra Central', coach: 'Prof. Marcos', participants: ['João', 'Maria'] },
    { id: '2', title: 'Amistoso: Dragões vs Fênix', type: 'Amistoso', sport: 'Futebol', date: 'Amanhã, 15:00', location: 'Campo Municipal', coach: 'Técnico Ricardo', participants: ['Pedro', 'Lucas', 'Ana'] },
  ]);

  useEffect(() => {
    const saved = localStorage.getItem("userProfile");
    if (saved) setProfile(JSON.parse(saved));
  }, []);

  const handleJoin = (eventId: string) => {
    if (!profile) return;
    setEvents(events.map(e => {
      if (e.id === eventId && !e.participants.includes(profile.name)) {
        showSuccess("Inscrição realizada com sucesso!");
        return { ...e, participants: [...e.participants, profile.name] };
      }
      return e;
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <header className="bg-white p-6 sticky top-0 z-40 border-b border-gray-100 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Agenda</h1>
        {profile?.role === 'Técnico' && (
          <Button size="icon" className="rounded-full bg-orange-600">
            <Plus size={24} />
          </Button>
        )}
      </header>

      <main className="p-4 space-y-4 max-w-md mx-auto">
        {events.map((event) => (
          <Card key={event.id} className="p-5 rounded-2xl border-none shadow-sm space-y-4">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <Badge className={event.type === 'Treino' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}>
                  {event.type}
                </Badge>
                <h3 className="font-bold text-lg">{event.title}</h3>
                <p className="text-sm text-orange-600 font-medium">{event.sport}</p>
              </div>
            </div>

            <div className="space-y-2 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <CalendarIcon size={16} />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                <span>{event.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users size={16} />
                <span>{event.participants.length} inscritos</span>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <div className="flex -space-x-2">
                {event.participants.slice(0, 3).map((p, i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-[10px] font-bold">
                    {p[0]}
                  </div>
                ))}
                {event.participants.length > 3 && (
                  <div className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-[10px] text-gray-500">
                    +{event.participants.length - 3}
                  </div>
                )}
              </div>

              {profile?.role === 'Atleta' && !event.participants.includes(profile.name) && (
                <Button onClick={() => handleJoin(event.id)} className="bg-orange-600 rounded-xl">
                  Inscrever-se
                </Button>
              )}
              
              {profile?.role === 'Civil' && (
                <span className="text-xs text-gray-400 italic">Apenas visualização</span>
              )}
            </div>
          </Card>
        ))}
      </main>

      <BottomNav />
    </div>
  );
};

export default Schedule;