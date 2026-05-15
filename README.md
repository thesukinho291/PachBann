# PachBann - Site Institucional

Este repositório contém o site institucional da PachBann Web Design.

O projeto é um frontend estático (`HTML + CSS + JS`) com backend serverless na Vercel para persistência de dados no Neon (PostgreSQL).

## Stack

- Frontend: HTML, CSS, JavaScript (vanilla)
- Build: Vite
- Backend: Vercel Functions (`/api`)
- Banco: Neon PostgreSQL

## O que o projeto já faz

- Página institucional completa e responsiva
- Formulário de contato com envio para banco
- Painel admin para edição de conteúdo
- Persistência do conteúdo do site no Neon
- Persistência dos leads no Neon

## Estrutura principal

```text
.
├── index.html
├── style.css
├── main.js
├── api
│   ├── leads.js
│   └── site-content.js
├── db
│   └── schema.sql
├── logo1.png
├── logo2.png
└── README.md
```

## Banco de dados (Neon)

As tabelas usadas pelo projeto estão em `db/schema.sql`:

- `leads`: contatos enviados pelo formulário
- `site_content`: conteúdo editável do painel admin

No painel do Neon:

1. Abra o SQL Editor.
2. Execute o conteúdo de `db/schema.sql`.

## Variáveis de ambiente

A aplicação usa:

```env
DATABASE_URL="postgresql://..."
```

Essa variável deve ser configurada:

- Local (arquivo `.env` ou `.env.local`)
- Vercel (Environment Variables)

## Rodando localmente

### Apenas frontend

```bash
npm install
npm run dev
```

### Frontend + APIs (`/api`)

```bash
npx vercel dev
```

## Deploy na Vercel

1. Conecte o repositório na Vercel.
2. Configure `DATABASE_URL` em:
   `Project Settings > Environment Variables`
3. Faça deploy/redeploy.

## Endpoints usados

- `POST /api/leads`: salva lead do formulário
- `GET /api/leads`: lista leads (painel admin)
- `GET /api/site-content`: carrega conteúdo do site
- `PUT /api/site-content`: salva conteúdo editado no painel

## Comportamento de fallback

Se a API não estiver disponível em ambiente local, o frontend mantém fallback em `localStorage` para evitar perda de edição/teste.

## Observações

- Não versionar `.env` nem strings de conexão em arquivos públicos.
- O envio real para banco depende da `DATABASE_URL` válida.

---

PachBann Web Design
