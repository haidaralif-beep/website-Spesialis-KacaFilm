import { NextRequest, NextResponse } from 'next/server';
import { getAllTestimonials, getLatestTestimonials, createTestimonial } from '@/lib/db';

// Simple in-memory rate limiter: max 3 requests per 5 minutes per IP
const rateLimit = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW = 5 * 60 * 1000; // 5 minutes

function getRateLimitKey(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  return 'unknown';
}

function checkRateLimit(key: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(key);

  if (!entry || now > entry.resetAt) {
    rateLimit.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return false;
  }

  entry.count++;
  return true;
}

// Cleanup old entries every 10 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of rateLimit) {
    if (now > entry.resetAt) rateLimit.delete(key);
  }
}, 10 * 60 * 1000);

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit');

    if (limit) {
      const testimonials = await getLatestTestimonials(parseInt(limit));
      return NextResponse.json({ testimonials });
    }

    const testimonials = await getAllTestimonials();
    return NextResponse.json({ testimonials });
  } catch (error) {
    return NextResponse.json({ error: 'Gagal mengambil data' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nama, rating, testimoni, lokasi, honeypot } = body;

    if (honeypot) {
      return NextResponse.json({ success: true });
    }

    // Rate limiting
    const key = getRateLimitKey(request);
    if (!checkRateLimit(key)) {
      return NextResponse.json(
        { error: 'Terlalu banyak permintaan. Coba lagi dalam 5 menit.' },
        { status: 429 }
      );
    }

    if (!nama || !testimoni) {
      return NextResponse.json({ error: 'Nama dan testimoni wajib diisi' }, { status: 400 });
    }

    if (rating && (rating < 1 || rating > 5)) {
      return NextResponse.json({ error: 'Rating harus antara 1-5' }, { status: 400 });
    }

    const id = await createTestimonial(nama.trim(), rating || 5, testimoni.trim(), lokasi?.trim() || null);
    return NextResponse.json({ success: true, id }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Gagal menyimpan testimoni' }, { status: 500 });
  }
}
