PachBann Web Design - Site Oficial

Transformamos sua ideia em presença digital.

Sobre o Projeto

Este é o site institucional da PachBann Web Design, feito com HTML5, CSS3 e JavaScript puro. Ele tem tudo que você espera de um site moderno:

Design moderno com dark theme e glassmorphism
Responsivo para mobile, tablet e desktop
Animações suaves ao rolar a página
Formulário de contato que envia dados para o Firebase Firestore
Partículas animadas no hero
Contadores animados
Filtros de portfólio interativos
SEO otimizado
Como Rodar o Site

Basta abrir o arquivo index.html no navegador ou arrastar ele para o navegador.

Configurar o Firebase (Opcional)

O formulário funciona sem Firebase, mas para salvar os leads de verdade:

Crie um projeto no Firebase Console
Registre um app web e copie o firebaseConfig
Abra o main.js e substitua os valores de exemplo pelo seu firebaseConfig:
const firebaseConfig = {
    apiKey: "COLE_SUA_API_KEY_AQUI",
    authDomain: "seu-projeto.firebaseapp.com",
    projectId: "seu-projeto-id",
    storageBucket: "seu-projeto.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abc123def456"
};
No Firestore, crie uma coleção chamada leads
Use estas regras básicas para que qualquer pessoa envie o formulário, mas só você veja os dados:
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /leads/{leadId} {
      allow create: if true;
      allow read, update, delete: if false;
    }
  }
}
Teste enviando o formulário e conferindo os leads no Firebase Console.
Estrutura de Arquivos
pachbann-site/
├── index.html          # Página principal
├── style.css           # Estilos
├── main.js             # JavaScript principal
├── firebase.js         # Configuração do Firebase
├── README.md           # Este arquivo
└── assets/
    ├── logo1.png       # Logo completa
    └── logo2.png       # Ícone PB
Personalização
Cores

Todas as cores estão em variáveis CSS no style.css:

:root {
    --color-bg-primary: #1a202c;
    --color-bg-secondary: #2d3748;
    --color-accent: #ffffff;
}
Tipografia

Fontes do Google Fonts:

Playfair Display: títulos
DM Sans: corpo do texto
Conteúdo

Para alterar textos, edite o index.html. Está tudo em português.

Funcionalidades
Animações fade-in e slide-up
Contadores animados
Partículas flutuantes no hero
Hover effects em cards e botões
Smooth scroll para links internos
Formulário
Validação em tempo real
Máscara automática para telefone
Feedback visual de sucesso ou erro
Fallback para WhatsApp se algo der errado
Responsividade
Mobile: 1 coluna e menu hamburguer
Tablet: 2 colunas
Desktop: 3 colunas
Contato
Telefone: (15) 99798-4583
E-mail: contato@pachbann.com
WhatsApp: Enviar mensagem
Observações
Funciona 100% offline (exceto Firebase)
Imagens do portfólio são placeholders
Links de redes sociais são fictícios
Formulário funciona em demo mesmo sem Firebase

© 2026 PachBann Web Design. Todos os direitos reservados.
