"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Search, Filter, Star, ShoppingBag, X } from "lucide-react";
import { UserProfile, Product, Sport, Category } from "@/types/sports";
import { showSuccess } from "@/utils/toast";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import CartDrawer from "@/components/CartDrawer";
import { motion, AnimatePresence } from "framer-motion";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const Marketplace = () => {
  const [search, setSearch] = useState("");
  const [selectedSport, setSelectedSport] = useState<Sport | 'Todos'>('Todos');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'Todas'>('Todas');
  const { addToCart } = useCart();
  
  const products: Product[] = [
    // Judô
    { id: 'jd1', name: 'Kimono Adidas Champion II IJF', price: 890, sport: 'Judô', category: 'Vestuário', image: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?w=400&q=80' },
    { id: 'jd2', name: 'Faixa Preta Bordada Silk', price: 120, sport: 'Judô', category: 'Acessórios', image: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?w=400&q=80' },
    { id: 'jd3', name: 'Zori Sandália Japonesa', price: 150, sport: 'Judô', category: 'Calçados', image: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?w=400&q=80' },
    { id: 'jd4', name: 'Protetor Bucal Moldável', price: 45, sport: 'Judô', category: 'Equipamentos', image: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?w=400&q=80' },
    
    // Jiu-jitsu
    { id: 'jj1', name: 'Kimono Venum Elite 2.0', price: 750, sport: 'Jiu-jitsu', category: 'Vestuário', image: 'https://images.unsplash.com/photo-1552072805-2a9039d00e57?w=400&q=80' },
    { id: 'jj2', name: 'Rash Guard Compressão', price: 180, sport: 'Jiu-jitsu', category: 'Vestuário', image: 'https://images.unsplash.com/photo-1552072805-2a9039d00e57?w=400&q=80' },
    { id: 'jj3', name: 'Bolsa de Treino 60L', price: 290, sport: 'Jiu-jitsu', category: 'Acessórios', image: 'https://images.unsplash.com/photo-1552072805-2a9039d00e57?w=400&q=80' },
    { id: 'jj4', name: 'Sabonete Antisséptico Jiu', price: 35, sport: 'Jiu-jitsu', category: 'Acessórios', image: 'https://images.unsplash.com/photo-1552072805-2a9039d00e57?w=400&q=80' },
    
    // Basquete
    { id: 'bq1', name: 'Tênis Nike LeBron XX', price: 1200, sport: 'Basquete', category: 'Calçados', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80' },
    { id: 'bq2', name: 'Bola Wilson NBA Official', price: 350, sport: 'Basquete', category: 'Equipamentos', image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&q=80' },
    { id: 'bq3', name: 'Regata Lakers James #23', price: 299, sport: 'Basquete', category: 'Vestuário', image: 'https://images.unsplash.com/photo-1515444744559-7be63e1600de?w=400&q=80' },
    { id: 'bq4', name: 'Meias de Performance Nike', price: 85, sport: 'Basquete', category: 'Acessórios', image: 'https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=400&q=80' },
    
    // Futebol
    { id: 'ft1', name: 'Chuteira Adidas Predator Elite', price: 1499, sport: 'Futebol', category: 'Calçados', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80' },
    { id: 'ft2', name: 'Bola Nike Flight Premier League', price: 450, sport: 'Futebol', category: 'Equipamentos', image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&q=80' },
    { id: 'ft3', name: 'Camisa Seleção Brasileira 2024', price: 349, sport: 'Futebol', category: 'Vestuário', image: 'https://images.unsplash.com/photo-1518005020250-68594f214e1c?w=400&q=80' },
    { id: 'ft4', name: 'Caneleira de Carbono G-Form', price: 220, sport: 'Futebol', category: 'Equipamentos', image: 'https://images.unsplash.com/photo-1511886929837-354d827aae26?w=400&q=80' },
    
    // Vôlei
    { id: 'vl1', name: 'Tênis Mizuno Wave Lightning Z7', price: 850, sport: 'Vôlei', category: 'Calçados', image: 'https://images.unsplash.com/photo-1592656670411-591e9c174695?w=400&q=80' },
    { id: 'vl2', name: 'Bola Mikasa V200W Oficial', price: 550, sport: 'Vôlei', category: 'Equipamentos', image: 'https://images.unsplash.com/photo-1592656670411-591e9c174695?w=400&q=80' },
    { id: 'vl3', name: 'Joelheira Asics Gel', price: 140, sport: 'Vôlei', category: 'Equipamentos', image: 'https://images.unsplash.com/photo-1592656670411-591e9c174695?w=400&q=80' },
    { id: 'vl4', name: 'Manguito de Compressão', price: 75, sport: 'Vôlei', category: 'Acessórios', image: 'https://images.unsplash.com/photo-1592656670411-591e9c174695?w=400&q=80' },
  ];

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesSport = selectedSport === 'Todos' || p.sport === selectedSport;
    const matchesCategory = selectedCategory === 'Todas' || p.category === selectedCategory;
    return matchesSearch && matchesSport && matchesCategory;
  });

  const FilterContent = () => (
    <div className="space-y-6 py-4">
      <div>
        <Label className="text-[10px] text-gray-400 uppercase font-black tracking-widest mb-3 block">Esporte</Label>
        <div className="grid grid-cols-2 gap-2">
          {['Todos', 'Judô', 'Jiu-jitsu', 'Basquete', 'Futebol', 'Vôlei'].map((s) => (
            <button
              key={s}
              onClick={() => setSelectedSport(s as any)}
              className={cn(
                "text-left px-3 py-2 rounded-lg text-xs transition-all",
                selectedSport === s ? "bg-red-50 text-red-600 font-bold dark:bg-red-900/20" : "text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800"
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div>
        <Label className="text-[10px] text-gray-400 uppercase font-black tracking-widest mb-3 block">Categoria</Label>
        <div className="grid grid-cols-2 gap-2">
          {['Todas', 'Calçados', 'Vestuário', 'Equipamentos', 'Acessórios'].map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCategory(c as any)}
              className={cn(
                "text-left px-3 py-2 rounded-lg text-xs transition-all",
                selectedCategory === c ? "bg-red-50 text-red-600 font-bold dark:bg-red-900/20" : "text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800"
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex">
      <Sidebar />
      
      <main className="flex-1 ml-16 p-6 md:p-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-[1400px] mx-auto space-y-8"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-red-600 rounded-xl text-white shadow-lg shadow-red-200">
                <ShoppingBag size={24} />
              </div>
              <div>
                <h1 className="text-3xl font-black tracking-tighter dark:text-white">Marketplace</h1>
                <p className="text-sm text-gray-500">Equipamentos de alta performance</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="rounded-xl gap-2 border-none shadow-sm bg-white dark:bg-gray-900">
                    <Filter size={18} /> Filtros
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                  <SheetHeader>
                    <SheetTitle className="flex items-center gap-2">
                      <Filter className="text-red-600" /> Refinar Busca
                    </SheetTitle>
                  </SheetHeader>
                  <FilterContent />
                </SheetContent>
              </Sheet>
              <CartDrawer />
            </div>
          </div>

          <div className="space-y-6">
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <Input 
                placeholder="Buscar equipamentos..." 
                className="pl-12 h-12 rounded-2xl bg-white dark:bg-gray-900 border-none shadow-sm focus-visible:ring-red-600" 
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap gap-2 justify-center">
              {selectedSport !== 'Todos' && (
                <Badge variant="secondary" className="gap-1 px-3 py-1 rounded-full bg-red-50 text-red-600 border-none">
                  {selectedSport} <X size={14} className="cursor-pointer" onClick={() => setSelectedSport('Todos')} />
                </Badge>
              )}
              {selectedCategory !== 'Todas' && (
                <Badge variant="secondary" className="gap-1 px-3 py-1 rounded-full bg-gray-100 text-gray-600 border-none">
                  {selectedCategory} <X size={14} className="cursor-pointer" onClick={() => setSelectedCategory('Todas')} />
                </Badge>
              )}
            </div>

            <motion.div 
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card className="group overflow-hidden border-none shadow-sm rounded-3xl bg-white dark:bg-gray-900 hover:shadow-xl transition-all duration-300">
                      <div className="relative h-52 overflow-hidden">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                          <Badge className="bg-white/90 text-red-600 border-none font-bold shadow-sm text-[10px]">
                            {product.sport}
                          </Badge>
                        </div>
                      </div>
                      <div className="p-5 space-y-3">
                        <h3 className="font-bold text-gray-900 dark:text-white text-sm line-clamp-1">{product.name}</h3>
                        <div className="flex items-center justify-between pt-1">
                          <p className="text-xl font-black text-gray-900 dark:text-white">R$ {product.price}</p>
                          <Button 
                            onClick={() => { addToCart(product); showSuccess("Adicionado!"); }} 
                            size="sm"
                            className="bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold shadow-lg shadow-red-100 active:scale-95 transition-all"
                          >
                            Comprar
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Marketplace;