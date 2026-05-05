"use client"
import { createContext, useContext, useState, ReactNode } from 'react';

interface CartItem {
  id: number;
  nama_model: string;
  harga: number;
  jumlah: number;
  gambar_url: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  totalHarga: number; // Pastikan 'l' nya cuma satu agar konsisten
  clearCart: () => void; 
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const isExist = prev.find((i) => i.id === item.id);
      if (isExist) {
        return prev.map((i) => i.id === item.id ? { ...i, jumlah: i.jumlah + 1 } : i);
      }
      return [...prev, { ...item, jumlah: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  // Kalkulasi total harga
  const totalHarga = cart.reduce((acc, item) => acc + (item.harga * item.jumlah), 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, totalHarga, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart harus di dalam CartProvider");
  return context;
};