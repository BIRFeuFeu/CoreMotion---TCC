"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Image as ImageIcon, Video, Send } from "lucide-react";
import { Sport } from "@/types/sports";
import { showSuccess, showError } from "@/utils/toast";

interface CreatePostDialogProps {
  onPostCreated: (post: any) => void;
}

const CreatePostDialog = ({ onPostCreated }: CreatePostDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState("");
  const [sport, setSport] = useState<Sport>("Futebol");
  const [mediaUrl, setMediaUrl] = useState("");

  const handlePost = () => {
    if (!content || !mediaUrl) {
      showError("Preencha o conteúdo e a URL da mídia!");
      return;
    }

    const profile = JSON.parse(localStorage.getItem("userProfile") || "{}");
    
    const newPost = {
      id: Date.now(),
      user: profile.name || "Usuário",
      content,
      sport,
      likes: "0",
      comments: "0",
      image: mediaUrl,
      date: "Agora"
    };

    onPostCreated(newPost);
    setIsOpen(false);
    setContent("");
    setMediaUrl("");
    showSuccess("Postagem publicada!");
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="fixed bottom-24 right-6 md:right-12 w-14 h-14 rounded-full bg-orange-600 hover:bg-orange-700 shadow-lg z-50 p-0">
          <Plus size={32} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] rounded-3xl">
        <DialogHeader>
          <DialogTitle>Nova Publicação</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label>O que está acontecendo?</Label>
            <Textarea 
              placeholder="Descreva seu treino ou conquista..." 
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="rounded-xl resize-none h-24"
            />
          </div>
          <div className="space-y-2">
            <Label>Esporte</Label>
            <Select value={sport} onValueChange={(v: Sport) => setSport(v)}>
              <SelectTrigger className="rounded-xl">
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
            <Label>URL da Foto ou Vídeo</Label>
            <div className="relative">
              <Input 
                placeholder="https://exemplo.com/imagem.jpg" 
                value={mediaUrl}
                onChange={(e) => setMediaUrl(e.target.value)}
                className="rounded-xl pl-10"
              />
              <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            </div>
          </div>
        </div>
        <Button onClick={handlePost} className="w-full bg-orange-600 hover:bg-orange-700 rounded-xl h-12 gap-2">
          <Send size={18} /> Publicar
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePostDialog;