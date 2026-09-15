import { NextRequest, NextResponse } from 'next/server';
import { getAllMaterials, createMaterial, getStats, getPhotosByMaterialId, getAllPhotos, addPhoto, deletePhoto, getMaterialById } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const include = searchParams.get('include');

    if (include === 'stats') {
      const stats = await getStats();
      return NextResponse.json({ stats });
    }

    if (include === 'photos') {
      const photos = await getAllPhotos();
      return NextResponse.json({ photos });
    }

    const materials = await getAllMaterials();
    return NextResponse.json({ materials });
  } catch (error) {
    return NextResponse.json({ error: 'Gagal mengambil data' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nama_bahan, deskripsi, spesifikasi, type } = body;

    if (type === 'photo') {
      const { material_id, url, caption } = body;

      if (!material_id || !url) {
        return NextResponse.json({ error: 'material_id dan url wajib diisi' }, { status: 400 });
      }

      const material = await getMaterialById(parseInt(material_id));
      if (!material) {
        return NextResponse.json({ error: 'Material tidak ditemukan' }, { status: 404 });
      }

      const id = await addPhoto(parseInt(material_id), url, caption || null);
      return NextResponse.json({ success: true, id }, { status: 201 });
    }

    if (!nama_bahan) {
      return NextResponse.json({ error: 'Nama bahan wajib diisi' }, { status: 400 });
    }

    const id = await createMaterial(nama_bahan, deskripsi || null, spesifikasi || null);
    return NextResponse.json({ success: true, id }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Gagal menyimpan data' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const type = searchParams.get('type');

    if (type === 'photo' && id) {
      const photoId = parseInt(id);
      if (isNaN(photoId)) {
        return NextResponse.json({ error: 'ID tidak valid' }, { status: 400 });
      }
      await deletePhoto(photoId);
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Parameter tidak valid. Sertakan type=photo dan id.' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: 'Gagal menghapus data' }, { status: 500 });
  }
}
