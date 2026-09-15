import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET!;

async function verifyTokenHMAC(token: string): Promise<boolean> {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return false;

    const [header, payload, signature] = parts;

    const key = await crypto.subtle.importKey(
      'raw',
      new TextEncoder().encode(JWT_SECRET),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    );

    const data = new TextEncoder().encode(`${header}.${payload}`);
    const sigBytes = Uint8Array.from(atob(signature.replace(/-/g, '+').replace(/_/g, '/')), c => c.charCodeAt(0));

    const valid = await crypto.subtle.verify('HMAC', key, sigBytes, data);
    if (!valid) return false;

    const payloadObj = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));
    if (!payloadObj.nama) return false;
    if (payloadObj.exp && payloadObj.exp < Math.floor(Date.now() / 1000)) return false;

    return true;
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Protect /admin routes (except login)
  if (path.startsWith('/admin') && !path.startsWith('/admin/login')) {
    const token = request.cookies.get('admin_token')?.value;

    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    if (!await verifyTokenHMAC(token)) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  // Protect mutating API routes
  const isMutatingAPI =
    (path.startsWith('/api/materials') && (request.method === 'POST' || request.method === 'PUT' || request.method === 'DELETE')) ||
    (path.startsWith('/api/hasil-pemasangan') && (request.method === 'POST' || request.method === 'DELETE')) ||
    (path === '/api/upload' && request.method === 'POST') ||
    (path.startsWith('/api/testimonials') && (request.method === 'PUT' || request.method === 'DELETE'));

  if (isMutatingAPI) {
    const token = request.cookies.get('admin_token')?.value;

    if (!token || !await verifyTokenHMAC(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/materials/:path*', '/api/hasil-pemasangan', '/api/upload', '/api/testimonials/:path*'],
};
