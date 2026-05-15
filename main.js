/**
 * PACHBANN WEB DESIGN - MAIN.JS
 * Sistema de gerenciamento de conteudo com Neon + API
 */

let siteData = {};
let isAdminLogged = false;

// ───────────────────────────────────────
// DADOS PADRÃO
// ───────────────────────────────────────
const defaultData = {
    hero: {
        badge: 'Web Design & Desenvolvimento',
        titulo: 'Transformamos sua visão em presença digital',
        subtitulo: 'Criamos sites modernos, rápidos e eficientes que geram resultados reais para o seu negócio.'
    },
    sobre: {
        label: 'Sobre',
        titulo: 'Quem somos',
        texto1: 'A PachBann Web Design nasceu em 2026 com uma missão clara: entregar sites modernos, rápidos e eficientes que realmente funcionam para os negócios dos nossos clientes.',
        texto2: 'Combinamos design criativo com tecnologia de ponta para criar presença digital que converte visitantes em clientes.',
        stat1Valor: '50',
        stat2Valor: '100'
    },
    features: [
        { id: 'f1', titulo: 'Design Moderno', descricao: 'Interfaces limpas e elegantes que refletem a identidade da sua marca.' },
        { id: 'f2', titulo: 'Performance', descricao: 'Sites otimizados para carregamento ultra-rápido e melhor experiência.' },
        { id: 'f3', titulo: 'Responsivo', descricao: 'Perfeito em qualquer dispositivo, de mobile a desktop.' },
        { id: 'f4', titulo: 'Seguro', descricao: 'Infraestrutura segura com proteção de dados garantida.' }
    ],
    servicos: {
        label: 'O que fazemos',
        titulo: 'Serviços'
    },
    servicosItems: [
        { id: 's1', numero: '01', titulo: 'Sites Institucionais', descricao: 'Presença digital profissional para sua empresa. Transmita credibilidade e confiança.' },
        { id: 's2', numero: '02', titulo: 'Landing Pages', descricao: 'Páginas de alta conversão para campanhas. Maximize seus resultados.' },
        { id: 's3', numero: '03', titulo: 'Lojas Virtuais', descricao: 'E-commerce completo. Gerencie produtos, pedidos e pagamentos.' },
        { id: 's4', numero: '04', titulo: 'Sistemas Web', descricao: 'Aplicações personalizadas. Automatize processos e otimize produtividade.' },
        { id: 's5', numero: '05', titulo: 'UI/UX Design', descricao: 'Interfaces intuitivas. Cada interação é pensada para a melhor experiência.' },
        { id: 's6', numero: '06', titulo: 'Manutenção', descricao: 'Sua plataforma sempre atualizada. Suporte técnico dedicado.' }
    ],
    portfolio: {
        label: 'Trabalhos recentes',
        titulo: 'Portfolio'
    },
    portfolioItems: [
        {
            id: 'p5',
            categoria: 'Institucional',
            titulo: 'Fort Alimentos',
            cor: '#22c55e',
            link: 'https://fort-alimentos.vercel.app/',
            imagem: 'https://image.thum.io/get/width/1200/noanimate/https://fort-alimentos.vercel.app/'
        },
        {
            id: 'p6',
            categoria: 'Landing Page',
            titulo: 'Toninho Corredor',
            cor: '#ef4444',
            link: 'https://toninhocorredor.vercel.app/',
            imagem: 'https://image.thum.io/get/width/1200/noanimate/https://toninhocorredor.vercel.app/'
        }
    ],
    equipe: {
        label: 'Nossa equipe',
        titulo: 'Equipe'
    },
    equipeItems: [
        { id: 'e1', nome: 'Mário Augusto Pachelli de Gois', funcao: 'Fundador & Desenvolvedor Web', bio: 'Apaixonado por tecnologia e design, Mário lidera o desenvolvimento técnico da PachBann com foco em performance, estratégia digital e inovação.', avatar: 'MA' },
        { id: 'e2', nome: 'Kevin Matheus Pinto Meira', funcao: 'Co-fundador & Designer', bio: 'Kevin traz criatividade e visão estética para cada projeto, garantindo que cada site seja único e impactante.', avatar: 'KM' },
        { id: 'e3', nome: 'Gabriel Capelini de Oliveira', funcao: 'Co-fundador & Desenvolvedor', bio: 'Gabriel contribui no desenvolvimento e na evolução dos projetos, apoiando a criação de experiências digitais bem estruturadas, responsivas e alinhadas aos objetivos de cada cliente.', avatar: 'GC' }
    ],
    contato: {
        label: 'Entre em contato',
        titulo: 'Fale Conosco',
        subtitulo: 'Vamos discutir seu próximo projeto?',
        telefone: '(15) 99798-4583',
        email: 'contato@pachbann.com',
        localizacao: 'Sorocaba, São Paulo'
    },
    footer: {
        tagline: 'Transformamos sua visão em presença digital.'
    }
};

