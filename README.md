# PachBann Web Design

Site institucional da PachBann Web Design, empresa especializada na criação de sites profissionais para negócios que desejam fortalecer sua presença digital com identidade, clareza e performance.

## Sobre o projeto

O site apresenta a marca, os serviços oferecidos, projetos publicados, equipe e canais de contato. A experiência foi pensada para comunicar profissionalismo, facilitar a navegação e aproximar potenciais clientes da empresa.

## Seções

- **Início:** apresentação da PachBann e chamada principal.
- **Sobre:** posicionamento, proposta de valor e visão da empresa.
- **Serviços:** soluções digitais oferecidas aos clientes.
- **Portfólio:** projetos desenvolvidos e publicados.
- **Equipe:** profissionais envolvidos na operação.
- **Contato:** formulário para novos orçamentos e solicitações.
- **Painel administrativo:** área restrita para gestão de conteúdo e leads.

## Tecnologias

- HTML
- CSS
- JavaScript
- Vite
- Node.js
- Neon/Postgres
- Resend

## Produção

O projeto está publicado em:

https://pachbann.com.br/

## Estrutura

- `index.html`: página principal do site.
- `login.html`: acesso ao painel administrativo.
- `main.js`: interações, conteúdo dinâmico e integrações do site.
- `login.js`: autenticação do painel administrativo.
- `api/`: rotas de login, leads e conteúdo.
- `db/schema.sql`: estrutura inicial do banco de dados.
- `public/`: arquivos públicos e mídia.

## Execução local

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## VPS

Em produção, o projeto roda em uma VPS com Node.js servindo o build estático e as rotas `/api/*`.

Variáveis de ambiente necessárias:

- `PORT`: porta local usada pelo servidor Node.
- `DATABASE_URL`: conexão com o banco Neon/Postgres.
- `ADMIN_JWT_SECRET`: chave privada para assinatura da sessão administrativa.
- `RESEND_API_KEY`: chave da API do Resend.
- `CONTACT_TO_EMAIL`: e-mail que recebe os contatos do site.
- `CONTACT_FROM_EMAIL`: remetente usado nos envios pelo Resend.

Comandos principais:

```bash
npm install
npm run build
npm start
```

Para manter o processo ativo em produção, utilize PM2 ou outro gerenciador de processos.
