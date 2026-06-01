# PachBann Web Design

A PachBann Web Design desenvolve sites modernos para empresas, marcas e profissionais que querem se apresentar melhor no digital. A proposta da marca é unir visual profissional, navegação clara e uma experiência pensada para gerar confiança desde o primeiro contato.

## Objetivo do Site

O site institucional da PachBann apresenta a empresa, seus serviços, projetos publicados e formas de contato. Ele funciona como vitrine comercial da marca, mostrando de forma direta como a PachBann pode ajudar negócios a terem uma presença online mais forte, organizada e atual.

## Principais Seções

- Início, com apresentação da marca e chamada principal.
- Sobre, com posicionamento e visão da empresa.
- Serviços, com as soluções oferecidas pela PachBann.
- Portfólio, com projetos reais publicados.
- Equipe, com os profissionais envolvidos na marca.
- Contato, para novos clientes iniciarem uma conversa.

## Tecnologias Usadas

O projeto foi desenvolvido com HTML, CSS e JavaScript, com publicação pela Vercel. A estrutura prioriza performance, responsividade e manutenção simples da experiência visual.

## Status do Projeto

Publicado e em evolução contínua, com melhorias visuais, ajustes de conteúdo e novas seções sendo incorporadas conforme a marca cresce.

## Site Publicado

https://pach-bann.vercel.app/

## Rodando em VPS

O projeto agora pode rodar em uma VPS com Node.js servindo o build estatico e as rotas `/api/*`.

Na VPS:

```bash
git pull
npm install
npm run build
cp .env.example .env
nano .env
npm start
```

Variaveis obrigatorias no `.env`:

- `PORT`: porta local do Node, por exemplo `3000`.
- `DATABASE_URL`: conexao do Neon/Postgres.
- `ADMIN_JWT_SECRET`: chave grande e aleatoria para assinar o cookie de admin.
- `RESEND_API_KEY`: chave da API do Resend. Sem ela, o lead e salvo, mas o email nao e enviado.
- `CONTACT_TO_EMAIL` e `CONTACT_FROM_EMAIL`: emails usados no formulario de contato.

### Resend

No Resend, configure um dominio verificado e use esse dominio no remetente:

```env
RESEND_API_KEY="re_sua_chave_aqui"
CONTACT_TO_EMAIL="contato@pachbann.com.br"
CONTACT_FROM_EMAIL="PachBann <contato@pachbann.com.br>"
```

Depois de editar o `.env` na VPS, teste o envio:

```bash
npm run resend:test
```

Se o teste passar, o formulario do site tambem consegue enviar email. Se falhar com erro de remetente, confira se o dominio do `CONTACT_FROM_EMAIL` esta verificado no Resend.

Para deixar em producao, use um gerenciador de processo como PM2:

```bash
npm install -g pm2
pm2 start npm --name pachbann -- start
pm2 save
pm2 startup
```

No Nginx, aponte o dominio para a porta do Node:

```nginx
location / {
  proxy_pass http://127.0.0.1:3000;
  proxy_http_version 1.1;
  proxy_set_header Host $host;
  proxy_set_header X-Real-IP $remote_addr;
  proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  proxy_set_header X-Forwarded-Proto $scheme;
}
```
