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
- Login admin validado no banco de dados
- Persistência do conteúdo do site no Neon
- Persistência dos leads no Neon

## Estrutura principal

```text
.
├── index.html
├── style.css
├── main.js
├── api
│   ├── _auth.js
│   ├── admin-login.js
│   ├── admin-logout.js
│   ├── admin-me.js
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
- `admin_users`: usuários autorizados do painel

No painel do Neon:

1. Abra o SQL Editor.
2. Execute o conteúdo de `db/schema.sql`.

## Variáveis de ambiente

A aplicação usa:

```env
DATABASE_URL="postgresql://..."
ADMIN_JWT_SECRET="uma-string-grande-e-secreta"
```

Essa variável deve ser configurada:

- Local (arquivo `.env` ou `.env.local`)
- Vercel (Environment Variables)

## Criar usuário admin no banco

1. Gere o hash da senha:

```bash
node -e "import bcrypt from 'bcryptjs'; bcrypt.hash('SUA_SENHA_FORTE', 12).then(console.log)"
```

2. No Neon SQL Editor, insira o usuário:

```sql
insert into admin_users (email, password_hash, ativo)
values ('seu-email@dominio.com', 'COLE_O_HASH_AQUI', true)
on conflict (email) do update set
  password_hash = excluded.password_hash,
  ativo = true;
```

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
2. Configure `DATABASE_URL` e `ADMIN_JWT_SECRET` em:
   `Project Settings > Environment Variables`
3. Faça deploy/redeploy.

## Endpoints usados

- `POST /api/admin-login`: autentica admin
- `GET /api/admin-me`: valida sessão atual
- `POST /api/admin-logout`: encerra sessão
- `POST /api/leads`: salva lead do formulário
- `GET /api/leads`: lista leads (requer sessão admin)
- `GET /api/site-content`: carrega conteúdo do site
- `PUT /api/site-content`: salva conteúdo editado (requer sessão admin)

## Comportamento de fallback

Se a API não estiver disponível em ambiente local, o frontend mantém fallback em `localStorage` para evitar perda de edição/teste.

## Observações

- Não versionar `.env` nem strings de conexão em arquivos públicos.
- O envio real para banco depende da `DATABASE_URL` válida.

---

PachBann Web Design
