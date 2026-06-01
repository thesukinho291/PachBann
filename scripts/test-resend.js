import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

loadEnvFile();

const required = ['RESEND_API_KEY', 'CONTACT_TO_EMAIL', 'CONTACT_FROM_EMAIL'];
const missing = required.filter((key) => !process.env[key]);

if (missing.length) {
  console.error(`Variaveis ausentes no .env: ${missing.join(', ')}`);
  process.exit(1);
}

const response = await fetch('https://api.resend.com/emails', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    from: process.env.CONTACT_FROM_EMAIL,
    to: [process.env.CONTACT_TO_EMAIL],
    subject: 'Teste de email PachBann',
    html: '<p>Teste de envio pelo Resend configurado na VPS.</p>',
    text: 'Teste de envio pelo Resend configurado na VPS.',
  }),
});

const details = await response.text();

if (!response.ok) {
  console.error(`Falha no teste do Resend: ${response.status} ${details}`);
  process.exit(1);
}

console.log(`Email de teste enviado com sucesso: ${details}`);

function loadEnvFile() {
  const envPath = resolve(process.cwd(), '.env');
  if (!existsSync(envPath)) return;

  for (const line of readFileSync(envPath, 'utf8').split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    const separator = trimmed.indexOf('=');
    if (separator === -1) continue;

    const key = trimmed.slice(0, separator).trim();
    const value = trimmed.slice(separator + 1).trim().replace(/^["']|["']$/g, '');
    if (key && !process.env[key]) {
      process.env[key] = value;
    }
  }
}
