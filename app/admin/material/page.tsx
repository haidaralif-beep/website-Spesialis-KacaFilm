'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Edit, Trash2, LayoutDashboard, BarChart3, Camera, MapPin, MessageSquare } from 'lucide-react';

interface Material {
  id: number;
  nama_bahan: string;
  deskripsi: string | null;
  spesifikasi: string | null;
  created_at: string;
  updated_at: string;
}

interface HasilPemasangan {
  id: number;
  nama_tempat: string;
  deskripsi: string | null;
  foto_url: string;
  created_at: string;
}

interface Stats {
  total_materials: number;
  total_photos: number;
  materials_without_photos: number;
  top_material_by_photos: { nama_bahan: string; photo_count: number } | null;
}

type Tab = 'dashboard' | 'materials' | 'pemasangan';

export default function AdminDashboard() {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [pemasangan, setPemasangan] = useState<HasilPemasangan[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [totalTestimonials, setTotalTestimonials] = useState(0);
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    try {
      const [matRes, statsRes, pemasanganRes, testimonialRes] = await Promise.all([
        fetch('/api/materials'),
        fetch('/api/materials?include=stats'),
        fetch('/api/hasil-pemasangan'),
        fetch('/api/testimonials'),
      ]);

      const matData = await matRes.json();
      const statsData = await statsRes.json();
      const pemasanganData = await pemasanganRes.json();
      const testimonialData = await testimonialRes.json();

      setMaterials(matData.materials || []);
      setStats(statsData.stats || null);
      setPemasangan(pemasanganData.items || []);
      setTotalTestimonials((testimonialData.testimonials || []).length);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm('Yakin ingin menghapus bahan ini? Foto terkait juga akan terhapus.')) return;
    await fetch(`/api/materials/${id}`, { method: 'DELETE' });
    fetchData();
  }

  async function handleDeletePemasangan(id: number) {
    if (!confirm('Yakin ingin menghapus data ini?')) return;
    await fetch(`/api/hasil-pemasangan?id=${id}`, { method: 'DELETE' });
    fetchData();
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const tabs: { key: Tab; label: string; icon: React.ElementType }[] = [
    { key: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { key: 'materials', label: 'Bahan Kaca Film', icon: LayoutDashboard },
    { key: 'pemasangan', label: 'Hasil Pemasangan', icon: Camera },
  ];

  return (
    <div>
      <div className="min-h-screen bg-background pt-20">
        <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none"></div>
        <div className="container-custom relative z-10 py-8 max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8 pb-6 border-b border-border">
            <h1 className="text-2xl font-bold text-white">Dashboard Admin</h1>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6 border-b border-border overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-2 text-sm font-medium transition-all rounded-t-[10px] whitespace-nowrap ${
                  activeTab === tab.key
                    ? 'bg-electric text-background'
                    : 'text-text-secondary hover:text-white hover:bg-surface-secondary/30'
                }`}
              >
                <tab.icon className="w-4 h-4 inline mr-1" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && stats && (
            <div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="glass-panel p-4 text-center">
                  <div className="text-2xl font-black text-electric stat-accent">{stats.total_materials}</div>
                  <div className="text-xs text-text-secondary mt-1">Total Bahan</div>
                </div>
                <div className="glass-panel p-4 text-center">
                  <div className="text-2xl font-black text-electric stat-accent">{pemasangan.length}</div>
                  <div className="text-xs text-text-secondary mt-1">Hasil Pemasangan</div>
                </div>
                <div className="glass-panel p-4 text-center">
                  <div className="text-2xl font-black text-electric stat-accent">{totalTestimonials}</div>
                  <div className="text-xs text-text-secondary mt-1">Testimoni</div>
                </div>
                <div className="glass-panel p-4 text-center">
                  <div className="text-2xl font-black text-electric stat-accent">{stats.total_photos}</div>
                  <div className="text-xs text-text-secondary mt-1">Foto Bahan</div>
                </div>
              </div>
            </div>
          )}

          {/* Materials Tab */}
          {activeTab === 'materials' && (
            <div>
              <h2 className="text-xl font-bold text-white mb-6">Daftar Bahan Kaca Film</h2>
              {loading ? (
                <div className="text-center py-8 text-text-secondary">Memuat...</div>
              ) : materials.length === 0 ? (
                <div className="text-center py-12 glass-panel">
                  <p className="text-text-secondary">Belum ada bahan kaca film</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {materials.map((material) => (
                    <div key={material.id} className="glass-panel p-4 flex items-center justify-between group">
                      <div className="flex-1">
                        <h3 className="text-white font-bold text-sm">{material.nama_bahan}</h3>
                        {material.spesifikasi && (
                          <p className="text-xs text-text-secondary mt-1 line-clamp-1">{material.spesifikasi}</p>
                        )}
                        <div className="text-xs text-text-secondary mt-2">
                          Diperbarui: {formatDate(material.updated_at)}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <Link href={`/admin/material/${material.id}/edit`} className="p-2 rounded-[8px] text-text-secondary hover:text-white hover:bg-electric/10 transition-all">
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(material.id)}
                          className="p-2 rounded-[8px] text-text-secondary hover:text-red-400 hover:bg-red-500/10 transition-all"
                          title="Hapus"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Hasil Pemasangan Tab */}
          {activeTab === 'pemasangan' && (
            <div>
              <h2 className="text-xl font-bold text-white mb-6">Hasil Pemasangan</h2>
              {loading ? (
                <div className="text-center py-8 text-text-secondary">Memuat...</div>
              ) : pemasangan.length === 0 ? (
                <div className="text-center py-12 glass-panel">
                  <p className="text-text-secondary">Belum ada hasil pemasangan</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {pemasangan.map((item) => (
                    <div key={item.id} className="glass-panel p-4 flex items-center justify-between group">
                      <div className="flex items-center gap-4 flex-1 min-w-0">
                        <div className="w-16 h-16 rounded-[10px] overflow-hidden border border-border shrink-0">
                          <img
                            src={item.foto_url}
                            alt={item.nama_tempat}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-white font-bold text-sm">{item.nama_tempat}</h3>
                          {item.deskripsi && (
                            <p className="text-xs text-text-secondary mt-1 line-clamp-1">{item.deskripsi}</p>
                          )}
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-[10px] text-electric font-medium inline-flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {item.nama_tempat}
                            </span>
                            <span className="text-xs text-text-secondary">• {formatDate(item.created_at)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <Link href={`/admin/pemasangan/${item.id}/edit`} className="p-2 rounded-[8px] text-text-secondary hover:text-white hover:bg-electric/10 transition-all">
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDeletePemasangan(item.id)}
                          className="p-2 rounded-[8px] text-text-secondary hover:text-red-400 hover:bg-red-500/10 transition-all"
                          title="Hapus"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