const requiredPortfolioProjects = [
    {
        id: 'p5',
        categoria: 'Institucional',
        titulo: 'Fort Alimentos',
        cor: '#22c55e',
        link: 'https://fort-alimentos.vercel.app/',
        imagem: 'https://image.thum.io/get/width/1200/noanimate/https://fort-alimentos.vercel.app/'
    },
    {
        id: 'p6',
        categoria: 'Landing Page',
        titulo: 'Toninho Corredor',
        cor: '#ef4444',
        link: 'https://toninhocorredor.vercel.app/',
        imagem: 'https://image.thum.io/get/width/1200/noanimate/https://toninhocorredor.vercel.app/'
    }
];

function withRequiredPortfolioItems(items) {
    const list = Array.isArray(items) ? items : [];
    const required = requiredPortfolioProjects.map((project) => {
        const existing = list.find(
            (item) => item?.id === project.id || item?.link === project.link || item?.titulo === project.titulo
        );
        return existing ? { ...project, ...existing } : { ...project };
    });
    const extras = list.filter((item) => {
        return !requiredPortfolioProjects.some(
            (project) => item?.id === project.id || item?.link === project.link || item?.titulo === project.titulo
        );
    });
    return [...required, ...extras];
}

function fixBrokenPortugueseText(value) {
    if (typeof value !== 'string') return value;

    const replacements = [
        ['M?rio', 'Mário'],
        ['vis?o', 'visão'],
        ['presen?a', 'presença'],
        ['r?pidos', 'rápidos'],
        ['neg?cio', 'negócio'],
        ['neg?cios', 'negócios'],
        ['miss?o', 'missão'],
        ['p?ginas', 'páginas'],
        ['convers?o', 'conversão'],
        ['prote??o', 'proteção'],
        ['experi?ncia', 'experiência'],
        ['experi?ncias', 'experiências'],
        ['intera??o', 'interação'],
        ['t?cnico', 'técnico'],
        ['estrat?gia', 'estratégia'],
        ['inova??o', 'inovação'],
        ['evolu??o', 'evolução'],
        ['cria??o', 'criação'],
        ['descri??o', 'descrição'],
        ['fun??o', 'função'],
        ['manuten??o', 'manutenção'],
        ['satisfa??o', 'satisfação'],
        ['localiza??o', 'localização'],
        ['se??o', 'seção'],
        ['conte?do', 'conteúdo'],
        ['portf?lio', 'portfólio'],
        ['servi?os', 'serviços'],
        ['pr?ximo', 'próximo'],
        ['or?amento', 'orçamento'],
        ['inv?lidas', 'inválidas'],
        ['sess?o', 'sessão'],
        ['n?o', 'não'],
        ['Ã£', 'ã'],
        ['Ã¡', 'á'],
        ['Ã©', 'é'],
        ['Ã­', 'í'],
        ['Ã³', 'ó'],
        ['Ãº', 'ú'],
        ['Ã§', 'ç'],
        ['Ãª', 'ê'],
        ['Ã´', 'ô'],
        ['Ã‡', 'Ç']
    ];

    return replacements.reduce((text, [broken, fixed]) => text.split(broken).join(fixed), value);
}

function sanitizeSiteData(data) {
    if (Array.isArray(data)) {
        return data.map(sanitizeSiteData);
    }

    if (data && typeof data === 'object') {
        return Object.fromEntries(
            Object.entries(data).map(([key, value]) => [key, sanitizeSiteData(value)])
        );
    }

    return fixBrokenPortugueseText(data);
}

// ───────────────────────────────────────
// CARREGAMENTO DE DADOS
// ───────────────────────────────────────
function loadLocalData() {
    const saved = localStorage.getItem('pachbann_site_data');
    if (saved) {
        try {
            siteData = sanitizeSiteData(JSON.parse(saved));
            siteData.portfolioItems = withRequiredPortfolioItems(siteData.portfolioItems);
            localStorage.setItem('pachbann_site_data', JSON.stringify(siteData));
        } catch (e) {
            siteData = JSON.parse(JSON.stringify(defaultData));
        }
    } else {
        siteData = JSON.parse(JSON.stringify(defaultData));
    }
    renderAllContent();
}

async function loadSiteData() {
    try {
        const response = await fetch('/api/site-content');
        if (!response.ok) {
            throw new Error('API indisponivel');
        }

        const result = await response.json();
        if (result?.data) {
            siteData = sanitizeSiteData(result.data);
            siteData.portfolioItems = withRequiredPortfolioItems(siteData.portfolioItems);
        } else {
            siteData = JSON.parse(JSON.stringify(defaultData));
            await saveSiteData();
        }

        localStorage.setItem('pachbann_site_data', JSON.stringify(siteData));
        renderAllContent();
    } catch (error) {
        console.warn('Nao foi possivel carregar conteudo da API, usando modo local:', error);
        loadLocalData();
    }
}

async function saveSiteData() {
    try {
        const response = await fetch('/api/site-content', {
            method: 'PUT',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(siteData)
        });
        if (!response.ok) {
            if (response.status === 401) {
                alert('Sessao admin expirada. Faca login novamente para salvar alteracoes.');
                setAdminAuthState(false, null);
                return false;
            }
            throw new Error('Falha ao salvar na API');
        }
        localStorage.setItem('pachbann_site_data', JSON.stringify(siteData));
        return true;
    } catch (error) {
        console.warn('Nao foi possivel salvar na API, mantendo local:', error);
        localStorage.setItem('pachbann_site_data', JSON.stringify(siteData));
        return false;
    }
}

