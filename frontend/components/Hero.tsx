export default function Hero() {
  return (
    // Gradient diubah menjadi Merah khas Tailg/Uwinfly
    <section className="relative w-full min-h-[500px] md:h-[600px] bg-[linear-gradient(to_bottom_right,#b91c1c,#dc2626,#f87171)] overflow-hidden text-white flex items-center">
      
      {/* Dekorasi Grid Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[url('/images/grid-pattern.png')] bg-cover"></div>

      <div className="container mx-auto px-6 h-full flex flex-col md:flex-row items-center relative z-10">
        <div className="flex-1 space-y-4 text-center md:text-left pt-10 md:pt-0">
          <h3 className="text-lg md:text-2xl font-bold tracking-widest uppercase opacity-80">New Arrival 2026</h3>
          <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter leading-none drop-shadow-lg">
            T80C
          </h1>
          <p className="text-lg md:text-xl font-light italic text-red-100">Lebih Elegan, Teknologi Terdepan</p>
          
          {/* Box Promo Glassmorphism */}
          <div className="mt-8 inline-block bg-white/20 backdrop-blur-md p-6 rounded-3xl border border-white/30 shadow-xl">
            <span className="bg-white text-red-600 px-4 py-1 rounded-full font-bold text-sm uppercase">
              Promo Peluncuran
            </span>
            <div className="mt-3">
              <p className="text-xl line-through opacity-60">Rp 8.499.000</p>
              <p className="text-4xl md:text-5xl font-black text-white">Rp 8.299.000</p>
            </div>
          </div>
        </div>

        <div className="flex-1 relative mt-8 md:mt-0">
          <img 
            src="/images/t80c-hero.png" 
            alt="Uwinfly T80C" 
            className="w-full h-auto drop-shadow-[0_35px_35px_rgba(0,0,0,0.5)] scale-110"
          />
        </div>
      </div>
    </section>
  );
}