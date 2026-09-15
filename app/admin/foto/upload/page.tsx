'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function UploadHasilPemasanganPage() {
  const [namaTempat, setNamaTempat] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [fotoUrl, setFotoUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleUploadFoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        setFotoUrl(data.url);
      } else {
        setError('Gagal upload foto');
      }
    } catch (err) {
      setError('Gagal upload foto');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    setSuccess('');

    if (!fotoUrl) {
      setError('Upload foto terlebih dahulu');
      setSubmitting(false);
      return;
    }

    try {
      const res = await fetch('/api/hasil-pemasangan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nama_tempat: namaTempat,
          deskripsi: deskripsi || null,
          foto_url: fotoUrl,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Gagal menyimpan');

      setSuccess('Data berhasil disimpan!');
      setNamaTempat('');
      setDeskripsi('');
      setFotoUrl('');
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
        <div className="container-custom relative z-10 max-w-3xl mx-auto">
          <Link href="/admin/material" className="inline-flex items-center gap-2 text-text-secondary hover:text-electric transition-colors text-sm font-medium mb-6">
            ← Kembali ke Dashboard
          </Link>

          <h1 className="text-2xl font-black text-white mb-8">Tambah Hasil Pemasangan</h1>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="glass-panel p-6">
              <h2 className="text-lg font-bold text-white mb-5">Data Pemasangan</h2>

              {error && (
                <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-[10px] text-red-300 text-sm">
                  {error}
                </div>
              )}

              {success && (
                <div className="mb-4 p-3 bg-green-500/10 border border-green-500/30 rounded-[10px] text-green-300 text-sm">
                  {success}
                </div>
              )}

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">Nama Tempat *</label>
                  <input
                    type="text"
                    value={namaTempat}
                    onChange={(e) => setNamaTempat(e.target.value)}
                    className="w-full px-4 py-3 bg-surface-secondary/50 border border-border rounded-[10px] text-white placeholder-text-secondary focus:outline-none focus:border-electric transition-colors"
                    placeholder="Contoh: Bandung, Jakarta, Surabaya"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">Deskripsi</label>
                  <textarea
                    value={deskripsi}
                    onChange={(e) => setDeskripsi(e.target.value)}
                    className="w-full px-4 py-3 bg-surface-secondary/50 border border-border rounded-[10px] text-white placeholder-text-secondary focus:outline-none focus:border-electric transition-colors resize-none h-32"
                    placeholder="Deskripsi pemasangan..."
                  />
                </div>
              </div>
            </div>

            <div className="glass-panel p-6">
              <h2 className="text-lg font-bold text-white mb-5">Foto Hasil Pemasangan</h2>

              <div>
                <input
                  type="file"
                  id="foto-upload"
                  accept="image/*"
                  onChange={handleUploadFoto}
                  className="hidden"
                />
                <label
                  htmlFor="foto-upload"
                  className={`w-full px-5 py-4 rounded-[10px] border border-dashed border-border text-white hover:border-electric hover:text-electric transition-all flex items-center justify-center gap-3 cursor-pointer text-sm font-medium ${
                    uploading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {uploading ? (
                    'Mengupload...'
                  ) : fotoUrl ? (
                    'Ganti Foto'
                  ) : (
                    <>
                      <span className="text-2xl">+</span>
                      <span>Pilih Foto</span>
                    </>
                  )}
                </label>
              </div>

              {fotoUrl && (
                <div className="mt-4 rounded-[10px] overflow-hidden border border-border">
                  <img src={fotoUrl} alt="Preview" className="w-full h-64 object-cover" />
                </div>
              )}
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={submitting || !fotoUrl}
                className="btn-cta-blue px-6 py-3 text-sm font-bold disabled:opacity-50 disabled:cursor-wait"
              >
                {submitting ? 'Menyimpan...' : 'Simpan'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