// ───────────────────────────────────────
// RENDERIZAÇÃO DO CONTEÚDO
// ───────────────────────────────────────
function renderAllContent() {
    renderHero();
    renderSobre();
    renderFeatures();
    renderServicos();
    renderPortfolio();
    renderEquipe();
    renderContato();
    renderFooter();
}

function renderHero() {
    const hero = siteData.hero || defaultData.hero;
    setEditable('hero', 'badge', hero.badge);
    setEditable('hero', 'titulo', hero.titulo);
    setEditable('hero', 'subtitulo', hero.subtitulo);
}

function renderSobre() {
    const sobre = siteData.sobre || defaultData.sobre;
    setEditable('sobre', 'label', sobre.label);
    setEditable('sobre', 'titulo', sobre.titulo);
    setEditable('sobre', 'texto1', sobre.texto1);
    setEditable('sobre', 'texto2', sobre.texto2);

    const stat1 = document.querySelector('[data-editable="sobre"][data-field="stat1Valor"]');
    const stat2 = document.querySelector('[data-editable="sobre"][data-field="stat2Valor"]');
    if (stat1) stat1.textContent = sobre.stat1Valor || '50';
    if (stat2) stat2.textContent = sobre.stat2Valor || '100';
}

function renderFeatures() {
    const features = siteData.features || defaultData.features;
    const grid = document.getElementById('features-grid');
    if (!grid) return;

    grid.innerHTML = features.map(f => `
        <div class="feature-item" data-id="${f.id}">
            <div class="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
            </div>
            <h3>${f.titulo}</h3>
            <p>${f.descricao}</p>
        </div>
    `).join('');
}

function renderServicos() {
    const servicos = siteData.servicos || defaultData.servicos;
    const items = siteData.servicosItems || defaultData.servicosItems;

    setEditable('servicos', 'label', servicos.label);
    setEditable('servicos', 'titulo', servicos.titulo);

    const grid = document.getElementById('services-grid');
    if (!grid) return;

    grid.innerHTML = items.map(s => `
        <div class="service-card" data-id="${s.id}">
            <div class="service-number">${s.numero}</div>
            <h3>${s.titulo}</h3>
            <p>${s.descricao}</p>
        </div>
    `).join('');
}

function renderPortfolio() {
    const portfolio = siteData.portfolio || defaultData.portfolio;
    const baseItems = siteData.portfolioItems || defaultData.portfolioItems;
    const items = withRequiredPortfolioItems(baseItems);

    setEditable('portfolio', 'label', portfolio.label);
    setEditable('portfolio', 'titulo', portfolio.titulo);

    const grid = document.getElementById('portfolio-grid');
    if (!grid) return;

    grid.innerHTML = items.map(p => `
        <a
            class="portfolio-item"
            data-id="${p.id}"
            href="${p.link || '#'}"
            ${p.link ? 'target="_blank" rel="noopener noreferrer"' : ''}
            style="--accent: ${p.cor}; --cover-image: ${p.imagem ? `url('${p.imagem}')` : 'none'};"
        >
            <div class="portfolio-info">
                <span class="portfolio-cat">${p.categoria}</span>
                <h4>${p.titulo}</h4>
            </div>
        </a>
    `).join('');
}

function renderEquipe() {
    const equipe = siteData.equipe || defaultData.equipe;
    const items = siteData.equipeItems || defaultData.equipeItems;

    setEditable('equipe', 'label', equipe.label);
    setEditable('equipe', 'titulo', equipe.titulo);

    const grid = document.getElementById('team-grid');
    if (!grid) return;

    grid.innerHTML = items.map(e => `
        <div class="team-card" data-id="${e.id}">
            <div class="team-avatar">${e.avatar}</div>
            <h3 class="team-name">${e.nome}</h3>
            <p class="team-role">${e.funcao}</p>
            <p class="team-bio">${e.bio}</p>
        </div>
    `).join('');
}

function renderContato() {
    const contato = siteData.contato || defaultData.contato;
    setEditable('contato', 'label', contato.label);
    setEditable('contato', 'titulo', contato.titulo);
    setEditable('contato', 'subtitulo', contato.subtitulo);
    setEditable('contato', 'telefone', contato.telefone);
    setEditable('contato', 'email', contato.email);
    setEditable('contato', 'localizacao', contato.localizacao);
}

function renderFooter() {
    const footer = siteData.footer || defaultData.footer;
    setEditable('footer', 'tagline', footer.tagline);
}

function setEditable(section, field, value) {
    const el = document.querySelector(`[data-editable="${section}"][data-field="${field}"]`);
    if (el) {
        el.textContent = value;
    }
}

// ───────────────────────────────────────
// NAVBAR
// ───────────────────────────────────────
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navbarMenu = document.getElementById('navbar-menu');

window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

