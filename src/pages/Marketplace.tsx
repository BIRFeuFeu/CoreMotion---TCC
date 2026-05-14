"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Search, Filter, Star } from "lucide-react";
import { UserProfile, Product, Sport, Category } from "@/types/sports";
import { showSuccess } from "@/utils/toast";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import CartDrawer from "@/components/CartDrawer";

const Marketplace = () => {
  const [search, setSearch] = useState("");
  const [selectedSport, setSelectedSport] = useState<Sport | 'Todos'>('Todos');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'Todas'>('Todas');
  const { addToCart } = useCart();
  
  const products: Product[] = [
    { id: 'jj1', name: 'Kimono Profissional A3', price: 350, sport: 'Jiu-jitsu', category: 'Vestuário', image: 'https://images.unsplash.com/photo-1552072805-2a9039d00e57?w=400&q=80' },
    { id: 'bq2', name: 'Tênis Nike LeBron XX', price: 890, sport: 'Basquete', category: 'Calçados', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80' },
    { id: 'ft1', name: 'Chuteira Adidas Predator', price: 650, sport: 'Futebol', category: 'Calçados', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80' },
  ];

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesSport = selectedSport === 'Todos' || p.sport === selectedSport;
    const matchesCategory = selectedCategory === 'Todas' || p.category === selectedCategory;
    return matchesSearch && matchesSport && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex">
      <Sidebar />
      
      <main className="flex-1 ml-20 p-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
          <aside className="w-full md:w-64 space-y-6">
            <Card className="p-6 rounded-2xl border-none shadow-sm bg-white dark:bg-gray-900">
              <div className="flex items-center gap-2 mb-6 dark:text-white">
                <Filter size={18} className="text-red-600" />
                <h3 className="font-bold">Filtros</h3>
              </div>
              
              <div className="space-y-6">
                <div>
                  <Label className="text-[10px] text-gray-400 uppercase font-black tracking-widest mb-3 block">Esporte</Label>
                  <div className="space-y-1">
                    {['Todos', 'Judô', 'Jiu-jitsu', 'Basquete', 'Futebol', 'Vôlei'].map((s) => (
                      <button
                        key={s}
                        onClick={() => setSelectedSport(s as any)}
                        className={cn(
                          "w-full text-left px-3 py-2 rounded-lg text-sm transition-all",
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
                  <div className="space-y-1">
                    {['Todas', 'Calçados', 'Vestuário', 'Equipamentos', 'Acessórios'].map((c) => (
                      <button
                        key={c}
                        onClick={() => setSelectedCategory(c as any)}
                        className={cn(
                          "w-full text-left px-3 py-2 rounded-lg text-sm transition-all",
                          selectedCategory === c ? "bg-red-50 text-red-600 font-bold dark:bg-red-900/20" : "text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800"
                        )}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </aside>

          <div className="flex-1 space-y-6">
            <div className="flex justify-between items-center gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <Input 
                  placeholder="Buscar equipamentos..." 
                  className="pl-10 rounded-xl bg-white dark:bg-gray-900 border-none shadow-sm" 
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
              <CartDrawer />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="group overflow-hidden border-none shadow-sm rounded-2xl bg-white dark:bg-gray-900 hover:shadow-md transition-all">
                  <div className="relative h-48 overflow-hidden">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <Badge className="absolute top-4 left-4 bg-white/90 text-red-600 font-bold">{product.sport}</Badge>
                  </div>
                  <div className="p-4 space-y-3">
                    <h3 className="font-bold text-gray-900 dark:text-white line-clamp-1">{product.name}</h3>
                    <div className="flex items-center justify-between">
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">R$ {product.price}</p>
                      <Button onClick={() => { addToCart(product); showSuccess("Adicionado!"); }} className="bg-gray-900 dark:bg-red-600 hover:bg-red-600 text-white rounded-xl">Comprar</Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Marketplace;