import { Pool, PoolConfig } from 'pg';
import { hashPassword } from './auth';

let pool: Pool | null = null;

function getPool(): Pool {
  if (!pool) {
    // Strip sslmode from URL, let SSL config handle it
    const url = (process.env.DATABASE_URL || '').replace(/[?&]sslmode=[^&]*/, '').replace(/\?$/, '');
    const config: PoolConfig = {
      connectionString: url,
      ssl: { rejectUnauthorized: false },
      max: 5,
      idleTimeoutMillis: 10000,
      connectionTimeoutMillis: 10000,
    };
    pool = new Pool(config);
  }
  return pool;
}

export async function query(sql: string, params: any[] = []) {
  const p = getPool();
  try {
    const result = await p.query(sql, params);
    return result.rows;
  } catch (err: any) {
    console.error('[DB QUERY ERROR]', err.message);
    throw err;
  }
}

export interface AdminUser {
  id: number;
  nama: string;
  password: string;
  role: string;
  created_at: string;
}

export interface Material {
  id: number;
  nama_bahan: string;
  deskripsi: string | null;
  spesifikasi: string | null;
  created_at: string;
  updated_at: string;
}

export interface MaterialPhoto {
  id: number;
  material_id: number;
  url: string;
  caption: string | null;
  created_at: string;
}

export interface HasilPemasangan {
  id: number;
  nama_tempat: string;
  deskripsi: string | null;
  foto_url: string;
  created_at: string;
}

export interface Testimonial {
  id: number;
  nama: string;
  rating: number;
  testimoni: string;
  lokasi: string | null;
  created_at: string;
}

// User operations
export async function getUserByNama(nama: string): Promise<AdminUser | null> {
  const rows = await query('SELECT * FROM users WHERE nama = $1', [nama]);
  return (rows as AdminUser[])[0] || null;
}

// Material operations
export async function getAllMaterials(): Promise<Material[]> {
  return await query('SELECT * FROM materials ORDER BY created_at DESC') as Material[];
}

export async function getMaterialById(id: number): Promise<Material | null> {
  const rows = await query('SELECT * FROM materials WHERE id = $1', [id]);
  return (rows as Material[])[0] || null;
}

export async function createMaterial(nama_bahan: string, deskripsi: string | null, spesifikasi: string | null): Promise<number> {
  const result = await query('INSERT INTO materials (nama_bahan, deskripsi, spesifikasi) VALUES ($1, $2, $3) RETURNING id', [nama_bahan, deskripsi, spesifikasi]);
  return result[0].id;
}

export async function updateMaterial(id: number, nama_bahan: string, deskripsi: string | null, spesifikasi: string | null): Promise<boolean> {
  const result = await query('UPDATE materials SET nama_bahan = $1, deskripsi = $2, spesifikasi = $3 WHERE id = $4', [nama_bahan, deskripsi, spesifikasi, id]);
  return (result as any).rowCount > 0;
}

export async function deleteMaterial(id: number): Promise<boolean> {
  const result = await query('DELETE FROM materials WHERE id = $1', [id]);
  return (result as any).rowCount > 0;
}

// Photo operations
export async function getPhotosByMaterialId(materialId: number): Promise<MaterialPhoto[]> {
  return await query('SELECT * FROM material_photos WHERE material_id = $1 ORDER BY created_at DESC', [materialId]) as MaterialPhoto[];
}

export async function getAllPhotos(): Promise<(MaterialPhoto & { material_nama: string })[]> {
  return await query(`
    SELECT mp.*, m.nama_bahan as material_nama 
    FROM material_photos mp 
    JOIN materials m ON mp.material_id = m.id 
    ORDER BY mp.created_at DESC
  `) as (MaterialPhoto & { material_nama: string })[];
}

export async function addPhoto(materialId: number, url: string, caption: string | null): Promise<number> {
  const result = await query('INSERT INTO material_photos (material_id, url, caption) VALUES ($1, $2, $3) RETURNING id', [materialId, url, caption]);
  return result[0].id;
}

export async function deletePhoto(id: number): Promise<boolean> {
  const result = await query('DELETE FROM material_photos WHERE id = $1', [id]);
  return (result as any).rowCount > 0;
}

