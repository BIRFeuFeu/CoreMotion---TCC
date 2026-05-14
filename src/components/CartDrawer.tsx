"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { ScrollArea } from "@/components/ui/scroll-area";
import { showSuccess } from "@/utils/toast";

const CartDrawer = () => {
  const { items, removeFromCart, total, clearCart } = useCart();

  const handleCheckout = () => {
    showSuccess("Pedido realizado com sucesso!");
    clearCart();
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="rounded-xl gap-2 bg-white border-none shadow-sm relative hover:bg-red-50 hover:text-red-600">
          <ShoppingCart size={20} />
          {items.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md">
              {items.length}
            </span>
          )}
          Carrinho
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2 tracking-tight">
            <ShoppingBag className="text-red-600" /> Seu Carrinho
          </SheetTitle>
        </SheetHeader>
        
        <ScrollArea className="flex-1 mt-6 pr-4">
          {items.length === 0 ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto text-gray-400">
                <ShoppingCart size={32} />
              </div>
              <p className="text-gray-500 font-medium">Seu carrinho está vazio</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 bg-gray-50 p-3 rounded-2xl">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-xl" />
                  <div className="flex-1">
                    <h4 className="font-bold text-sm line-clamp-1">{item.name}</h4>
                    <p className="text-xs text-gray-500 font-medium">{item.sport}</p>
                    <div className="flex justify-between items-center mt-2">
                      <p className="font-bold text-red-600">R$ {item.price}</p>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold">Qtd: {item.quantity}</span>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:bg-red-100 p-1.5 rounded-lg transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        {items.length > 0 && (
          <div className="pt-6 border-t space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-500 font-medium">Total</span>
              <span className="text-2xl font-black text-gray-900">R$ {total.toFixed(2)}</span>
            </div>
            <Button onClick={handleCheckout} className="w-full bg-red-600 hover:bg-red-700 h-12 rounded-xl text-lg font-bold shadow-lg shadow-red-100">
              Finalizar Compra
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;