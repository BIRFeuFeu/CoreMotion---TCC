"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Users, Plus, Clock, XCircle } from "lucide-react";
import { UserProfile, Event, Sport } from "@/types/sports";
import { showSuccess, showError } from "@/utils/toast";
import { cn } from "@/lib/utils";

const Schedule = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [newTitle, setNewTitle] = useState("");
  const [newSport, setNewSport] = useState<Sport>("Futebol");
  const [newType, setNewType] = useState<"Treino" | "Amistoso">("Treino");
  const [newDate, setNewDate] = useState("");
  const [newLocation, setNewLocation] = useState("");

  useEffect(() => {
    const savedProfile = localStorage.getItem("userProfile");
    if (savedProfile) setProfile(JSON.parse(savedProfile));

    const savedEvents = localStorage.getItem("events");
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents));
    } else {
      const initialEvents: Event[] = [
        { id: '1', title: 'Treino de Fundamentos', type: 'Treino', sport: 'Basquete', date: '2024-05-20 18:00', location: 'Quadra Central', coach: 'Prof. Marcos', participants: ['João', 'Maria'] },
      ];
      setEvents(initialEvents);
      localStorage.setItem("events", JSON.stringify(initialEvents));
    }
  }, []);

  const handleAddEvent = () => {
    if (!newTitle || !newDate || !newLocation || !profile) {
      showError("Preencha todos os campos!");
      return;
    }

    const event: Event = {
      id: Date.now().toString(),
      title: newTitle,
      sport: newSport,
      type: newType,
      date: newDate,
      location: newLocation,
      coach: profile.name,
      participants: []
    };

    const updatedEvents = [event, ...events];
    setEvents(updatedEvents);
    localStorage.setItem("events", JSON.stringify(updatedEvents));
    setIsDialogOpen(false);
    showSuccess("Evento agendado!");
  };

  const handleJoin = (eventId: string) => {
    if (!profile) return;
    const updatedEvents = events.map(e => {
      if (e.id === eventId && !e.participants.includes(profile.name)) {
        showSuccess("Inscrição realizada!");
        return { ...e, participants: [...e.participants, profile.name] };
      }
      return e;
    });
    setEvents(updatedEvents);
    localStorage.setItem("events", JSON.stringify(updatedEvents));
  };

  const handleLeave = (eventId: string) => {
    if (!profile) return;
    const updatedEvents = events.map(e => {
      if (e.id === eventId) {
        showSuccess("Inscrição cancelada.");
        return { ...e, participants: e.participants.filter(p => p !== profile.name) };
      }
      return e;
    });
    setEvents(updatedEvents);
    localStorage.setItem("events", JSON.stringify(updatedEvents));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex">
      <Sidebar />
      
      <main className="flex-1 ml-20 p-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold dark:text-white">Agenda CoreMotion</h1>
              <p className="text-gray-500">Gerencie seus treinos e competições</p>
            </div>

            {profile?.role === 'Técnico' && (
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-red-600 hover:bg-red-700 rounded-xl gap-2">
                    <Plus size={20} /> Novo Evento
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] rounded-3xl">
                  <DialogHeader>
                    <DialogTitle>Agendar Novo Evento</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                      <Label>Título</Label>
                      <Input value={newTitle} onChange={e => setNewTitle(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label>Data e Hora</Label>
                      <Input type="datetime-local" value={newDate} onChange={e => setNewDate(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label>Local</Label>
                      <Input value={newLocation} onChange={e => setNewLocation(e.target.value)} />
                    </div>
                  </div>
                  <Button onClick={handleAddEvent} className="w-full bg-red-600 hover:bg-red-700">Confirmar</Button>
                </DialogContent>
              </Dialog>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <Card key={event.id} className="p-6 rounded-2xl border-none shadow-sm bg-white dark:bg-gray-900 flex flex-col justify-between">
                <div className="space-y-4">
                  <Badge className={cn(
                    "border-none font-bold",
                    event.type === 'Treino' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                  )}>
                    {event.type}
                  </Badge>
                  <h3 className="font-bold text-xl dark:text-white">{event.title}</h3>
                  <div className="space-y-2 text-sm text-gray-500">
                    <div className="flex items-center gap-2"><Clock size={16} /> {event.date}</div>
                    <div className="flex items-center gap-2"><MapPin size={16} /> {event.location}</div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t dark:border-gray-800 flex items-center justify-between">
                  {profile?.role === 'Atleta' && (
                    event.participants.includes(profile.name) ? (
                      <Button variant="outline" onClick={() => handleLeave(event.id)} className="text-red-600 border-red-200 hover:bg-red-50 rounded-xl gap-2">
                        <XCircle size={16} /> Sair
                      </Button>
                    ) : (
                      <Button onClick={() => handleJoin(event.id)} className="bg-red-600 hover:bg-red-700 rounded-xl">Participar</Button>
                    )
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Schedule;