"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar as CalendarIcon, MapPin, Users, Plus, Clock } from "lucide-react";
import { UserProfile, Event, Sport } from "@/types/sports";
import { showSuccess, showError } from "@/utils/toast";
import { cn } from "@/lib/utils";

const Schedule = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Form state for new event
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
        { id: '2', title: 'Amistoso: Dragões vs Fênix', type: 'Amistoso', sport: 'Futebol', date: '2024-05-21 15:00', location: 'Campo Municipal', coach: 'Técnico Ricardo', participants: ['Pedro', 'Lucas', 'Ana'] },
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
    showSuccess("Evento agendado com sucesso!");
    
    // Reset form
    setNewTitle("");
    setNewDate("");
    setNewLocation("");
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Agenda Esportiva</h1>
            <p className="text-gray-500">Gerencie seus treinos e competições</p>
          </div>

          {profile?.role === 'Técnico' && (
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-orange-600 hover:bg-orange-700 rounded-xl gap-2">
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
                    <Input placeholder="Ex: Treino de Defesa" value={newTitle} onChange={e => setNewTitle(e.target.value)} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Esporte</Label>
                      <Select value={newSport} onValueChange={(v: Sport) => setNewSport(v)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {['Judô', 'Jiu-jitsu', 'Basquete', 'Futebol', 'Vôlei'].map(s => (
                            <SelectItem key={s} value={s}>{s}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Tipo</Label>
                      <Select value={newType} onValueChange={(v: any) => setNewType(v)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Treino">Treino</SelectItem>
                          <SelectItem value="Amistoso">Amistoso</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Data e Hora</Label>
                    <Input type="datetime-local" value={newDate} onChange={e => setNewDate(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Local</Label>
                    <Input placeholder="Ex: Ginásio Principal" value={newLocation} onChange={e => setNewLocation(e.target.value)} />
                  </div>
                </div>
                <Button onClick={handleAddEvent} className="w-full bg-orange-600">Confirmar Agendamento</Button>
              </DialogContent>
            </Dialog>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <Card key={event.id} className="p-6 rounded-2xl border-none shadow-sm hover:shadow-md transition-all bg-white flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <Badge className={cn(
                    "border-none",
                    event.type === 'Treino' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                  )}>
                    {event.type}
                  </Badge>
                  <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">{event.sport}</span>
                </div>

                <div>
                  <h3 className="font-bold text-xl text-gray-900 mb-1">{event.title}</h3>
                  <p className="text-sm text-gray-500">Organizado por: {event.coach}</p>
                </div>

                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-gray-400" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-gray-400" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users size={16} className="text-gray-400" />
                    <span>{event.participants.length} participantes confirmados</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-50 flex items-center justify-between">
                <div className="flex -space-x-2">
                  {event.participants.slice(0, 4).map((p, i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-orange-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-orange-700">
                      {p[0]}
                    </div>
                  ))}
                  {event.participants.length > 4 && (
                    <div className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-[10px] text-gray-500">
                      +{event.participants.length - 4}
                    </div>
                  )}
                </div>

                {profile?.role === 'Atleta' && !event.participants.includes(profile.name) && (
                  <Button onClick={() => handleJoin(event.id)} className="bg-orange-600 hover:bg-orange-700 rounded-xl px-6">
                    Participar
                  </Button>
                )}
                
                {profile?.role === 'Atleta' && event.participants.includes(profile.name) && (
                  <Badge className="bg-green-100 text-green-700 border-none px-4 py-1.5">Inscrito</Badge>
                )}

                {profile?.role === 'Civil' && (
                  <span className="text-xs text-gray-400 italic">Apenas visualização</span>
                )}
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Schedule;