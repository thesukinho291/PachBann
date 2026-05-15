import { neon } from '@neondatabase/serverless';
import bcrypt from 'bcryptjs';
import { createSessionToken, setSessionCookie } from './_auth.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Metodo nao permitido' });
  }

  if (!process.env.DATABASE_URL) {
    return res.status(500).json({ error: 'DATABASE_URL nao configurada' });
  }

  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
  const email = String(body.email || '').trim().toLowerCase();
  const password = String(body.password || '');

  if (!email || !password) {
    return res.status(400).json({ error: 'Email e senha sao obrigatorios' });
  }

  const sql = neon(process.env.DATABASE_URL);
  try {
    const rows = await sql`
      select id, email, password_hash, ativo
      from admin_users
      where email = ${email}
      limit 1
    `;

    const user = rows[0];
    if (!user || !user.ativo) {
      return res.status(401).json({ error: 'Credenciais invalidas' });
    }

    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) {
      return res.status(401).json({ error: 'Credenciais invalidas' });
    }

    const token = createSessionToken({ sub: user.id, email: user.email, role: 'admin' });
    setSessionCookie(res, token);
    return res.status(200).json({ ok: true, user: { id: user.id, email: user.email } });
  } catch (error) {
    console.error('Erro no login admin:', error);
    return res.status(500).json({ error: 'Erro ao validar login' });
  }
}
