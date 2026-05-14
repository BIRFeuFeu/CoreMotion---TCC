"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Search, Filter, Star } from "lucide-react";
import { UserProfile, Product, Sport } from "@/types/sports";
import { showSuccess } from "@/utils/toast";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import CartDrawer from "@/components/CartDrawer";

const Marketplace = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [search, setSearch] = useState("");
  const [selectedSport, setSelectedSport] = useState<Sport | 'Todos'>('Todos');
  const { addToCart } = useCart();
  
  const products: Product[] = [
    { id: '1', name: 'Kimono Profissional A3', price: 350, sport: 'Jiu-jitsu', image: 'https://images.unsplash.com/photo-1552072805-2a9039d00e57?w=400&q=80' },
    { id: '2', name: 'Bola de Basquete Wilson NBA', price: 180, sport: 'Basquete', image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&q=80' },
    { id: '3', name: 'Chuteira Nike Mercurial Elite', price: 450, sport: 'Futebol', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80' },
    { id: '4', name: 'Joelheira de Vôlei Mizuno', price: 85, sport: 'Vôlei', image: 'https://images.unsplash.com/photo-1592656670411-591e9c174695?w=400&q=80' },
    { id: '5', name: 'Faixa Preta Judô Bordada', price: 120, sport: 'Judô', image: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?w=400&q=80' },
    { id: '6', name: 'Luvas de Goleiro Adidas', price: 220, sport: 'Futebol', image: 'https://images.unsplash.com/photo-1518005020250-68594f214e1c?w=400&q=80' },
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
    return matchesSearch && matchesSport;
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
              <div className="flex items-center gap-2 mb-4">
                <Filter size={18} className="text-red-600" />
                <h3 className="font-bold">Filtros</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label className="text-xs text-gray-400 uppercase font-black">Esporte</Label>
                  <div className="mt-2 space-y-1">
                    {['Todos', 'Judô', 'Jiu-jitsu', 'Basquete', 'Futebol', 'Vôlei'].map((s) => (
                      <button
                        key={s}
                        onClick={() => setSelectedSport(s as any)}
                        className={cn(
                          "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors",
                          selectedSport === s ? "bg-red-50 text-red-600 font-bold" : "text-gray-600 hover:bg-gray-50"
                        )}
                      >
                        {s}
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
                    <Badge className="absolute top-4 left-4 bg-white/90 text-red-600 border-none font-bold">
                      {product.sport}
                    </Badge>
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