import { NextRequest, NextResponse } from 'next/server';
import { comparePassword, createToken } from '@/lib/auth';
import { getUserByNama } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nama, password } = body;

    if (!nama || !password) {
      return NextResponse.json({ error: 'Nama dan password wajib diisi' }, { status: 400 });
    }

    let user;
    try {
      user = await getUserByNama(nama);
    } catch (dbErr: any) {
      console.error('[LOGIN] DB error:', dbErr.message);
      return NextResponse.json({ error: 'Database error: ' + dbErr.message }, { status: 500 });
    }

    if (!user) {
      return NextResponse.json({ error: 'Nama atau password salah' }, { status: 401 });
    }

    const isValid = await comparePassword(password, user.password);
    if (!isValid) {
      return NextResponse.json({ error: 'Nama atau password salah' }, { status: 401 });
    }

    const token = createToken(user.nama);
    const response = NextResponse.json({ success: true, message: 'Login berhasil' });
    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60,
      path: '/',
    });

    return response;
  } catch (error: any) {
    console.error('[LOGIN] Fatal error:', error.message);
    return NextResponse.json({ error: 'Terjadi kesalahan: ' + error.message }, { status: 500 });
  }
}