hamburger.addEventListener('click', () => {
    const isOpen = navbarMenu.classList.toggle('active');
    hamburger.classList.toggle('active', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navbarMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

document.addEventListener('click', (event) => {
    if (!navbarMenu.classList.contains('active')) return;
    const clickedInsideMenu = navbarMenu.contains(event.target);
    const clickedHamburger = hamburger.contains(event.target);
    if (!clickedInsideMenu && !clickedHamburger) {
        navbarMenu.classList.remove('active');
        hamburger.classList.remove('active');
        document.body.style.overflow = '';
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && navbarMenu.classList.contains('active')) {
        navbarMenu.classList.remove('active');
        hamburger.classList.remove('active');
        document.body.style.overflow = '';
    }
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

function animateNumbers() {
    const counters = document.querySelectorAll('.stat-number');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.textContent);
                let current = 0;
                const step = target / 30;
                const timer = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        el.textContent = target;
                        clearInterval(timer);
                    } else {
                        el.textContent = Math.floor(current);
                    }
                }, 30);
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

// ───────────────────────────────────────
// FORMULÁRIO DE CONTATO
// ───────────────────────────────────────
function initContactForm() {
    const form = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;

        const formData = {
            nome: form.nome.value.trim(),
            email: form.email.value.trim(),
            telefone: form.telefone.value.trim(),
            tipoProjeto: form.tipoProjeto.value,
            mensagem: form.mensagem.value.trim(),
            origem: 'site-pachbann',
            status: 'novo',
            criadoEm: new Date().toISOString()
        };

        try {
            const response = await fetch('/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('API indisponivel');
            }

            form.classList.add('success');
            form.reset();
            setTimeout(() => form.classList.remove('success'), 5000);
        } catch (apiError) {
            console.warn('API Neon indisponivel, usando fallback local:', apiError);
            const leads = JSON.parse(localStorage.getItem('pachbann_leads') || '[]');
            leads.push(formData);
            localStorage.setItem('pachbann_leads', JSON.stringify(leads));
            form.classList.add('success');
            form.reset();
            setTimeout(() => form.classList.remove('success'), 5000);
        }

        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
    });
}

function initPhoneMask() {
    const phoneInput = document.querySelector('input[name="telefone"]');
    if (!phoneInput) return;

    phoneInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 11) value = value.slice(0, 11);

        if (value.length > 0) {
            if (value.length <= 2) value = `(${value}`;
            else if (value.length <= 6) value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
            else if (value.length <= 10) value = `(${value.slice(0, 2)}) ${value.slice(2, 6)}-${value.slice(6)}`;
            else value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
        }
        e.target.value = value;
    });
}

// ───────────────────────────────────────
// ADMIN AUTH
// ───────────────────────────────────────
function setAdminAuthState(authenticated, userEmail) {
    isAdminLogged = authenticated;
    const adminToggle = document.getElementById('admin-toggle');

    if (adminToggle) adminToggle.style.display = authenticated ? 'flex' : 'none';
}

async function initAdminAuth() {
    const adminToggle = document.getElementById('admin-toggle');
    const shouldOpenPanel = new URLSearchParams(window.location.search).get('admin') === '1';

    try {
        const meResponse = await fetch('/api/admin-me', { credentials: 'include' });
        if (meResponse.ok) {
            const me = await meResponse.json();
            setAdminAuthState(true, me?.user?.email || null);
            if (shouldOpenPanel) {
                const adminPanel = document.getElementById('admin-panel');
                adminPanel?.classList.add('active');
                window.history.replaceState({}, document.title, window.location.pathname + window.location.hash);
            }
        } else {
            setAdminAuthState(false, null);
        }
    } catch {
        setAdminAuthState(false, null);
    }

    adminToggle?.addEventListener('click', () => {
        if (!isAdminLogged) return;
        const adminPanel = document.getElementById('admin-panel');
        adminPanel.classList.toggle('active');
    });
}

// ───────────────────────────────────────
// ADMIN PANEL
// ───────────────────────────────────────
let currentSection = 'hero';
let autosaveTimer = null;

function escapeHtml(value = '') {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

function makeId(prefix) {
    return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

function getSitePreviewUrl(link) {
    const cleanLink = String(link || '').trim();
    if (!cleanLink) return '';
    return `https://image.thum.io/get/width/1200/noanimate/${cleanLink}`;
}

function scheduleSiteSave() {
    clearTimeout(autosaveTimer);
    autosaveTimer = setTimeout(() => {
        saveSiteData();
    }, 650);
}

function initAdminPanel() {
    const adminPanel = document.getElementById('admin-panel');
    const adminClose = document.getElementById('admin-close');
    const tabs = document.querySelectorAll('.admin-tab');
    const panes = document.querySelectorAll('.admin-pane');
    const sectionBtns = document.querySelectorAll('.section-btn');

    adminClose?.addEventListener('click', () => {
        adminPanel.classList.remove('active');
    });

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.dataset.tab;
            tabs.forEach(t => t.classList.toggle('active', t.dataset.tab === tabName));
            panes.forEach(p => p.classList.toggle('active', p.id === `pane-${tabName}`));
            if (tabName === 'dashboard') renderDashboard();
            if (tabName === 'portfolio') renderPortfolioManager();
            if (tabName === 'equipe') renderTeamManager();
            if (tabName === 'leads') loadLeads();
        });
    });

    sectionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            currentSection = btn.dataset.section;
            sectionBtns.forEach(b => b.classList.toggle('active', b.dataset.section === currentSection));
            renderSectionEditor();
        });
    });

    renderSectionEditor();
    renderDashboard();
    renderPortfolioManager();
    renderTeamManager();

    document.getElementById('add-portfolio-item')?.addEventListener('click', addPortfolioItem);
    document.getElementById('add-team-item')?.addEventListener('click', addTeamItem);
}

