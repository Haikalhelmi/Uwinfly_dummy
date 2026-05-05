"use client"
import { useCart } from '../../context/CartContext';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation'; // Tambahkan useRouter untuk navigasi

export default function DetailProduk() {
  const { id } = useParams();
  const router = useRouter(); // Inisialisasi router
  const [item, setItem] = useState<any>(null);
  const [error, setError] = useState(false);

  // --- MASUKKAN BARIS INI ---
  const { addToCart } = useCart(); 
  // --------------------------

  useEffect(() => {
    if (id) {
      console.log("Mencoba mengambil data ID:", id);
      fetch(`http://localhost:5000/api/produk/${id}`)
        .then(res => {
          if (!res.ok) throw new Error("Gagal konek backend");
          return res.json();
        })
        .then(data => {
          console.log("Data diterima:", data);
          if (data && data.length > 0) {
            setItem(data[0]);
          } else {
            setError(true);
          }
        })
        .catch(err => {
          console.error("Error:", err);
          setError(true);
        });
    }
  }, [id]);

  if (error) return <div className="p-10 text-center text-red-500">Gagal mengambil data. Pastikan Backend (Port 5000) sudah jalan!</div>;
  if (!item) return <div className="p-10 text-center font-bold">Memuat data Uwinfly...</div>;

  return (
    <main className="p-10 max-w-4xl mx-auto">
      {/* Tombol Kembali */}
      <button onClick={() => router.back()} className="text-blue-600 mb-5">← Kembali</button>

      <div className="bg-white p-8 rounded-3xl shadow-xl border">
        <h1 className="text-4xl font-black text-gray-800">{item.nama_model}</h1>
        <p className="text-2xl text-green-600 font-bold mt-2">
          Rp {Number(item.harga).toLocaleString('id-ID')}
        </p>
        
        <div className="my-6">
          <img 
            src={`/images/${item.gambar_url}`} 
            alt={item.nama_model} 
            className="w-full max-w-sm mx-auto"
            onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400'; }}
          />
        </div>

        <p className="text-gray-600 leading-relaxed mb-8">{item.deskripsi}</p>

        {/* --- TOMBOL TAMBAH KERANJANG --- */}
        <button 
          onClick={() => {
            addToCart({
              id: item.id,
              nama_model: item.nama_model,
              harga: item.harga,
              gambar_url: item.gambar_url,
              jumlah: 1
            });
            alert(`${item.nama_model} masuk keranjang!`);
          }}
          className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold hover:bg-blue-700 transition"
        >
          TAMBAH KE KERANJANG
        </button>
      </div>
    </main>
  );
}