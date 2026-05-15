import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
  if (!process.env.DATABASE_URL) {
    return res.status(500).json({ error: 'DATABASE_URL nao configurada' });
  }

  const sql = neon(process.env.DATABASE_URL);

  try {
    if (req.method === 'GET') {
      const rows = await sql`
        select data
        from site_content
        where id = 'main'
        limit 1
      `;
      return res.status(200).json({ data: rows[0]?.data || null });
    }

    if (req.method === 'PUT') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
      if (!body || typeof body !== 'object') {
        return res.status(400).json({ error: 'Payload invalido' });
      }

      await sql`
        insert into site_content (id, data)
        values ('main', ${JSON.stringify(body)}::jsonb)
        on conflict (id) do update set
          data = excluded.data,
          atualizado_em = now()
      `;
      return res.status(200).json({ ok: true });
    }

    return res.status(405).json({ error: 'Metodo nao permitido' });
  } catch (error) {
    console.error('Erro na API de conteudo:', error);
    return res.status(500).json({ error: 'Erro ao processar conteudo' });
  }
}
