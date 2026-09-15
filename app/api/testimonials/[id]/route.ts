import { NextRequest, NextResponse } from 'next/server';
import { getTestimonialById, updateTestimonial, deleteTestimonial } from '@/lib/db';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const testimonialId = parseInt(id);

    if (isNaN(testimonialId)) {
      return NextResponse.json({ error: 'ID tidak valid' }, { status: 400 });
    }

    const testimonial = await getTestimonialById(testimonialId);
    if (!testimonial) {
      return NextResponse.json({ error: 'Testimoni tidak ditemukan' }, { status: 404 });
    }

    return NextResponse.json({ testimonial });
  } catch (error) {
    return NextResponse.json({ error: 'Gagal mengambil data' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const testimonialId = parseInt(id);

    if (isNaN(testimonialId)) {
      return NextResponse.json({ error: 'ID tidak valid' }, { status: 400 });
    }

    const body = await request.json();
    const { nama, rating, testimoni, lokasi } = body;

    if (!nama || !testimoni) {
      return NextResponse.json({ error: 'Nama dan testimoni wajib diisi' }, { status: 400 });
    }

    const existing = await getTestimonialById(testimonialId);
    if (!existing) {
      return NextResponse.json({ error: 'Testimoni tidak ditemukan' }, { status: 404 });
    }

    await updateTestimonial(testimonialId, nama.trim(), rating || 5, testimoni.trim(), lokasi?.trim() || null);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Gagal memperbarui data' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const testimonialId = parseInt(id);

    if (isNaN(testimonialId)) {
      return NextResponse.json({ error: 'ID tidak valid' }, { status: 400 });
    }

    const existing = await getTestimonialById(testimonialId);
    if (!existing) {
      return NextResponse.json({ error: 'Testimoni tidak ditemukan' }, { status: 404 });
    }

    await deleteTestimonial(testimonialId);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Gagal menghapus data' }, { status: 500 });
  }
}
