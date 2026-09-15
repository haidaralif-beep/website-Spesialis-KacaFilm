'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ArrowLeft, MapPin } from 'lucide-react';
import ScrollReveal from '../../components/ScrollReveal';
import NavBar from '../../components/NavBar';
import ReadMore from '../../components/ReadMore';

interface HasilPemasangan {
  id: number;
  nama_tempat: string;
  deskripsi: string | null;
  foto_url: string;
  created_at: string;
}

export default function PortfolioPage() {
  const [items, setItems] = useState<HasilPemasangan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/hasil-pemasangan')
      .then(res => res.json())
      .then(data => setItems(data.items || []))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="min-h-screen pt-24 pb-20" style={{ backgroundColor: '#05070a', backgroundImage: 'linear-gradient(rgba(25, 167, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(25, 167, 255, 0.05) 1px, transparent 1px)', backgroundSize: '64px 64px' }}>
      <NavBar />
      <div className="container-custom">
        <Link href="/" className="inline-flex items-center gap-2 text-text-secondary hover:text-electric transition-colors duration-200 mb-10 text-sm font-medium">
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Beranda</span>
        </Link>

        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-electric text-xs font-bold tracking-widest uppercase mb-3">PORTOFOLIO</div>
          <h1 className="text-3xl md:text-4xl lg:text-[42px] font-black text-white tracking-tight leading-tight mb-4">Hasil Pemasangan Kami</h1>
          <p className="text-text-secondary text-sm sm:text-base leading-relaxed">Kami telah menyelesaikan berbagai proyek pemasangan kaca film untuk gedung, rumah, ruko, dan kendaraan di seluruh Indonesia.</p>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <p className="text-text-secondary text-sm">Memuat...</p>
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-text-secondary text-sm">Belum ada hasil pemasangan.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item, i) => (
              <ScrollReveal key={item.id} delay={i * 80}>
              <div className="group rounded-[15px] overflow-hidden bg-surface border-2 border-white/[0.1] hover:border-electric/40 transition-all duration-300 flex flex-col h-full">
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <img 
                    loading="lazy"
                    src={item.foto_url}
                    alt={item.nama_tempat}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent"></div>
                  <div className="absolute top-3 left-3">
                    <span className="text-[10px] font-mono font-semibold text-electric bg-electric/20 backdrop-blur-md border border-electric/30 px-2.5 py-1 rounded-full inline-flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {item.nama_tempat}
                    </span>
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-white font-bold text-sm mb-1.5 leading-tight group-hover:text-electric transition-colors">{item.nama_tempat}</h3>
                  {item.deskripsi && (
                    <ReadMore text={item.deskripsi} className="text-text-secondary text-xs leading-relaxed mb-4 flex-1" />
                  )}
                </div>
              </div>
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
