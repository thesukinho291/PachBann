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

### 2. Configurar o Firebase (Opcional)

O formulário de contato funciona em modo demonstração sem Firebase. Para ativar o salvamento real dos leads:

#### Passo 1: Criar Projeto Firebase

1. Acesse [Firebase Console](https://console.firebase.google.com/)
2. Clique em "Adicionar projeto"
3. Dê um nome ao projeto (ex: "pachbann-site")
4. Desabilite o Google Analytics (opcional) e clique em "Criar projeto"

#### Passo 2: Registrar o App Web

1. No painel do projeto, clique no ícone `</>` (Web)
2. Dê um apelido ao app (ex: "Site PachBann")
3. Clique em "Registrar app"
4. **Copie** o objeto `firebaseConfig` fornecido

#### Passo 3: Configurar o Código

1. Abra o arquivo `main.js`
2. Localize a seção `firebaseConfig`
3. **Substitua** os valores placeholder pelos dados do seu projeto:

```javascript
const firebaseConfig = {
    apiKey: "COLE_SUA_API_KEY_AQUI",
    authDomain: "seu-projeto.firebaseapp.com",
    projectId: "seu-projeto-id",
    storageBucket: "seu-projeto.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abc123def456"
};
```

#### Passo 4: Criar o Banco de Dados

1. No Firebase Console, vá em "Firestore Database"
2. Clique em "Criar banco de dados"
3. Escolha o modo de inicialização:
   - **Modo de teste**: Para desenvolvimento (permite leitura/escrita sem autenticação)
   - **Modo de produção**: Para produção com regras de segurança
4. Selecione uma localização (recomendado: `southamerica-east1` para projetos brasileiros)

#### Passo 5: Regras de Segurança

No Firestore, vá em "Regras" e substitua pelo seguinte:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /leads/{leadId} {
      allow create: if true;
      allow read, update, delete: if false;
    }
  }
}
```

Isso permite que qualquer pessoa envie formulários, mas apenas você pode visualizar e editar os leads pelo console do Firebase.

#### Passo 6: Testar

1. Recarregue a página
2. Abra o console do navegador (F12)
3. Preencha e envie o formulário
4. Verifique se a mensagem "✅ Firebase conectado com sucesso!" aparece
5. No Firebase Console, verifique se o lead aparece na coleção "leads"

## 📁 Estrutura de Arquivos

```
pachbann-site/
├── index.html          # Página principal
├── style.css           # Estilos globais
├── main.js             # JavaScript principal
├── firebase.js         # Configuração do Firebase
├── README.md           # Este arquivo
│
└── assets/
    ├── logo1.png        # Logo completa (fornecida)
    └── logo2.png       # Ícone PB (fornecida)
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
