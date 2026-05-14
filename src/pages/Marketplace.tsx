"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Search, Filter, Star, Tag } from "lucide-react";
import { UserProfile, Product, Sport, Category } from "@/types/sports";
import { showSuccess } from "@/utils/toast";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import CartDrawer from "@/components/CartDrawer";

const Marketplace = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [search, setSearch] = useState("");
  const [selectedSport, setSelectedSport] = useState<Sport | 'Todos'>('Todos');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'Todas'>('Todas');
  const { addToCart } = useCart();
  
  const products: Product[] = [
    // Jiu-jitsu
    { id: 'jj1', name: 'Kimono Profissional A3', price: 350, sport: 'Jiu-jitsu', category: 'Vestuário', image: 'https://images.unsplash.com/photo-1552072805-2a9039d00e57?w=400&q=80' },
    { id: 'jj2', name: 'Rash Guard Compressão', price: 120, sport: 'Jiu-jitsu', category: 'Vestuário', image: 'https://images.unsplash.com/photo-1599058917233-35833f3b162e?w=400&q=80' },
    { id: 'jj3', name: 'Faixa Marrom Bordada', price: 85, sport: 'Jiu-jitsu', category: 'Acessórios', image: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?w=400&q=80' },
    { id: 'jj4', name: 'Mochila Porta Kimono', price: 190, sport: 'Jiu-jitsu', category: 'Acessórios', image: 'https://images.unsplash.com/photo-1553062407-98eeb94c6a62?w=400&q=80' },
    
    // Basquete
    { id: 'bq1', name: 'Bola Wilson NBA Official', price: 280, sport: 'Basquete', category: 'Equipamentos', image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&q=80' },
    { id: 'bq2', name: 'Tênis Nike LeBron XX', price: 890, sport: 'Basquete', category: 'Calçados', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80' },
    { id: 'bq3', name: 'Regata Lakers James #23', price: 250, sport: 'Basquete', category: 'Vestuário', image: 'https://images.unsplash.com/photo-1515444744559-7be63e1600de?w=400&q=80' },
    { id: 'bq4', name: 'Meias de Performance', price: 45, sport: 'Basquete', category: 'Acessórios', image: 'https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=400&q=80' },
    
    // Futebol
    { id: 'ft1', name: 'Chuteira Adidas Predator', price: 650, sport: 'Futebol', category: 'Calçados', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80' },
    { id: 'ft2', name: 'Bola Nike Flight Elite', price: 320, sport: 'Futebol', category: 'Equipamentos', image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&q=80' },
    { id: 'ft3', name: 'Camisa Seleção Brasileira', price: 349, sport: 'Futebol', category: 'Vestuário', image: 'https://images.unsplash.com/photo-1518005020250-68594f214e1c?w=400&q=80' },
    { id: 'ft4', name: 'Caneleira de Carbono', price: 110, sport: 'Futebol', category: 'Equipamentos', image: 'https://images.unsplash.com/photo-1511886929837-354d827aae26?w=400&q=80' },
    
    // Vôlei
    { id: 'vl1', name: 'Tênis Mizuno Wave Lightning', price: 580, sport: 'Vôlei', category: 'Calçados', image: 'https://images.unsplash.com/photo-1592656670411-591e9c174695?w=400&q=80' },
    { id: 'vl2', name: 'Bola Mikasa V200W', price: 450, sport: 'Vôlei', category: 'Equipamentos', image: 'https://images.unsplash.com/photo-1592656670411-591e9c174695?w=400&q=80' },
    { id: 'vl3', name: 'Joelheira Profissional', price: 95, sport: 'Vôlei', category: 'Equipamentos', image: 'https://images.unsplash.com/photo-1592656670411-591e9c174695?w=400&q=80' },
    { id: 'vl4', name: 'Manguito de Compressão', price: 65, sport: 'Vôlei', category: 'Acessórios', image: 'https://images.unsplash.com/photo-1592656670411-591e9c174695?w=400&q=80' },
    
    // Judô
    { id: 'jd1', name: 'Kimono Adidas Champion', price: 720, sport: 'Judô', category: 'Vestuário', image: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?w=400&q=80' },
    { id: 'jd2', name: 'Zori (Sandália Japonesa)', price: 140, sport: 'Judô', category: 'Calçados', image: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?w=400&q=80' },
    { id: 'jd3', name: 'Faixa Preta IJF Approved', price: 180, sport: 'Judô', category: 'Acessórios', image: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?w=400&q=80' },
    { id: 'jd4', name: 'Protetor Bucal Moldável', price: 45, sport: 'Judô', category: 'Acessórios', image: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?w=400&q=80' },
  ];

  useEffect(() => {
    const saved = localStorage.getItem("userProfile");
    if (saved) {
      const p = JSON.parse(saved);
      setProfile(p);
      if (p.favoriteSports.length > 0) setSelectedSport(p.favoriteSports[0]);
    }
  }, []);

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesSport = selectedSport === 'Todos' || p.sport === selectedSport;
    const matchesCategory = selectedCategory === 'Todas' || p.category === selectedCategory;
    return matchesSearch && matchesSport && matchesCategory;
  });

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    showSuccess(`${product.name} adicionado ao carrinho!`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <aside className="w-full md:w-64 space-y-6">
            <Card className="p-6 rounded-2xl border-none shadow-sm bg-white">
              <div className="flex items-center gap-2 mb-6">
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
                          selectedSport === s ? "bg-red-50 text-red-600 font-bold" : "text-gray-600 hover:bg-gray-50"
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
                          selectedCategory === c ? "bg-red-50 text-red-600 font-bold" : "text-gray-600 hover:bg-gray-50"
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
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="relative w-full md:max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <Input 
                  placeholder="Buscar equipamentos..." 
                  className="pl-10 rounded-xl bg-white border-none shadow-sm focus-visible:ring-red-600" 
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
              <CartDrawer />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="group overflow-hidden border-none shadow-sm rounded-2xl bg-white hover:shadow-md transition-all">
                  <div className="relative h-48 overflow-hidden">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      <Badge className="bg-white/90 text-red-600 border-none font-bold">
                        {product.sport}
                      </Badge>
                      <Badge className="bg-gray-900/80 text-white border-none text-[10px]">
                        {product.category}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-4 space-y-3">
                    <div className="flex items-center gap-1 text-yellow-400">
                      <Star size={14} fill="currentColor" />
                      <Star size={14} fill="currentColor" />
                      <Star size={14} fill="currentColor" />
                      <Star size={14} fill="currentColor" />
                      <Star size={14} fill="currentColor" className="text-gray-200" />
                    </div>
                    <h3 className="font-bold text-gray-900 line-clamp-1">{product.name}</h3>
                    <div className="flex items-center justify-between">
                      <p className="text-2xl font-bold text-gray-900">R$ {product.price}</p>
                      <Button 
                        onClick={() => handleAddToCart(product)}
                        className="bg-gray-900 hover:bg-red-600 text-white rounded-xl transition-colors shadow-md"
                      >
                        Comprar
                      </Button>
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