function renderDashboard() {
    const overview = document.getElementById('dashboard-overview');
    if (!overview) return;

    const portfolioCount = withRequiredPortfolioItems(siteData.portfolioItems || []).length;
    const teamCount = (siteData.equipeItems || []).length;
    const servicesCount = (siteData.servicosItems || []).length;

    overview.innerHTML = `
        <div class="dashboard-hero">
            <span>Painel no-code</span>
            <h4>Gerencie o site sem mexer no código.</h4>
            <p>As alterações são salvas no Neon e aparecem no site publicado após atualizar a página.</p>
        </div>
        <div class="dashboard-stats">
            <div class="dashboard-stat">
                <strong>${portfolioCount}</strong>
                <span>Projetos</span>
            </div>
            <div class="dashboard-stat">
                <strong>${teamCount}</strong>
                <span>Colaboradores</span>
            </div>
            <div class="dashboard-stat">
                <strong>${servicesCount}</strong>
                <span>Serviços</span>
            </div>
        </div>
        <div class="dashboard-shortcuts">
            <button class="dashboard-shortcut" data-open-tab="portfolio">Editar portfólio</button>
            <button class="dashboard-shortcut" data-open-tab="equipe">Editar colaboradores</button>
            <button class="dashboard-shortcut" data-open-tab="content">Editar textos do site</button>
            <button class="dashboard-shortcut" data-open-tab="leads">Ver leads recebidos</button>
        </div>
    `;

    overview.querySelectorAll('[data-open-tab]').forEach(button => {
        button.addEventListener('click', () => openAdminTab(button.dataset.openTab));
    });
}

function openAdminTab(tabName) {
    document.querySelectorAll('.admin-tab').forEach(tab => {
        tab.classList.toggle('active', tab.dataset.tab === tabName);
    });
    document.querySelectorAll('.admin-pane').forEach(pane => {
        pane.classList.toggle('active', pane.id === `pane-${tabName}`);
    });
    if (tabName === 'portfolio') renderPortfolioManager();
    if (tabName === 'equipe') renderTeamManager();
    if (tabName === 'dashboard') renderDashboard();
    if (tabName === 'leads') loadLeads();
}

function renderPortfolioManager() {
    const manager = document.getElementById('portfolio-manager');
    if (!manager) return;

    siteData.portfolioItems = withRequiredPortfolioItems(siteData.portfolioItems || []);
    manager.innerHTML = siteData.portfolioItems.map((item, index) => `
        <div class="admin-item admin-collection-card" data-index="${index}">
            <div class="admin-card-preview" style="--cover-image: ${item.imagem ? `url('${escapeHtml(item.imagem)}')` : 'none'};">
                <span>${escapeHtml(item.titulo || 'Novo projeto')}</span>
            </div>
            <div class="admin-field">
                <label>Título</label>
                <input type="text" data-section="portfolioItems" data-field="titulo" data-index="${index}" value="${escapeHtml(item.titulo || '')}">
            </div>
            <div class="admin-field">
                <label>Categoria</label>
                <input type="text" data-section="portfolioItems" data-field="categoria" data-index="${index}" value="${escapeHtml(item.categoria || '')}">
            </div>
            <div class="admin-field">
                <label>Link do site</label>
                <input type="url" data-section="portfolioItems" data-field="link" data-index="${index}" value="${escapeHtml(item.link || '')}">
            </div>
            <div class="admin-field">
                <label>Imagem</label>
                <input type="url" data-section="portfolioItems" data-field="imagem" data-index="${index}" value="${escapeHtml(item.imagem || '')}">
            </div>
            <div class="admin-field">
                <label>Cor</label>
                <input type="color" data-section="portfolioItems" data-field="cor" data-index="${index}" value="${escapeHtml(item.cor || '#ffffff')}">
            </div>
            <div class="admin-card-actions">
                <button class="admin-small-btn" data-use-preview="${index}">Usar print do link</button>
                <button class="admin-danger-btn" data-remove-portfolio="${index}">Remover</button>
            </div>
        </div>
    `).join('');

    bindAdminInputs(manager);
    manager.querySelectorAll('[data-use-preview]').forEach(button => {
        button.addEventListener('click', () => {
            const index = Number(button.dataset.usePreview);
            const item = siteData.portfolioItems[index];
            item.imagem = getSitePreviewUrl(item.link);
            renderAllContent();
            renderPortfolioManager();
            scheduleSiteSave();
        });
    });
    manager.querySelectorAll('[data-remove-portfolio]').forEach(button => {
        button.addEventListener('click', () => removePortfolioItem(Number(button.dataset.removePortfolio)));
    });
}

