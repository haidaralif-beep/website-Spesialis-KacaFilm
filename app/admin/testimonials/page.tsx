'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Star, Trash2 } from 'lucide-react';

interface Testimonial {
  id: number;
  nama: string;
  rating: number;
  testimoni: string;
  lokasi: string | null;
  created_at: string;
}

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  async function fetchTestimonials() {
    setLoading(true);
    try {
      const res = await fetch('/api/testimonials');
      const data = await res.json();
      setTestimonials(data.testimonials || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: number, nama: string) {
    if (!confirm(`Yakin ingin menghapus testimoni dari "${nama}"?`)) return;
    try {
      await fetch(`/api/testimonials/${id}`, { method: 'DELETE' });
      setTestimonials(testimonials.filter(t => t.id !== id));
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <div className="min-h-screen bg-background pt-24 pb-20">
        <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none"></div>
        <div className="container-custom relative z-10 max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-black text-white">Testimoni</h1>
              <p className="text-text-secondary text-sm mt-1">Kelola semua testimoni pelanggan ({testimonials.length})</p>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12 text-text-secondary">Memuat...</div>
          ) : testimonials.length === 0 ? (
            <div className="glass-panel p-12 text-center">
              <p className="text-text-secondary text-sm">Belum ada testimoni.</p>
              <Link href="/testimonial/submit" className="text-electric text-sm mt-2 inline-block hover:underline">
                Kirim testimoni pertama
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {testimonials.map((item) => (
                <div key={item.id} className="glass-panel p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-bold text-white text-sm">{item.nama}</span>
                        {item.lokasi && (
                          <span className="text-xs text-text-secondary">• {item.lokasi}</span>
                        )}
                      </div>
                      <div className="flex items-center gap-0.5 mb-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-3.5 h-3.5 ${star <= item.rating ? 'text-electric fill-electric' : 'text-text-secondary/30'}`}
                          />
                        ))}
                      </div>
                      <p className="text-text-secondary text-sm leading-relaxed">&quot;{item.testimoni}&quot;</p>
                      <p className="text-text-secondary/50 text-xs mt-2">
                        {new Date(item.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => handleDelete(item.id, item.nama)}
                        className="p-2 rounded-lg text-text-secondary hover:text-red-400 hover:bg-red-500/10 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
