# PachBann Web Design - Site Oficial

Transformamos sua visão em presença digital.

## 📋 Visão Geral

Site institucional completo da PachBann Web Design, desenvolvido com HTML5, CSS3 e JavaScript vanilla. O site inclui:

- ✅ Design moderno com dark theme e glassmorphism
- ✅ Fully responsive (mobile, tablet, desktop)
- ✅ Animações suaves de scroll
- ✅ Formulário de contato integrado com Firebase Firestore
- ✅ Partículas animadas no hero
- ✅ Contadores animados
- ✅ Filtros de portfólio interativos
- ✅ SEO otimizado

## 🚀 Como Usar

### 1. Abrir o Site

Basta abrir o arquivo `index.html` no navegador:

```bash
# No Windows
start index.html

# No Mac
open index.html

# No Linux
xdg-open index.html
```

Ou arraste o arquivo `index.html` para o navegador.

### 2. Configurar o Neon PostgreSQL

O formulário de contato agora envia os leads para a rota `/api/leads`, que salva no Neon usando a variável de ambiente `DATABASE_URL`.

#### Passo 1: Criar a tabela

No painel do Neon, abra o **SQL Editor**, cole o conteúdo de `db/schema.sql` e execute.

#### Passo 2: Configurar a variável de ambiente

Crie um arquivo `.env.local` para desenvolvimento local:

```bash
DATABASE_URL="postgresql://USER:PASSWORD@HOST/neondb?sslmode=require"
```

No deploy da Vercel, adicione a mesma variável em **Project Settings > Environment Variables**.

#### Passo 3: Rodar localmente

Para testar apenas o site:

```bash
npm install
npm run dev
```

Para testar site + API localmente, use a Vercel CLI:

```bash
npx vercel dev
```

> Importante: nao coloque a connection string do Neon dentro do `main.js`, `index.html` ou qualquer arquivo publico.

### 3. Firebase legado

O código ainda mantém um fallback antigo para Firebase/localStorage caso a API `/api/leads` não esteja disponível. Para produção, prefira o Neon com `DATABASE_URL` configurada.

## 📁 Estrutura de Arquivos

```
pachbann-site/
├── index.html          # Página principal
├── style.css           # Estilos globais
├── main.js             # JavaScript principal
├── api/
│   └── leads.js        # API que salva leads no Neon
├── db/
│   └── schema.sql      # Tabela de leads
├── README.md           # Este arquivo
├── logo1.png           # Logo completa
└── logo2.png           # Ícone PB
```

## 🎨 Personalização

### Cores

Todas as cores estão definidas como variáveis CSS no `style.css`:

```css
:root {
    --color-bg-primary: #1a202c;
    --color-bg-secondary: #2d3748;
    --color-accent: #ffffff;
    /* ... outras cores */
}
```

### Tipografia

As fontes estão importadas do Google Fonts:
- **Playfair Display**: Títulos (elegante, sofisticado)
- **DM Sans**: Corpo (moderno, legível)

### Conteúdo

Para alterar textos, basta editar o `index.html`. Todos os textos estão em português brasileiro.

## 🔧 Funcionalidades

### Animações

- Fade-in + slide-up ao entrar na viewport
- Contadores numéricos animados
- Partículas flutuantes no hero
- Hover effects em cards e botões
- Smooth scroll para links internos

### Formulário

- Validação em tempo real
- Máscara de telefone automática
- Feedback visual de sucesso/erro
- Fallback para WhatsApp em caso de erro

### Responsividade

- Mobile: 1 coluna, menu hamburguer
- Tablet: 2 colunas
- Desktop: 3 colunas

## 📱 Contato

- **Telefone**: (15) 99798-4583
- **E-mail**: contato@pachbann.com
- **WhatsApp**: [Enviar mensagem](https://wa.me/5515997984583)

## 📝 Notas

- O site funciona 100% offline (apenas o Firebase precisa de internet)
- Imagens do portfólio são placeholders (gradientes coloridos)
- Links de redes sociais são fictícios (configure os reais)
- O formulário funciona em modo demo sem Firebase configurado

---

© 2026 PachBann Web Design. Todos os direitos reservados.