function renderTeamManager() {
    const manager = document.getElementById('team-manager');
    if (!manager) return;

    siteData.equipeItems = siteData.equipeItems || [];
    manager.innerHTML = siteData.equipeItems.map((item, index) => `
        <div class="admin-item admin-collection-card" data-index="${index}">
            <div class="admin-person-preview">
                <span>${escapeHtml(item.avatar || 'PB')}</span>
                <div>
                    <strong>${escapeHtml(item.nome || 'Novo colaborador')}</strong>
                    <small>${escapeHtml(item.funcao || 'Função')}</small>
                </div>
            </div>
            <div class="admin-field">
                <label>Nome</label>
                <input type="text" data-section="equipeItems" data-field="nome" data-index="${index}" value="${escapeHtml(item.nome || '')}">
            </div>
            <div class="admin-field">
                <label>Função</label>
                <input type="text" data-section="equipeItems" data-field="funcao" data-index="${index}" value="${escapeHtml(item.funcao || '')}">
            </div>
            <div class="admin-field">
                <label>Avatar</label>
                <input type="text" maxlength="3" data-section="equipeItems" data-field="avatar" data-index="${index}" value="${escapeHtml(item.avatar || '')}">
            </div>
            <div class="admin-field">
                <label>Bio</label>
                <textarea data-section="equipeItems" data-field="bio" data-index="${index}">${escapeHtml(item.bio || '')}</textarea>
            </div>
            <div class="admin-card-actions">
                <button class="admin-danger-btn" data-remove-team="${index}">Remover</button>
            </div>
        </div>
    `).join('');

    bindAdminInputs(manager);
    manager.querySelectorAll('[data-remove-team]').forEach(button => {
        button.addEventListener('click', () => removeTeamItem(Number(button.dataset.removeTeam)));
    });
}

function bindAdminInputs(root) {
    root.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('input', (e) => {
            const section = e.target.dataset.section;
            const field = e.target.dataset.field;
            const index = e.target.dataset.index;
            updateSiteField(section, field, e.target.value, index);

            if (section === 'portfolioItems' && field === 'link') {
                const item = siteData.portfolioItems[Number(index)];
                if (item && !item.imagem) {
                    item.imagem = getSitePreviewUrl(e.target.value);
                }
            }

            scheduleSiteSave();
        });
    });
}

function addPortfolioItem() {
    siteData.portfolioItems = withRequiredPortfolioItems(siteData.portfolioItems || []);
    siteData.portfolioItems.push({
        id: makeId('portfolio'),
        categoria: 'Site',
        titulo: 'Novo projeto',
        cor: '#ffffff',
        link: '',
        imagem: ''
    });
    renderAllContent();
    renderPortfolioManager();
    renderDashboard();
    scheduleSiteSave();
}

function removePortfolioItem(index) {
    siteData.portfolioItems = withRequiredPortfolioItems(siteData.portfolioItems || []);
    siteData.portfolioItems.splice(index, 1);
    renderAllContent();
    renderPortfolioManager();
    renderDashboard();
    scheduleSiteSave();
}

function addTeamItem() {
    siteData.equipeItems = siteData.equipeItems || [];
    siteData.equipeItems.push({
        id: makeId('team'),
        nome: 'Novo colaborador',
        funcao: 'Função',
        bio: 'Descrição breve do colaborador.',
        avatar: 'PB'
    });
    renderAllContent();
    renderTeamManager();
    renderDashboard();
    scheduleSiteSave();
}

function removeTeamItem(index) {
    siteData.equipeItems = siteData.equipeItems || [];
    siteData.equipeItems.splice(index, 1);
    renderAllContent();
    renderTeamManager();
    renderDashboard();
    scheduleSiteSave();
}

