/**
 * Admin auth for the Kameralog CMS panel.
 *
 * Uses Web Crypto so the same helpers run in the Edge proxy (middleware)
 * and in Node route handlers. The panel is single-user: one ADMIN_PASSWORD
 * from the environment. The cookie stores a SHA-256 digest of the password
 * (never the password itself).
 */

export const ADMIN_COOKIE = 'kg_admin';

export const ADMIN_ROUTES = {
  login: '/admin/login',
  dashboard: '/admin',
} as const;

/** Read the configured admin password with a safe dev fallback. */
export function adminPassword(): string {
  return process.env.ADMIN_PASSWORD || 'Desktop123';
}

export function adminPasswordIsDefault(): boolean {
  return !process.env.ADMIN_PASSWORD;
}

async function sha256Hex(input: string): Promise<string> {
  const bytes = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(digest))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

/** The value stored in the admin cookie. */
export async function adminToken(): Promise<string> {
  return sha256Hex(`kameralog-admin:${adminPassword()}`);
}

/** Constant-time comparison of a candidate token against the real one. */
export async function tokenMatches(candidate: string | undefined | null): Promise<boolean> {
  if (!candidate) return false;
  const real = await adminToken();
  const a = new TextEncoder().encode(real);
  const b = new TextEncoder().encode(candidate);
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
  return diff === 0;
}

export function cookieValue(token: string): string {
  return `${ADMIN_COOKIE}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=1209600`;
}

export function expiredCookie(): string {
  return `${ADMIN_COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`;
}
