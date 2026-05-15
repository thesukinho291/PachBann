import jwt from 'jsonwebtoken';

const COOKIE_NAME = 'pachbann_admin_session';
const SESSION_TTL_SECONDS = 60 * 60 * 12;

function getJwtSecret() {
  const secret = process.env.ADMIN_JWT_SECRET;
  if (!secret) {
    throw new Error('ADMIN_JWT_SECRET nao configurado');
  }
  return secret;
}

function parseCookies(req) {
  const raw = req.headers?.cookie || '';
  return raw.split(';').reduce((acc, item) => {
    const [k, ...rest] = item.trim().split('=');
    if (!k) return acc;
    acc[k] = decodeURIComponent(rest.join('='));
    return acc;
  }, {});
}

export function createSessionToken(payload) {
  return jwt.sign(payload, getJwtSecret(), { expiresIn: SESSION_TTL_SECONDS });
}

export function verifySessionToken(token) {
  return jwt.verify(token, getJwtSecret());
}

export function getSessionFromRequest(req) {
  const cookies = parseCookies(req);
  const token = cookies[COOKIE_NAME];
  if (!token) return null;
  try {
    return verifySessionToken(token);
  } catch {
    return null;
  }
}

export function setSessionCookie(res, token) {
  const isProd = process.env.NODE_ENV === 'production';
  res.setHeader(
    'Set-Cookie',
    `${COOKIE_NAME}=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${SESSION_TTL_SECONDS}; ${isProd ? 'Secure;' : ''}`
  );
}

export function clearSessionCookie(res) {
  const isProd = process.env.NODE_ENV === 'production';
  res.setHeader(
    'Set-Cookie',
    `${COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0; ${isProd ? 'Secure;' : ''}`
  );
}