function renderSectionEditor() {
    const editor = document.getElementById('admin-editor');
    if (!editor) return;

    const editors = {
        hero: () => `
            <h4>Hero</h4>
            <div class="admin-field">
                <label>Badge:</label>
                <input type="text" data-section="hero" data-field="badge" value="${siteData.hero?.badge || ''}">
            </div>
            <div class="admin-field">
                <label>Título:</label>
                <input type="text" data-section="hero" data-field="titulo" value="${siteData.hero?.titulo || ''}">
            </div>
            <div class="admin-field">
                <label>Subtítulo:</label>
                <textarea data-section="hero" data-field="subtitulo">${siteData.hero?.subtitulo || ''}</textarea>
            </div>
        `,
        sobre: () => `
            <h4>Sobre</h4>
            <div class="admin-field">
                <label>Label:</label>
                <input type="text" data-section="sobre" data-field="label" value="${siteData.sobre?.label || ''}">
            </div>
            <div class="admin-field">
                <label>Título:</label>
                <input type="text" data-section="sobre" data-field="titulo" value="${siteData.sobre?.titulo || ''}">
            </div>
            <div class="admin-field">
                <label>Texto 1:</label>
                <textarea data-section="sobre" data-field="texto1">${siteData.sobre?.texto1 || ''}</textarea>
            </div>
            <div class="admin-field">
                <label>Texto 2:</label>
                <textarea data-section="sobre" data-field="texto2">${siteData.sobre?.texto2 || ''}</textarea>
            </div>
            <div class="admin-field">
                <label>Stat 1 (Projetos):</label>
                <input type="number" data-section="sobre" data-field="stat1Valor" value="${siteData.sobre?.stat1Valor || '50'}">
            </div>
            <div class="admin-field">
                <label>Stat 2 (Satisfação %):</label>
                <input type="number" data-section="sobre" data-field="stat2Valor" value="${siteData.sobre?.stat2Valor || '100'}">
            </div>
        `,
        servicos: () => `
            <h4>Serviços - Título</h4>
            <div class="admin-field">
                <label>Label:</label>
                <input type="text" data-section="servicos" data-field="label" value="${siteData.servicos?.label || ''}">
            </div>
            <div class="admin-field">
                <label>Título:</label>
                <input type="text" data-section="servicos" data-field="titulo" value="${siteData.servicos?.titulo || ''}">
            </div>
            <h4>Serviços - Items</h4>
            ${(siteData.servicosItems || []).map((s, i) => `
                <div class="admin-item">
                    <div class="admin-field">
                        <label>Título ${s.numero}:</label>
                        <input type="text" data-section="servicosItems" data-field="titulo" data-index="${i}" value="${s.titulo}">
                    </div>
                    <div class="admin-field">
                        <label>Descrição ${s.numero}:</label>
                        <textarea data-section="servicosItems" data-field="descricao" data-index="${i}">${s.descricao}</textarea>
                    </div>
                </div>
            `).join('')}
        `,
        portfolio: () => `
            <h4>Portfolio - Título</h4>
            <div class="admin-field">
                <label>Label:</label>
                <input type="text" data-section="portfolio" data-field="label" value="${siteData.portfolio?.label || ''}">
            </div>
            <div class="admin-field">
                <label>Título:</label>
                <input type="text" data-section="portfolio" data-field="titulo" value="${siteData.portfolio?.titulo || ''}">
            </div>
            <h4>Portfolio - Items</h4>
            ${withRequiredPortfolioItems(siteData.portfolioItems || []).map((p, i) => `
                <div class="admin-item">
                    <div class="admin-field">
                        <label>Título ${i + 1}:</label>
                        <input type="text" data-section="portfolioItems" data-field="titulo" data-index="${i}" value="${p.titulo}">
                    </div>
                    <div class="admin-field">
                        <label>Categoria ${i + 1}:</label>
                        <input type="text" data-section="portfolioItems" data-field="categoria" data-index="${i}" value="${p.categoria}">
                    </div>
                    <div class="admin-field">
                        <label>Cor ${i + 1} (hex):</label>
                        <input type="text" data-section="portfolioItems" data-field="cor" data-index="${i}" value="${p.cor}">
                    </div>
                    <div class="admin-field">
                        <label>Link ${i + 1}:</label>
                        <input type="text" data-section="portfolioItems" data-field="link" data-index="${i}" value="${p.link || ''}">
                    </div>
                    <div class="admin-field">
                        <label>Imagem ${i + 1} (URL):</label>
                        <input type="text" data-section="portfolioItems" data-field="imagem" data-index="${i}" value="${p.imagem || ''}">
                    </div>
                </div>
            `).join('')}
        `,
        equipe: () => `
            <h4>Equipe - Título</h4>
            <div class="admin-field">
                <label>Label:</label>
                <input type="text" data-section="equipe" data-field="label" value="${siteData.equipe?.label || ''}">
            </div>
            <div class="admin-field">
                <label>Título:</label>
                <input type="text" data-section="equipe" data-field="titulo" value="${siteData.equipe?.titulo || ''}">
            </div>
            <h4>Membros</h4>
            ${(siteData.equipeItems || []).map((e, i) => `
                <div class="admin-item">
                    <div class="admin-field">
                        <label>Nome ${i + 1}:</label>
                        <input type="text" data-section="equipeItems" data-field="nome" data-index="${i}" value="${e.nome}">
                    </div>
                    <div class="admin-field">
                        <label>Função ${i + 1}:</label>
                        <input type="text" data-section="equipeItems" data-field="funcao" data-index="${i}" value="${e.funcao}">
                    </div>
                    <div class="admin-field">
                        <label>Bio ${i + 1}:</label>
                        <textarea data-section="equipeItems" data-field="bio" data-index="${i}">${e.bio}</textarea>
                    </div>
                </div>
            `).join('')}
        `,
        contato: () => `
            <h4>Contato</h4>
            <div class="admin-field">
                <label>Label:</label>
                <input type="text" data-section="contato" data-field="label" value="${siteData.contato?.label || ''}">
            </div>
            <div class="admin-field">
                <label>Título:</label>
                <input type="text" data-section="contato" data-field="titulo" value="${siteData.contato?.titulo || ''}">
            </div>
            <div class="admin-field">
                <label>Subtítulo:</label>
                <input type="text" data-section="contato" data-field="subtitulo" value="${siteData.contato?.subtitulo || ''}">
            </div>
            <div class="admin-field">
                <label>Telefone:</label>
                <input type="text" data-section="contato" data-field="telefone" value="${siteData.contato?.telefone || ''}">
            </div>
            <div class="admin-field">
                <label>Email:</label>
                <input type="email" data-section="contato" data-field="email" value="${siteData.contato?.email || ''}">
            </div>
            <div class="admin-field">
                <label>Localização:</label>
                <input type="text" data-section="contato" data-field="localizacao" value="${siteData.contato?.localizacao || ''}">
            </div>
        `,
        footer: () => `
            <h4>Footer</h4>
            <div class="admin-field">
                <label>Tagline:</label>
                <input type="text" data-section="footer" data-field="tagline" value="${siteData.footer?.tagline || ''}">
            </div>
        `
    };

    editor.innerHTML = editors[currentSection] ? editors[currentSection]() : '<p>Selecione uma seção</p>';

    editor.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('change', handleFieldChange);
        input.addEventListener('input', (e) => {
            const section = e.target.dataset.section;
            const field = e.target.dataset.field;
            const index = e.target.dataset.index;
            updateSiteField(section, field, e.target.value, index);
            scheduleSiteSave();
        });
    });
}

