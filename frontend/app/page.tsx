"use client"
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Produk {
  id: number;
  nama_model: string;
  tipe_kendaraan: string;
  harga: number;
  gambar_url: string;
}

export default function KatalogUtama() {
  const [produk, setProduk] = useState<Produk[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/produk')
      .then(res => res.json())
      .then(data => {
        setProduk(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Gagal memuat katalog:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-20 text-center font-bold animate-pulse text-red-600">Memuat Katalog Uwinfly...</div>;

  return (
    <main className="bg-white min-h-screen">
      {/* --- HERO SECTION --- */}
      <section className="relative w-full min-h-[500px] md:h-[600px] bg-[linear-gradient(to_bottom_right,#b91c1c,#dc2626,#f87171)] overflow-hidden text-white flex items-center pt-20 md:pt-0">
        <div className="absolute top-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-white/10 blur-[80px] md:blur-[120px] rounded-full -mr-24 -mt-24"></div>
        
        <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 items-center relative z-10 gap-8">
          <div className="space-y-4 md:space-y-6 text-center md:text-left">
            <h3 className="text-red-100 font-black tracking-[0.2em] md:tracking-[0.3em] uppercase text-xs md:text-base opacity-80">
              New Arrival 2026
            </h3>
            <h1 className="text-5xl md:text-9xl font-black italic leading-none tracking-tighter uppercase">
              T80C <span className="block text-xl md:text-4xl not-italic font-light tracking-normal text-red-50 mt-2">Lebih Elegan, Teknologi Terdepan</span>
            </h1>
            
            <div className="bg-white/20 backdrop-blur-md border border-white/30 p-4 md:p-6 rounded-[1.5rem] md:rounded-[2rem] inline-block shadow-2xl mx-auto md:mx-0 max-w-full">
              <p className="text-[10px] md:text-sm font-bold uppercase tracking-widest text-red-50 mb-1">Promo Peluncuran</p>
              <div className="flex flex-col md:flex-row items-center md:items-baseline gap-2 md:gap-4">
                <span className="text-3xl md:text-5xl font-black">Rp 8.299.000</span>
                <span className="text-sm md:text-xl line-through text-red-200">Rp 8.499.000</span>
              </div>
            </div>
          </div>

          <div className="relative flex justify-center pb-10 md:pb-0">
            <img 
              src="https://infoev.id/storage/vehicle/tHc0DFTLOruB7oCuFuLmg3JJzQcO1s2SYyVmLfl8.png" 
              alt="Uwinfly T80C" 
              className="w-3/4 md:w-full h-auto drop-shadow-[0_35px_35px_rgba(0,0,0,0.4)] hover:scale-105 transition-transform duration-700 ease-out"
              onError={(e) => { (e.target as HTMLImageElement).src = '/images/t3s.png'; }}
            />
          </div>
        </div>
      </section>

      {/* --- KATALOG PRODUK DINAMIS --- */}
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-12 gap-4 text-center md:text-left">
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight uppercase italic">Katalog Unit</h2>
            <p className="text-gray-500 font-medium text-sm md:text-base">Pilih kendaraan listrik impianmu sesuai data terbaru.</p>
          </div>
          <div className="h-1 flex-1 bg-gray-100 mx-8 mb-4 hidden md:block rounded-full"></div>
          <span className="bg-red-600 text-white px-6 py-2 rounded-full text-xs md:text-sm font-bold self-center md:self-auto">
            {produk.length} Unit Tersedia
          </span>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {produk.map((item) => (
            <div key={item.id} className="group bg-white rounded-[1.5rem] md:rounded-[2.5rem] p-1.5 md:p-2 shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col h-full">
              <div className="aspect-square bg-gray-50 rounded-[1.2rem] md:rounded-[2rem] overflow-hidden flex items-center justify-center relative p-4 md:p-6">
                <img 
                  // KUNCI PERBAIKAN: Mengambil gambar sesuai data 'gambar_url' dari database
                  src={`/images/${item.gambar_url}`} 
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" 
                  alt={item.nama_model}
                  // Jika gambar di folder /public/images/ tidak ditemukan, baru gunakan link internet sebagai cadangan
                  onError={(e) => { (e.target as HTMLImageElement).src = 'https://upload.wikimedia.org/wikipedia/commons/5/59/Empty.png'; }}
                />
              </div>

              <div className="p-3 md:p-6 flex flex-col flex-grow">
                <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-red-600 mb-1">{item.tipe_kendaraan || 'EV Unit'}</span>
                <h3 className="text-sm md:text-xl font-bold text-gray-800 mb-1 md:mb-2 group-hover:text-red-600 transition-colors uppercase italic truncate">{item.nama_model}</h3>
                
                <div className="mt-auto">
                  <p className="text-lg md:text-2xl font-black text-gray-900 mb-3 md:mb-6">
                    <span className="text-[10px] md:text-sm font-medium text-gray-400 mr-0.5">Rp</span>
                    {Number(item.harga).toLocaleString('id-ID')}
                  </p>
                  
                  <Link href={`/produk/${item.id}`}>
                    <button className="w-full bg-gray-100 text-gray-900 py-2.5 md:py-4 rounded-xl md:rounded-2xl font-black uppercase tracking-wider text-[9px] md:text-xs group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                      Detail
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}