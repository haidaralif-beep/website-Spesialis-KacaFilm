'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ArrowLeft, Shield, Sun, Eye, Zap } from 'lucide-react';
import ScrollReveal from '../../components/ScrollReveal';
import NavBar from '../../components/NavBar';
import ReadMore from '../../components/ReadMore';

interface Material {
  id: number;
  nama_bahan: string;
  deskripsi: string | null;
  spesifikasi: string | null;
  created_at: string;
  updated_at: string;
}

interface MaterialPhoto {
  id: number;
  material_id: number;
  url: string;
  caption: string | null;
}

export default function MaterialsPage() {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [photos, setPhotos] = useState<MaterialPhoto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/materials').then(r => r.json()),
      fetch('/api/materials?include=photos').then(r => r.json()),
    ])
      .then(([matData, photoData]) => {
        setMaterials(matData.materials || []);
        setPhotos(photoData.photos || []);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const getPhotoForMaterial = (materialId: number) => {
    return photos.find(p => p.material_id === materialId);
  };

  return (
    <main className="min-h-screen pt-24 pb-20" style={{ backgroundColor: '#05070a', backgroundImage: 'linear-gradient(rgba(25, 167, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(25, 167, 255, 0.05) 1px, transparent 1px)', backgroundSize: '64px 64px' }}>
      <NavBar />
      <div className="container-custom">
        <Link href="/" className="inline-flex items-center gap-2 text-text-secondary hover:text-electric transition-colors duration-200 mb-10 text-sm font-medium">
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Beranda</span>
        </Link>

        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-electric text-xs font-bold tracking-widest uppercase mb-3">KATALOG BAHAN & STIKER</div>
          <h1 className="text-3xl md:text-4xl lg:text-[42px] font-black text-white tracking-tight leading-tight mb-4">Pilihan Bahan Kaca Film Berkualitas Tinggi</h1>
          <p className="text-text-secondary text-sm sm:text-base leading-relaxed">Kami menyediakan berbagai jenis kaca film & stiker berkualitas tinggi dari merek-merek ternama untuk gedung, rumah, dan kendaraan.</p>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <p className="text-text-secondary text-sm">Memuat...</p>
          </div>
        ) : materials.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-text-secondary text-sm">Belum ada bahan kaca film.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {materials.map((item, i) => {
              const photo = getPhotoForMaterial(item.id);
              return (
                <ScrollReveal key={item.id} delay={i * 80}>
                <div className="group rounded-[15px] overflow-hidden bg-surface border-2 border-white/[0.1] hover:border-electric/40 transition-all duration-300 flex flex-col h-full">
                  <div className="h-48 overflow-hidden relative">
                    {photo ? (
                      <img
                        loading="lazy"
                        src={photo.url}
                        alt={item.nama_bahan}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-surface-secondary flex items-center justify-center">
                        <span className="text-text-secondary text-xs">Belum ada foto</span>
                      </div>
                    )}
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="text-white font-bold text-sm mb-2 leading-tight group-hover:text-electric transition-colors">{item.nama_bahan}</h3>
                    {item.spesifikasi && (
                      <ReadMore text={item.spesifikasi} className="text-text-secondary text-xs leading-relaxed mb-4" />
                    )}
                    {item.deskripsi && (
                      <ReadMore text={item.deskripsi} className="text-text-secondary text-xs leading-relaxed mb-4" />
                    )}
                  </div>
                </div>
                </ScrollReveal>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
