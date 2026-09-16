import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

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

    // Sanitize filename
    const safeName = file.name
      .replace(/[^a-zA-Z0-9._-]/g, '_')
      .replace(/\.{2,}/g, '.')
      .replace(/^\.+$/, '_');

    const fileName = `uploads/${Date.now()}_${safeName}`;

    const { error } = await supabase.storage
      .from('kaca-film')
      .upload(fileName, buffer, {
        contentType: file.type,
        upsert: false,
      });

    if (error) {
      return NextResponse.json({ error: `Gagal upload: ${error.message}` }, { status: 500 });
    }

    const { data: urlData } = supabase.storage
      .from('kaca-film')
      .getPublicUrl(fileName);

    return NextResponse.json({ success: true, url: urlData.publicUrl, fileName });
  } catch (error: any) {
    return NextResponse.json({ error: 'Gagal mengupload file' }, { status: 500 });
  }
}
