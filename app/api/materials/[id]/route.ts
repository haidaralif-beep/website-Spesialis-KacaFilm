import { NextRequest, NextResponse } from 'next/server';
import { getMaterialById, updateMaterial, deleteMaterial, getPhotosByMaterialId } from '@/lib/db';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const materialId = parseInt(id);

    if (isNaN(materialId)) {
      return NextResponse.json({ error: 'ID tidak valid' }, { status: 400 });
    }

    const material = await getMaterialById(materialId);
    
    if (!material) {
      return NextResponse.json({ error: 'Material tidak ditemukan' }, { status: 404 });
    }

    const photos = await getPhotosByMaterialId(materialId);
    return NextResponse.json({ material, photos });
  } catch (error) {
    return NextResponse.json({ error: 'Gagal mengambil data' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const materialId = parseInt(id);

    if (isNaN(materialId)) {
      return NextResponse.json({ error: 'ID tidak valid' }, { status: 400 });
    }

    const body = await request.json();
    const { nama_bahan, deskripsi, spesifikasi } = body;

    if (!nama_bahan) {
      return NextResponse.json({ error: 'Nama bahan wajib diisi' }, { status: 400 });
    }

    const material = await getMaterialById(materialId);
    if (!material) {
      return NextResponse.json({ error: 'Material tidak ditemukan' }, { status: 404 });
    }

    await updateMaterial(materialId, nama_bahan, deskripsi || null, spesifikasi || null);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Gagal memperbarui data' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const materialId = parseInt(id);

    if (isNaN(materialId)) {
      return NextResponse.json({ error: 'ID tidak valid' }, { status: 400 });
    }

    const material = await getMaterialById(materialId);
    
    if (!material) {
      return NextResponse.json({ error: 'Material tidak ditemukan' }, { status: 404 });
    }

    await deleteMaterial(materialId);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Gagal menghapus data' }, { status: 500 });
  }
}
