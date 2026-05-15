import { getSessionFromRequest } from './_auth.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Metodo nao permitido' });
  }

  const session = getSessionFromRequest(req);
  if (!session || session.role !== 'admin') {
    return res.status(401).json({ authenticated: false });
  }

  return res.status(200).json({
    authenticated: true,
    user: { id: session.sub, email: session.email, role: session.role },
  });
}
