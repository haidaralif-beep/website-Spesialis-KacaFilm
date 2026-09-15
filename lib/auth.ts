import crypto from 'crypto';

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is required');
}
const JWT_SECRET = process.env.JWT_SECRET;

export async function hashPassword(password: string) {
  const bcrypt = await import('bcryptjs');
  return bcrypt.hash(password, 10);
}

export async function comparePassword(password: string, hash: string) {
  const bcrypt = await import('bcryptjs');
  return bcrypt.compare(password, hash);
}

function base64url(input: Buffer): string {
  return input.toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}

export function createToken(nama: string): string {
  const header = base64url(Buffer.from('{"alg":"HS256","typ":"JWT"}'));
  const payload = base64url(Buffer.from(JSON.stringify({ nama, exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60 })));
  const signature = crypto
    .createHmac('sha256', JWT_SECRET)
    .update(`${header}.${payload}`)
    .digest()
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');

  return `${header}.${payload}.${signature}`;
}