// Statistics
export async function getStats(): Promise<{
  total_materials: number;
  total_photos: number;
  materials_without_photos: number;
  top_material_by_photos: { nama_bahan: string; photo_count: number } | null;
}> {
  const totalMaterials = await query('SELECT COUNT(*) as count FROM materials');
  const totalPhotos = await query('SELECT COUNT(*) as count FROM material_photos');
  
  const results = await query(`
    SELECT m.nama_bahan, COUNT(mp.id) as photo_count 
    FROM materials m 
    LEFT JOIN material_photos mp ON m.id = mp.material_id 
    GROUP BY m.id, m.nama_bahan
    ORDER BY photo_count DESC 
    LIMIT 1
  `);
  
  const materialsWithoutPhotos = await query(`
    SELECT COUNT(*) as count FROM materials m 
    LEFT JOIN material_photos mp ON m.id = mp.material_id 
    WHERE mp.id IS NULL
  `);

  return {
    total_materials: parseInt((totalMaterials as any[])[0].count),
    total_photos: parseInt((totalPhotos as any[])[0].count),
    materials_without_photos: parseInt((materialsWithoutPhotos as any[])[0].count),
    top_material_by_photos: (results as any[])[0] || null,
  };
}

// Hasil Pemasangan operations
export async function getAllHasilPemasangan(): Promise<HasilPemasangan[]> {
  return await query('SELECT * FROM hasil_pemasangan ORDER BY created_at DESC') as HasilPemasangan[];
}

export async function getHasilPemasanganById(id: number): Promise<HasilPemasangan | null> {
  const rows = await query('SELECT * FROM hasil_pemasangan WHERE id = $1', [id]);
  return (rows as HasilPemasangan[])[0] || null;
}

export async function createHasilPemasangan(nama_tempat: string, deskripsi: string | null, foto_url: string): Promise<number> {
  const result = await query('INSERT INTO hasil_pemasangan (nama_tempat, deskripsi, foto_url) VALUES ($1, $2, $3) RETURNING id', [nama_tempat, deskripsi, foto_url]);
  return result[0].id;
}

export async function updateHasilPemasangan(id: number, nama_tempat: string, deskripsi: string | null, foto_url: string): Promise<boolean> {
  const result = await query('UPDATE hasil_pemasangan SET nama_tempat = $1, deskripsi = $2, foto_url = $3 WHERE id = $4', [nama_tempat, deskripsi, foto_url, id]);
  return (result as any).rowCount > 0;
}

export async function deleteHasilPemasangan(id: number): Promise<boolean> {
  const result = await query('DELETE FROM hasil_pemasangan WHERE id = $1', [id]);
  return (result as any).rowCount > 0;
}

// Testimonial operations
export async function getAllTestimonials(): Promise<Testimonial[]> {
  return await query('SELECT * FROM testimonials ORDER BY created_at DESC') as Testimonial[];
}

export async function getLatestTestimonials(limit: number = 10): Promise<Testimonial[]> {
  return await query('SELECT * FROM testimonials ORDER BY created_at DESC LIMIT $1', [limit]) as Testimonial[];
}

export async function getTestimonialById(id: number): Promise<Testimonial | null> {
  const rows = await query('SELECT * FROM testimonials WHERE id = $1', [id]);
  return (rows as Testimonial[])[0] || null;
}

export async function createTestimonial(nama: string, rating: number, testimoni: string, lokasi: string | null): Promise<number> {
  const result = await query('INSERT INTO testimonials (nama, rating, testimoni, lokasi) VALUES ($1, $2, $3, $4) RETURNING id', [nama, rating, testimoni, lokasi]);
  return result[0].id;
}

export async function updateTestimonial(id: number, nama: string, rating: number, testimoni: string, lokasi: string | null): Promise<boolean> {
  const result = await query('UPDATE testimonials SET nama = $1, rating = $2, testimoni = $3, lokasi = $4 WHERE id = $5', [nama, rating, testimoni, lokasi, id]);
  return (result as any).rowCount > 0;
}

export async function deleteTestimonial(id: number): Promise<boolean> {
  const result = await query('DELETE FROM testimonials WHERE id = $1', [id]);
  return (result as any).rowCount > 0;
}
