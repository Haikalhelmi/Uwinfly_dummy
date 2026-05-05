"use client"
import Link from 'next/link';
import { useCart } from '../app/context/CartContext';

export default function Navbar() {
  const { cart } = useCart();
  
  // Menghitung total jumlah item di keranjang
  const totalItems = cart.reduce((acc, item) => acc + item.jumlah, 0);

  return (
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-black text-gray-800 tracking-tighter">
          UWINFLY<span className="text-red-500">.EV</span>
        </Link>

        <Link href="/cart" className="relative p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center border-2 border-white">
              {totalItems}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
}