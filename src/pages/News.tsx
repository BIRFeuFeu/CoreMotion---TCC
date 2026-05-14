"use client";

import React from "react";
import Sidebar from "@/components/Sidebar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Newspaper, Calendar, User, ArrowRight } from "lucide-react";
import { NewsItem } from "@/types/sports";

const News = () => {
  const news: NewsItem[] = [
    {
      id: "1",
      title: "Brasil domina o pódio no Grand Slam de Judô",
      summary: "Atletas brasileiros conquistam 3 ouros e 2 pratas em competição internacional em Paris.",
      content: "",
      sport: "Judô",
      date: "15 Mai 2024",
      image: "https://images.unsplash.com/photo-1555597673-b21d5c935865?w=800&q=80",
      author: "Redação CoreMotion"
    },
    {
      id: "2",
      title: "Nova geração do Basquete brilha na LDB",
      summary: "Torneio de base revela talentos que prometem agitar o cenário nacional nos próximos anos.",
      content: "",
      sport: "Basquete",
      date: "14 Mai 2024",
      image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&q=80",
      author: "Marcos Silva"
    },
    {
      id: "3",
      title: "Jiu-jitsu: As chaves para o Mundial de Long Beach",
      summary: "Análise técnica dos favoritos para as categorias de peso no maior evento da IBJJF.",
      content: "",
      sport: "Jiu-jitsu",
      date: "13 Mai 2024",
      image: "https://images.unsplash.com/photo-1552072805-2a9039d00e57?w=800&q=80",
      author: "Ana Paula"
    },
    {
      id: "4",
      title: "Vôlei: Seleção inicia preparação para a Liga das Nações",
      summary: "Com novidades no elenco, equipe busca o entrosamento ideal para o ciclo olímpico.",
      content: "",
      sport: "Vôlei",
      date: "12 Mai 2024",
      image: "https://images.unsplash.com/photo-1592656670411-591e9c174695?w=800&q=80",
      author: "Ricardo Gomes"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex">
      <Sidebar />
      
      <main className="flex-1 ml-20 p-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-5xl mx-auto space-y-8"
        >
          <div className="flex items-center gap-3">
            <div className="p-3 bg-red-600 rounded-2xl text-white shadow-lg shadow-red-200">
              <Newspaper size={32} />
            </div>
            <div>
              <h1 className="text-4xl font-black tracking-tighter dark:text-white">Notícias</h1>
              <p className="text-gray-500">O que há de novo no mundo dos esportes</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {news.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden border-none shadow-sm hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-900 group cursor-pointer">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3 h-64 md:h-auto overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                    <div className="p-8 md:w-2/3 space-y-4 flex flex-col justify-center">
                      <div className="flex items-center gap-4">
                        <Badge className="bg-red-600 hover:bg-red-700 text-white border-none font-bold">
                          {item.sport}
                        </Badge>
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                          <Calendar size={14} />
                          {item.date}
                        </div>
                      </div>
                      <h2 className="text-2xl font-black text-gray-900 dark:text-white leading-tight group-hover:text-red-600 transition-colors">
                        {item.title}
                      </h2>
                      <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                        {item.summary}
                      </p>
                      <div className="flex items-center justify-between pt-4">
                        <div className="flex items-center gap-2 text-sm font-bold text-gray-700 dark:text-gray-300">
                          <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                            <User size={16} />
                          </div>
                          {item.author}
                        </div>
                        <div className="flex items-center gap-2 text-red-600 font-black text-sm group-hover:translate-x-2 transition-transform">
                          Ler mais <ArrowRight size={18} />
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default News;