function handleFieldChange(e) {
    const section = e.target.dataset.section;
    const field = e.target.dataset.field;
    const index = e.target.dataset.index;
    const value = e.target.value;

    updateSiteField(section, field, value, index);

    if (section.includes('Items')) {
        const arrayName = section;
        const itemIndex = parseInt(index);
        siteData[arrayName][itemIndex][field] = value;
    } else {
        siteData[section] = siteData[section] || {};
        siteData[section][field] = value;
    }

    saveSiteData();
    renderSectionEditor();
}

function updateSiteField(section, field, value, index) {
    if (section === 'hero') {
        siteData.hero = siteData.hero || {};
        siteData.hero[field] = value;
    } else if (section === 'sobre') {
        siteData.sobre = siteData.sobre || {};
        siteData.sobre[field] = value;
    } else if (section === 'servicos') {
        siteData.servicos = siteData.servicos || {};
        siteData.servicos[field] = value;
    } else if (section === 'portfolio') {
        siteData.portfolio = siteData.portfolio || {};
        siteData.portfolio[field] = value;
    } else if (section === 'equipe') {
        siteData.equipe = siteData.equipe || {};
        siteData.equipe[field] = value;
    } else if (section === 'contato') {
        siteData.contato = siteData.contato || {};
        siteData.contato[field] = value;
    } else if (section === 'footer') {
        siteData.footer = siteData.footer || {};
        siteData.footer[field] = value;
    } else if (section === 'servicosItems') {
        siteData.servicosItems = siteData.servicosItems || [];
        siteData.servicosItems[parseInt(index)][field] = value;
    } else if (section === 'portfolioItems') {
        siteData.portfolioItems = siteData.portfolioItems || [];
        const itemIndex = parseInt(index, 10);
        if (!siteData.portfolioItems[itemIndex]) {
            const fallback = withRequiredPortfolioItems(siteData.portfolioItems)[itemIndex] || {};
            siteData.portfolioItems[itemIndex] = { ...fallback };
        }
        siteData.portfolioItems[itemIndex][field] = value;
    } else if (section === 'equipeItems') {
        siteData.equipeItems = siteData.equipeItems || [];
        siteData.equipeItems[parseInt(index)][field] = value;
    }

    renderAllContent();
}

async function loadLeads() {
    const list = document.getElementById('leads-list');
    if (!list) return;

    try {
        const response = await fetch('/api/leads', { credentials: 'include' });
        if (!response.ok) {
            if (response.status === 401) {
                list.innerHTML = '<p class="no-leads">Faça login para visualizar os leads.</p>';
                setAdminAuthState(false, null);
                return;
            }
            throw new Error('API indisponivel');
        }

        const result = await response.json();
        const leads = Array.isArray(result?.leads) ? result.leads : [];
        if (leads.length === 0) {
            list.innerHTML = '<p class="no-leads">Nenhum lead ainda.</p>';
            return;
        }

        list.innerHTML = leads.map(lead => {
            const date = lead.criadoEm ? new Date(lead.criadoEm).toLocaleString('pt-BR') : 'N/A';
            return `
                <div class="lead-item">
                    <div class="lead-header">
                        <strong>${lead.nome}</strong>
                        <span>${date}</span>
                    </div>
                    <p><strong>Email:</strong> ${lead.email}</p>
                    <p><strong>Telefone:</strong> ${lead.telefone || '-'}</p>
                    <p><strong>Projeto:</strong> ${lead.tipoProjeto || '-'}</p>
                    <p><strong>Mensagem:</strong> ${lead.mensagem}</p>
                </div>
            `;
        }).join('');
    } catch (error) {
        console.warn('Erro ao carregar leads da API, usando local:', error);
        const leads = JSON.parse(localStorage.getItem('pachbann_leads') || '[]');
        if (leads.length === 0) {
            list.innerHTML = '<p class="no-leads">Nenhum lead ainda.</p>';
            return;
        }
        list.innerHTML = leads.reverse().map(lead => {
            const date = new Date(lead.criadoEm).toLocaleString('pt-BR');
            return `
                <div class="lead-item">
                    <div class="lead-header">
                        <strong>${lead.nome}</strong>
                        <span>${date}</span>
                    </div>
                    <p><strong>Email:</strong> ${lead.email}</p>
                    <p><strong>Telefone:</strong> ${lead.telefone || '-'}</p>
                    <p><strong>Projeto:</strong> ${lead.tipoProjeto || '-'}</p>
                    <p><strong>Mensagem:</strong> ${lead.mensagem}</p>
                </div>
            `;
        }).join('');
    }
}

// ───────────────────────────────────────
// INICIALIZAÇÃO
// ───────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    loadSiteData();
    initAdminAuth();
    initAdminPanel();
    animateNumbers();
    initPhoneMask();
    initContactForm();
});
