-- PostgreSQL Migration for Supabase
-- Converted from MySQL schema

-- ============================================
-- USERS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  nama VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'admin',
  created_at TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- MATERIALS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS materials (
  id SERIAL PRIMARY KEY,
  nama_bahan VARCHAR(255) NOT NULL,
  deskripsi TEXT,
  spesifikasi TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Trigger to auto-update updated_at on materials
CREATE OR REPLACE FUNCTION update_materials_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_materials_updated_at ON materials;
CREATE TRIGGER trg_materials_updated_at
  BEFORE UPDATE ON materials
  FOR EACH ROW
  EXECUTE FUNCTION update_materials_timestamp();

-- ============================================
-- MATERIAL_PHOTOS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS material_photos (
  id SERIAL PRIMARY KEY,
  material_id INTEGER NOT NULL REFERENCES materials(id) ON DELETE CASCADE,
  url VARCHAR(500) NOT NULL,
  caption TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- HASIL_PEMASANGAN TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS hasil_pemasangan (
  id SERIAL PRIMARY KEY,
  nama_tempat VARCHAR(255) NOT NULL,
  deskripsi TEXT,
  foto_url VARCHAR(500) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- TESTIMONIALS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS testimonials (
  id SERIAL PRIMARY KEY,
  nama VARCHAR(255) NOT NULL,
  rating INTEGER DEFAULT 5,
  testimoni TEXT NOT NULL,
  lokasi VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- DEFAULT ADMIN USER
-- ============================================
-- Password: admin123 (bcrypt hashed)
INSERT INTO users (nama, password, role)
VALUES ('admin', '$2a$10$YWJkMjQ0ZGYtYzI3NC00YTZiLWJlYTEtZGE5NjY0YjM5NjQ3', 'admin')
ON CONFLICT (nama) DO NOTHING;
