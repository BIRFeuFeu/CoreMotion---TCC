"use client";

import React, { useState, useEffect } from "react";
import BottomNav from "@/components/BottomNav";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ShoppingCart } from "lucide-react";
import { UserProfile, Product } from "@/types/sports";

const Marketplace = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  
  const products: Product[] = [
    { id: '1', name: 'Kimono Profissional', price: 350, sport: 'Jiu-jitsu', image: 'https://images.unsplash.com/photo-1552072805-2a9039d00e57?w=400&q=80' },
    { id: '2', name: 'Bola de Basquete Wilson', price: 180, sport: 'Basquete', image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&q=80' },
    { id: '3', name: 'Chuteira Nike Mercurial', price: 450, sport: 'Futebol', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80' },
    { id: '4', name: 'Joelheira de Vôlei', price: 85, sport: 'Vôlei', image: 'https://images.unsplash.com/photo-1592656670411-591e9c174695?w=400&q=80' },
    { id: '5', name: 'Faixa Preta Judô', price: 120, sport: 'Judô', image: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?w=400&q=80' },
  ];

  useEffect(() => {
    const saved = localStorage.getItem("userProfile");
    if (saved) setProfile(JSON.parse(saved));
  }, []);

  const filteredProducts = profile 
    ? products.filter(p => profile.favoriteSports.includes(p.sport))
    : products;

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <header className="bg-white p-6 sticky top-0 z-40 border-b border-gray-100 space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Marketplace</h1>
          <Button variant="ghost" size="icon" className="relative">
            <ShoppingCart size={24} />
            <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">0</span>
          </Button>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <Input placeholder="Buscar equipamentos..." className="pl-10 rounded-xl bg-gray-50 border-none" />
        </div>
      </header>

      <main className="p-4 grid grid-cols-2 gap-4 max-w-md mx-auto">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="overflow-hidden border-none shadow-sm rounded-2xl bg-white">
            <img src={product.image} alt={product.name} className="w-full h-32 object-cover" />
            <div className="p-3 space-y-2">
              <p className="text-[10px] text-orange-600 font-bold uppercase">{product.sport}</p>
              <h3 className="text-sm font-semibold text-gray-900 line-clamp-1">{product.name}</h3>
              <p className="text-lg font-bold text-gray-900">R$ {product.price}</p>
              <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white rounded-lg h-8 text-xs">
                Comprar
              </Button>
            </div>
          </Card>
        ))}
      </main>

      <BottomNav />
    </div>
  );
};

export default Marketplace;