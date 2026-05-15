import { neon } from '@neondatabase/serverless';

const cleanText = (value, maxLength) => String(value || '').trim().slice(0, maxLength);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Metodo nao permitido' });
  }

  if (!process.env.DATABASE_URL) {
    return res.status(500).json({ error: 'DATABASE_URL nao configurada' });
  }

  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
  const lead = {
    nome: cleanText(body.nome, 120),
    email: cleanText(body.email, 180).toLowerCase(),
    telefone: cleanText(body.telefone, 40),
    tipoProjeto: cleanText(body.tipoProjeto, 80),
    mensagem: cleanText(body.mensagem, 2000),
    origem: cleanText(body.origem, 80) || 'site-pachbann',
    status: 'novo',
  };

  if (!lead.nome || !lead.email || !lead.mensagem) {
    return res.status(400).json({ error: 'Nome, email e mensagem sao obrigatorios' });
  }

  const sql = neon(process.env.DATABASE_URL);

  try {
    const rows = await sql`
      insert into leads (nome, email, telefone, tipo_projeto, mensagem, origem, status)
      values (
        ${lead.nome},
        ${lead.email},
        ${lead.telefone || null},
        ${lead.tipoProjeto || null},
        ${lead.mensagem},
        ${lead.origem},
        ${lead.status}
      )
      returning id, criado_em
    `;

    return res.status(201).json({ ok: true, lead: rows[0] });
  } catch (error) {
    console.error('Erro ao salvar lead no Neon:', error);
    return res.status(500).json({ error: 'Erro ao salvar lead' });
  }
}
