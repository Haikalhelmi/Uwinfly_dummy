"use client"
import { useCart } from '../context/CartContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function KeranjangPage() {
  const { cart, removeFromCart, totalHarga, clearCart } = useCart();
  const router = useRouter();

  return (
    <main className="p-6 md:p-12 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <button onClick={() => router.back()} className="mb-6 text-blue-600 font-bold hover:underline flex items-center gap-2">
          <span>←</span> Kembali Belanja
        </button>
        
        <h1 className="text-3xl font-black mb-8 text-gray-800 tracking-tight italic">KERANJANG BELANJA</h1>

        {cart.length === 0 ? (
          <div className="bg-white p-20 rounded-[2rem] shadow-xl text-center border border-gray-100">
            <p className="text-gray-400 text-lg mb-6 font-medium">Wah, keranjangmu masih kosong nih!</p>
            <Link href="/">
              <button className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-200">
                Cari Motor Uwinfly
              </button>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Daftar Item */}
            <div className="bg-white rounded-[2rem] shadow-xl overflow-hidden border border-gray-100">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center p-6 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition group">
                  <img 
                    src={`/images/${item.gambar_url}`} 
                    className="w-20 h-20 object-contain bg-blue-50 rounded-2xl p-2 group-hover:scale-105 transition-transform" 
                    alt={item.nama_model} 
                    onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150'; }}
                  />
                  <div className="flex-1 ml-6">
                    <h2 className="text-lg font-black text-gray-800 uppercase">{item.nama_model}</h2>
                    <p className="text-blue-600 font-bold">
                      Rp {Number(item.harga).toLocaleString('id-ID')}
                    </p>
                    <p className="text-xs text-gray-400 mt-1 font-medium">Jumlah: {item.jumlah} Unit</p>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-400 hover:text-red-600 hover:bg-red-50 p-3 rounded-xl transition font-bold text-sm"
                    title="Hapus item"
                  >
                    Hapus
                  </button>
                </div>
              ))}
            </div>

            {/* Ringkasan & Action */}
            <div className="bg-gray-900 text-white p-8 rounded-[2rem] shadow-2xl relative overflow-hidden">
              {/* Dekorasi Glossy */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-3xl rounded-full -mr-16 -mt-16"></div>
              
              <div className="flex justify-between items-center mb-8 relative z-10">
                <span className="text-gray-400 font-medium text-lg">Total Estimasi:</span>
                <span className="text-3xl font-black text-green-400 tracking-tight">
                  Rp {totalHarga.toLocaleString('id-ID')}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 relative z-10">
                <button 
                  onClick={() => { if(confirm("Yakin ingin mengosongkan keranjang?")) clearCart(); }}
                  className="bg-gray-800 text-gray-300 py-4 rounded-2xl font-bold hover:bg-red-900 hover:text-white transition duration-300 border border-gray-700"
                >
                  KOSONGKAN
                </button>
                
                {/* Tombol ke halaman Checkout */}
                <button 
                  onClick={() => router.push('/checkout')}
                  className="bg-blue-600 text-white py-4 rounded-2xl font-bold hover:bg-blue-500 shadow-lg shadow-blue-900/40 transition duration-300 active:scale-95"
                >
                  PROSES CHECKOUT
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}