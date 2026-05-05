"use client"
import { useCart } from '../context/CartContext';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const { cart, totalHarga, clearCart } = useCart();
  const router = useRouter();

  const kirimWhatsApp = () => {
    const nomorWA = "6281234567890"; // Ganti dengan nomor WA tokomu
    const pesan = cart.map(item => `- ${item.nama_model} (${item.jumlah}x)`).join('%0A');
    const total = totalHarga.toLocaleString('id-ID');
    
    const url = `https://wa.me/${nomorWA}?text=Halo%20Uwinfly!%20Saya%20ingin%20memesan:%0A${pesan}%0A%0ATotal:%20Rp%20${total}`;
    
    window.open(url, '_blank');
    clearCart(); // Kosongkan keranjang setelah pesan
    router.push('/'); // Balik ke beranda
  };

  if (cart.length === 0) return <div className="p-20 text-center">Keranjang kosong.</div>;

  return (
    <main className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-black mb-6">KONFIRMASI PESANAN</h1>
      <div className="bg-white border rounded-2xl p-6 shadow-sm mb-6">
        {cart.map(item => (
          <div key={item.id} className="flex justify-between py-2 border-b last:border-0">
            <span>{item.nama_model} x{item.jumlah}</span>
            <span className="font-bold">Rp {(item.harga * item.jumlah).toLocaleString('id-ID')}</span>
          </div>
        ))}
        <div className="flex justify-between pt-4 mt-2 text-xl font-black text-blue-600">
          <span>Total Bayar</span>
          <span>Rp {totalHarga.toLocaleString('id-ID')}</span>
        </div>
      </div>

      <button 
        onClick={kirimWhatsApp}
        className="w-full bg-green-500 text-white py-4 rounded-xl font-bold hover:bg-green-600 transition shadow-lg shadow-green-100"
      >
        PESAN VIA WHATSAPP
      </button>
    </main>
  );
}