'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Star } from 'lucide-react';

export default function AddTestimonialPage() {
  const router = useRouter();
  const [nama, setNama] = useState('');
  const [rating, setRating] = useState(5);
  const [testimoni, setTestimoni] = useState('');
  const [lokasi, setLokasi] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nama, rating, testimoni, lokasi: lokasi || null }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Gagal menyimpan');

      router.push('/admin/testimonials');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <div className="min-h-screen bg-background pt-24 pb-20">
        <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none"></div>
        <div className="container-custom relative z-10 max-w-xl mx-auto">
          <Link href="/admin/testimonials" className="inline-flex items-center gap-2 text-text-secondary hover:text-electric transition-colors text-sm font-medium mb-6">
            ← Kembali
          </Link>

          <h1 className="text-2xl font-black text-white mb-8">Tambah Testimoni</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="glass-panel p-6 space-y-5">
              {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-[10px] text-red-300 text-sm">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">Nama *</label>
                <input
                  type="text"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  className="w-full px-4 py-3 bg-surface-secondary/50 border border-border rounded-[10px] text-white placeholder-text-secondary focus:outline-none focus:border-electric transition-colors"
                  placeholder="Nama pelanggan"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">Rating *</label>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="transition-all hover:scale-110"
                    >
                      <Star
                        className={`w-7 h-7 ${star <= rating ? 'text-electric fill-electric' : 'text-text-secondary/30'}`}
                      />
                    </button>
                  ))}
                  <span className="text-text-secondary text-sm ml-2">{rating}/5</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">Testimoni *</label>
                <textarea
                  value={testimoni}
                  onChange={(e) => setTestimoni(e.target.value)}
                  className="w-full px-4 py-3 bg-surface-secondary/50 border border-border rounded-[10px] text-white placeholder-text-secondary focus:outline-none focus:border-electric transition-colors resize-none h-28"
                  placeholder="Tuliskan testimoni pelanggan..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">Lokasi (opsional)</label>
                <input
                  type="text"
                  value={lokasi}
                  onChange={(e) => setLokasi(e.target.value)}
                  className="w-full px-4 py-3 bg-surface-secondary/50 border border-border rounded-[10px] text-white placeholder-text-secondary focus:outline-none focus:border-electric transition-colors"
                  placeholder="Contoh: Jakarta Selatan"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting || !nama || !testimoni}
              className="w-full btn-cta-blue py-3.5 text-sm font-bold disabled:opacity-50 disabled:cursor-wait"
            >
              {submitting ? 'Menyimpan...' : 'Simpan'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
