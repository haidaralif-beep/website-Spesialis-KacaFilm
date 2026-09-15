import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'File tidak ditemukan' }, { status: 400 });
    }

    // File type validation
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: 'Tipe file tidak diizinkan. Hanya JPG, PNG, dan WebP yang diterima.' },
        { status: 400 }
      );
    }

    // File size validation
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: 'Ukuran file terlalu besar. Maksimal 5MB.' },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Sanitize filename — strip path separators and null bytes
    const safeName = file.name
      .replace(/[^a-zA-Z0-9._-]/g, '_')
      .replace(/\.{2,}/g, '.')
      .replace(/^\.+$/, '_');

    const fileName = `material_${Date.now()}_${safeName}`;
    const uploadDir = join(process.cwd(), 'public', 'uploads');
    const filePath = join(uploadDir, fileName);

    // Verify resolved path is inside uploads directory
    const resolved = filePath.replace(/\\/g, '/');
    const allowedDir = uploadDir.replace(/\\/g, '/');
    if (!resolved.startsWith(allowedDir)) {
      return NextResponse.json({ error: 'Nama file tidak valid' }, { status: 400 });
    }

    await mkdir(uploadDir, { recursive: true });
    await writeFile(filePath, buffer);

    const url = `/uploads/${fileName}`;
    return NextResponse.json({ success: true, url, fileName });
  } catch (error: any) {
    return NextResponse.json({ error: 'Gagal mengupload file' }, { status: 500 });
  }
}
