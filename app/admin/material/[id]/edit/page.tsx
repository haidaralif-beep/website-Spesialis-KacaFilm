'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

interface Material {
  id: number;
  nama_bahan: string;
  deskripsi: string | null;
  spesifikasi: string | null;
  created_at: string;
  updated_at: string;
}

interface Photo {
  id: number;
  material_id: number;
  url: string;
  caption: string | null;
  created_at: string;
}

export default function EditMaterialPage() {
  const params = useParams();
  const id = params.id as string;
  const [material, setMaterial] = useState<Material | null>(null);
  const [loading, setLoading] = useState(true);
  const [nama_bahan, setNamaBahan] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [spesifikasi, setSpesifikasi] = useState('');
  const [existingPhotos, setExistingPhotos] = useState<Photo[]>([]);
  const [fotoList, setFotoList] = useState<string[]>([]);
  const [captionList, setCaptionList] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetchMaterial();
  }, [id]);

  async function fetchMaterial() {
    setLoading(true);
    try {
      const res = await fetch(`/api/materials/${id}`);
      const data = await res.json();
      if (data.material) {
        setMaterial(data.material);
        setNamaBahan(data.material.nama_bahan);
        setDeskripsi(data.material.deskripsi || '');
        setSpesifikasi(data.material.spesifikasi || '');
        setExistingPhotos(data.photos || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const res = await fetch(`/api/materials/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nama_bahan, deskripsi: deskripsi || null, spesifikasi: spesifikasi || null }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Gagal memperbarui bahan');

      for (let i = 0; i < fotoList.length; i++) {
        const photoRes = await fetch('/api/materials', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'photo',
            material_id: parseInt(id),
            url: fotoList[i],
            caption: captionList[i] || null,
          }),
        });

        if (!photoRes.ok) {
          const photoData = await photoRes.json();
          throw new Error(photoData.error || 'Gagal mengupload foto');
        }
      }

      router.push('/admin/material');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleUploadFoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    setUploading(true);
    setError('');
    const newUrls: string[] = [];
    const newCaptions: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const formData = new FormData();
      formData.append('file', files[i]);

      try {
        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        const data = await res.json();
        if (data.success) {
          newUrls.push(data.url);
          newCaptions.push(data.caption || '');
        } else {
          setError(`Gagal upload foto: ${files[i].name}`);
        }
      } catch (err) {
        setError(`Gagal upload foto: ${files[i].name}`);
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

  const handleRemoveExistingFoto = async (photoId: number) => {
    if (!confirm('Yakin ingin menghapus foto ini?')) return;
    await fetch(`/api/materials?id=${photoId}&type=photo`, { method: 'DELETE' });
    setExistingPhotos(existingPhotos.filter(p => p.id !== photoId));
  };

  if (loading) {
    return (
      <div>
        <div className="min-h-screen bg-background pt-24 pb-20">
          <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none"></div>
          <div className="container-custom relative z-10">
            <div className="text-center py-12">
              <div className="text-text-secondary">Memuat...</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!material) {
    return (
      <div>
        <div className="min-h-screen bg-background pt-24 pb-20">
          <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none"></div>
          <div className="container-custom relative z-10">
            <div className="text-center py-12">
              <p className="text-text-secondary">Material tidak ditemukan</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="min-h-screen bg-background pt-24 pb-20">
        <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none"></div>
        <div className="container-custom relative z-10 max-w-3xl mx-auto">
          <Link href="/admin/material" className="inline-flex items-center gap-2 text-text-secondary hover:text-electric transition-colors text-sm font-medium mb-6">
            ← Kembali
          </Link>

          <h1 className="text-2xl font-black text-white mb-8">Edit Bahan: {material.nama_bahan}</h1>

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

            {/* Foto yang Sudah Ada */}
            {existingPhotos.length > 0 && (
              <div className="glass-panel p-6">
                <h2 className="text-lg font-bold text-white mb-5">Foto yang Sudah Di-upload</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {existingPhotos.map((photo) => (
                    <div key={photo.id} className="rounded-[10px] overflow-hidden border border-border bg-surface-secondary/30">
                      <div className="aspect-square overflow-hidden">
                        <img src={photo.url} alt={photo.caption || 'Foto bahan'} className="w-full h-full object-cover" />
                      </div>
                      <div className="p-2">
                        {photo.caption && (
                          <p className="text-xs text-text-secondary mb-2 line-clamp-2">{photo.caption}</p>
                        )}
                        <button
                          type="button"
                          onClick={() => handleRemoveExistingFoto(photo.id)}
                          className="w-full py-1 text-xs text-red-400 hover:text-red-300"
                        >
                          Hapus Foto
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Upload Foto Baru */}
            <div className="glass-panel p-6">
              <h2 className="text-lg font-bold text-white mb-5">Tambahkan Foto Baru</h2>
              <div>
                <input
                  type="file"
                  onChange={handleUploadFoto}
                  className="hidden"
                  id="foto-baru"
                  multiple
                  accept="image/*"
                />
                <label
                  htmlFor="foto-baru"
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
                disabled={submitting || !nama_bahan}
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
