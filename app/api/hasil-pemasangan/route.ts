import { NextRequest, NextResponse } from 'next/server';
import { getAllHasilPemasangan, getHasilPemasanganById, createHasilPemasangan, updateHasilPemasangan, deleteHasilPemasangan } from '@/lib/db';

export async function GET() {
  try {
    const items = await getAllHasilPemasangan();
    return NextResponse.json({ items });
  } catch (error) {
    console.error('GET hasil_pemasangan error:', error);
    return NextResponse.json({ error: 'Gagal mengambil data' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nama_tempat, deskripsi, foto_url } = body;

    if (!nama_tempat || !foto_url) {
      return NextResponse.json({ error: 'Nama tempat dan foto wajib diisi' }, { status: 400 });
    }

    const id = await createHasilPemasangan(nama_tempat, deskripsi || null, foto_url);
    return NextResponse.json({ success: true, id });
  } catch (error) {
    console.error('POST hasil_pemasangan error:', error);
    return NextResponse.json({ error: 'Gagal menyimpan data' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const idParam = searchParams.get('id');
    if (!idParam) {
      return NextResponse.json({ error: 'ID wajib diisi' }, { status: 400 });
    }

    const id = parseInt(idParam);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'ID tidak valid' }, { status: 400 });
    }

    const existing = await getHasilPemasanganById(id);
    if (!existing) {
      return NextResponse.json({ error: 'Data tidak ditemukan' }, { status: 404 });
    }

    const body = await request.json();
    const { nama_tempat, deskripsi, foto_url } = body;

    if (!nama_tempat || !foto_url) {
      return NextResponse.json({ error: 'Nama tempat dan foto wajib diisi' }, { status: 400 });
    }

    await updateHasilPemasangan(id, nama_tempat, deskripsi || null, foto_url);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('PUT hasil_pemasangan error:', error);
    return NextResponse.json({ error: 'Gagal memperbarui data' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const idParam = searchParams.get('id');
    if (!idParam) {
      return NextResponse.json({ error: 'ID wajib diisi' }, { status: 400 });
    }

    const id = parseInt(idParam);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'ID tidak valid' }, { status: 400 });
    }

    await deleteHasilPemasangan(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DELETE hasil_pemasangan error:', error);
    return NextResponse.json({ error: 'Gagal menghapus data' }, { status: 500 });
  }
}
