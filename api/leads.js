import { neon } from '@neondatabase/serverless';
import { getSessionFromRequest } from './_auth.js';

const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL || 'contato@pachbann.com.br';
const CONTACT_FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || 'PachBann <onboarding@resend.dev>';

const cleanText = (value, maxLength) => String(value || '').trim().slice(0, maxLength);

function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function leadEmailHtml(lead) {
  const rows = [
    ['Nome', lead.nome],
    ['E-mail', lead.email],
    ['Telefone', lead.telefone || '-'],
    ['Tipo de projeto', lead.tipoProjeto || '-'],
    ['Mensagem', lead.mensagem],
  ];

  return `
    <div style="font-family:Arial,sans-serif;color:#111;line-height:1.5">
      <h2>Novo contato pelo site PachBann</h2>
      ${rows.map(([label, value]) => `
        <p><strong>${label}:</strong><br>${escapeHtml(value).replace(/\n/g, '<br>')}</p>
      `).join('')}
    </div>
  `;
}

async function sendLeadEmail(lead) {
  if (!process.env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY nao configurada; lead salvo sem envio de email.');
    return { skipped: true };
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: CONTACT_FROM_EMAIL,
      to: [CONTACT_TO_EMAIL],
      reply_to: lead.email,
      subject: `Novo contato no site - ${lead.nome}`,
      html: leadEmailHtml(lead),
    }),
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Falha ao enviar email do lead: ${response.status} ${details}`);
  }

  return response.json();
}

export default async function handler(req, res) {
  if (!process.env.DATABASE_URL) {
    return res.status(500).json({ error: 'DATABASE_URL nao configurada' });
  }

  const sql = neon(process.env.DATABASE_URL);

  try {
    if (req.method === 'GET') {
      const session = getSessionFromRequest(req);
      if (!session || session.role !== 'admin') {
        return res.status(401).json({ error: 'Nao autorizado' });
      }

      const rows = await sql`
        select
          id,
          nome,
          email,
          telefone,
          tipo_projeto as "tipoProjeto",
          mensagem,
          origem,
          status,
          criado_em as "criadoEm"
        from leads
        order by criado_em desc
        limit 50
      `;
      return res.status(200).json({ leads: rows });
    }

    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Metodo nao permitido' });
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

    try {
      await sendLeadEmail(lead);
    } catch (emailError) {
      console.error('Lead salvo, mas houve erro ao enviar email:', emailError);
    }

    return res.status(201).json({ ok: true, lead: rows[0] });
  } catch (error) {
    console.error('Erro ao salvar lead no Neon:', error);
    return res.status(500).json({ error: 'Erro ao salvar lead' });
  }
}
