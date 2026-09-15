# KacaFilm Admin Dashboard Setup

## Prerequisites
- Node.js 18+
- MySQL / MariaDB database
- npm

## Installation

```bash
npm install
```

## Database Setup

### 1. Configure Environment Variables

Create/edit `.env.local`:
```env
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=your_mysql_password
MYSQL_DATABASE=kaca_film_db
JWT_SECRET=your-secret-key-here
ADMIN_PASSWORD=admin123
NEXTAUTH_URL=http://localhost:3000
```

### 2. Run Database Setup Script

```bash
npm run setup-db
```

This will:
- Create the `kaca_film_db` database
- Create tables: `users`, `materials`, `material_photos`
- Create default admin user:
  - **Nama**: `admin`
  - **Password**: `admin123` (atau nilai dari `ADMIN_PASSWORD`)

### 3. Open Admin Dashboard

Buka di browser: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

Login dengan:
- **Nama**: `admin`
- **Password**: `admin123` (atau sesuai `ADMIN_PASSWORD` di `.env.local`)

## Admin Features

Setelah login, Anda bisa:

1. **Lihat Dashboard** - Statistik ringkasan (total bahan, total foto, dst.)
2. **Kelola Bahan Kaca Film** - Tambah/Edit/Hapus bahan
3. **Upload Foto Hasil Pemasangan** - Tambahkan foto untuk tiap bahan
4. **Kelola Semua Foto** - Lihat semua foto di satu tempat

## Troubleshooting

### Database Connection Error
Pastikan MySQL sudah berjalan dan konfigurasi `.env.local` benar.

### Upload Foto Gagal
Pastikan folder `public/uploads/` ada dan writable:
```bash
mkdir -p public/uploads
```

## Development

Jalankan server development:
```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000)

## Production Build

```bash
npm run build
npm run start
```
