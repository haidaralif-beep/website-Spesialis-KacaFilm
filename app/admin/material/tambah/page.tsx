'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function TambahMaterialPage() {
  const [nama_bahan, setNamaBahan] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [spesifikasi, setSpesifikasi] = useState('');
  const [fotoList, setFotoList] = useState<string[]>([]);
  const [captionList, setCaptionList] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/materials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nama_bahan, deskripsi: deskripsi || null, spesifikasi: spesifikasi || null }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Gagal menambahkan bahan');

      // Upload photos if any
      for (let i = 0; i < fotoList.length; i++) {
        await fetch('/api/materials', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'photo',
            material_id: data.id,
            url: fotoList[i],
            caption: captionList[i] || null,
          }),
        });
      }

      router.push('/admin/material');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUploadFoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    setUploading(true);
    const newUrls: string[] = [];
    const newCaptions: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const formData = new FormData();
      formData.append('file', files[i]);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        newUrls.push(data.url);
        newCaptions.push(data.caption || '');
      }
    }

    setFotoList([...fotoList, ...newUrls]);
    setCaptionList([...captionList, ...Array(newUrls.length).fill('')]);
    setUploading(false);
  };

  const handleCaptionChange = (index: number, value: string) => {
    const newCaptions = [...captionList];
    newCaptions[index] = value;
    setCaptionList(newCaptions);
  };

  const handleRemoveFoto = (index: number) => {
    const newFotos = [...fotoList];
    const newCaptions = [...captionList];
    newFotos.splice(index, 1);
    newCaptions.splice(index, 1);
    setFotoList(newFotos);
    setCaptionList(newCaptions);
  };

  return (
    <div>
      <div className="min-h-screen bg-background pt-24 pb-20">
        <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none"></div>
        <div className="container-custom relative z-10 max-w-3xl mx-auto">
          <Link href="/admin/material" className="inline-flex items-center gap-2 text-text-secondary hover:text-electric transition-colors text-sm font-medium mb-6">
            ← Kembali
          </Link>

          <h1 className="text-2xl font-black text-white mb-8">Tambah Bahan Baru</h1>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Info Bahan */}
            <div className="glass-panel p-6">
              <h2 className="text-lg font-bold text-white mb-5">Informasi Bahan</h2>

              {error && (
                <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-[10px] text-red-300 text-sm">
                  {error}
                </div>
              )}

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">Nama Bahan *</label>
                  <input
                    type="text"
                    value={nama_bahan}
                    onChange={(e) => setNamaBahan(e.target.value)}
                    className="w-full px-4 py-3 bg-surface-secondary/50 border border-border rounded-[10px] text-white placeholder-text-secondary focus:outline-none focus:border-electric transition-colors"
                    placeholder="Misal: Nano Ceramic Solar Film"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">Spesifikasi</label>
                  <textarea
                    value={spesifikasi}
                    onChange={(e) => setSpesifikasi(e.target.value)}
                    className="w-full px-4 py-3 bg-surface-secondary/50 border border-border rounded-[10px] text-white placeholder-text-secondary focus:outline-none focus:border-electric transition-colors resize-none h-24"
                    placeholder="UV Rejection: 99%, Heat Rejection: 95%, VLT: 35%, Thickness: 2 mil"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">Deskripsi</label>
                  <textarea
                    value={deskripsi}
                    onChange={(e) => setDeskripsi(e.target.value)}
                    className="w-full px-4 py-3 bg-surface-secondary/50 border border-border rounded-[10px] text-white placeholder-text-secondary focus:outline-none focus:border-electric transition-colors resize-none h-32"
                    placeholder="Deskripsi lengkap tentang bahan ini..."
                  />
                </div>
              </div>
            </div>

            {/* Upload Foto */}
            <div className="glass-panel p-6">
              <h2 className="text-lg font-bold text-white mb-5">Foto Bahan</h2>

              <div>
                <input
                  type="file"
                  id="foto"
                  multiple
                  accept="image/*"
                  onChange={handleUploadFoto}
                  className="hidden"
                />
                <label
                  htmlFor="foto"
                  className={`w-full px-5 py-4 rounded-[10px] border border-dashed border-border text-white hover:border-electric hover:text-electric transition-all flex items-center justify-center gap-3 cursor-pointer text-sm font-medium ${
                    uploading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {uploading ? (
                    'Mengupload...'
                  ) : (
                    <>
                      <span className="text-2xl">+</span>
                      <span>Pilih Foto</span>
                    </>
                  )}
                </label>
              </div>

              {fotoList.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  {fotoList.map((url, index) => (
                    <div key={index} className="rounded-[10px] overflow-hidden border border-border bg-surface-secondary/30">
                      <div className="aspect-square overflow-hidden">
                        <img src={url} alt={`Preview ${index + 1}`} className="w-full h-full object-cover object-center" />
                      </div>
                      <div className="p-2">
                        <input
                          type="text"
                          value={captionList[index] || ''}
                          onChange={(e) => handleCaptionChange(index, e.target.value)}
                          className="w-full px-2 py-1.5 bg-surface-secondary/50 border border-border rounded-[8px] text-xs text-white placeholder-text-secondary focus:outline-none focus:border-electric"
                          placeholder="Caption foto"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveFoto(index)}
                          className="w-full mt-1.5 py-1 text-xs text-red-400 hover:text-red-300"
                        >
                          Hapus
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Submit */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading || !nama_bahan || fotoList.length === 0}
                className="btn-cta-blue px-6 py-3 text-sm font-bold disabled:opacity-50 disabled:cursor-wait"
              >
                {loading ? 'Menyimpan...' : 'Simpan'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
