'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import HomeLayout from '@/components/HomeLayout';
import { Star } from 'lucide-react';

export default function SubmitTestimonialPage() {
  const router = useRouter();
  const [nama, setNama] = useState('');
  const [rating, setRating] = useState(5);
  const [testimoni, setTestimoni] = useState('');
  const [lokasi, setLokasi] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nama, rating, testimoni, lokasi: lokasi || null, honeypot }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Gagal mengirim testimoni');

      setSubmitted(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <HomeLayout>
        <section className="min-h-screen flex items-center justify-center pt-16">
          <div className="container-custom max-w-lg mx-auto text-center py-20">
            <div className="glass-panel p-10">
              <div className="w-16 h-16 rounded-full bg-electric/15 border border-electric/30 flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-electric" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h1 className="text-2xl font-black text-white mb-3">Terima Kasih!</h1>
              <p className="text-text-secondary text-sm leading-relaxed mb-6">
                Testimoni Anda berhasil dikirim dan akan segera muncul di halaman utama.
              </p>
              <Link
                href="/"
                className="btn-cta-blue inline-flex items-center gap-2 px-6 py-3 text-sm font-bold"
              >
                Kembali ke Beranda
              </Link>
            </div>
          </div>
        </section>
      </HomeLayout>
    );
  }

  return (
    <HomeLayout>
      <section className="min-h-screen pt-24 pb-20">
        <div className="container-custom max-w-xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-text-secondary hover:text-electric transition-colors text-sm font-medium mb-6">
            ← Kembali
          </Link>

          <h1 className="text-2xl font-black text-white mb-2">Kirim Testimoni</h1>
          <p className="text-text-secondary text-sm mb-8">Bagikan pengalaman Anda dengan layanan kami.</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="glass-panel p-6 space-y-5">
              {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-[10px] text-red-300 text-sm">
                  {error}
                </div>
              )}

              {/* Honeypot */}
              <input
                type="text"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">Nama Lengkap *</label>
                <input
                  type="text"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  className="w-full px-4 py-3 bg-surface-secondary/50 border border-border rounded-[10px] text-white placeholder-text-secondary focus:outline-none focus:border-electric transition-colors"
                  placeholder="Masukkan nama Anda"
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
                  placeholder="Ceritakan pengalaman Anda..."
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
              {submitting ? 'Mengirim...' : 'Kirim Testimoni'}
            </button>
          </form>
        </div>
      </section>
    </HomeLayout>
  );
}
