import { clearSessionCookie } from './_auth.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Metodo nao permitido' });
  }

  clearSessionCookie(res);
  return res.status(200).json({ ok: true });
}
