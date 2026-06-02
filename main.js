/**
 * PACHBANN WEB DESIGN - MAIN.JS
 * Sistema de gerenciamento de conteudo com Neon + API
 */

let siteData = {};
let isAdminLogged = false;
let cinematicScrollState = null;
const REMOTION_TIMELINE = {
    fps: 30,
    durationSeconds: 12,
    ease: cubicBezier(0.2, 0.85, 0.25, 1)
};

// ───────────────────────────────────────
// DADOS PADRÃO
// ───────────────────────────────────────
const defaultData = {
    hero: {
        badge: 'Tecnologia, Desenvolvimento e Soluções Digitais',
        titulo: 'Desenvolvemos soluções digitais sob medida para o seu negócio',
        subtitulo: 'Criamos sites profissionais, landing pages, sistemas web, aplicativos, automações, softwares personalizados e produtos digitais modernos, rápidos e escaláveis.'
    },
    sobre: {
        label: 'Sobre',
        titulo: 'Quem somos',
        texto1: 'A PachBann nasceu em 2026 com a missão de transformar ideias e processos em soluções digitais funcionais. Desenvolvemos sites, sistemas web, aplicativos, automações, softwares personalizados, DevOps e produtos digitais sob medida para empresas que querem crescer com tecnologia.',
        texto2: 'Atendemos empresas em Sorocaba, São Paulo e Brasil com estratégia, desenvolvimento e acompanhamento técnico para criar produtos digitais modernos, rápidos e escaláveis.',
        stat1Valor: '50',
        stat2Valor: '100'
    },
    features: [
        { id: 'f1', titulo: 'Estratégia digital', descricao: 'Planejamento técnico e comercial para transformar necessidades reais em soluções viáveis.' },
        { id: 'f2', titulo: 'Performance', descricao: 'Produtos rápidos, responsivos e preparados para uma experiência fluida.' },
        { id: 'f3', titulo: 'Escalabilidade', descricao: 'Estruturas pensadas para crescer junto com a operação e os objetivos do negócio.' },
        { id: 'f4', titulo: 'Segurança', descricao: 'Boas práticas de desenvolvimento, deploy e proteção para ambientes digitais.' }
    ],
    servicos: {
        label: 'O que fazemos',
        titulo: 'Serviços'
    },
    servicosItems: [
        { id: 's1', numero: '01', titulo: 'Sites profissionais', descricao: 'Sites modernos para empresas que precisam se apresentar melhor, gerar confiança e facilitar o contato com clientes.' },
        { id: 's2', numero: '02', titulo: 'Landing pages', descricao: 'Páginas objetivas para campanhas, lançamentos e captação de leads com foco em conversão.' },
        { id: 's3', numero: '03', titulo: 'Sistemas web', descricao: 'Soluções online para organizar processos, dados, acessos e rotinas internas da operação.' },
        { id: 's4', numero: '04', titulo: 'Aplicativos', descricao: 'Aplicações digitais planejadas para melhorar atendimento, produtividade e experiência do usuário.' },
        { id: 's5', numero: '05', titulo: 'Automações', descricao: 'Fluxos automatizados para reduzir tarefas manuais, integrar ferramentas e ganhar eficiência.' },
        { id: 's6', numero: '06', titulo: 'Softwares personalizados', descricao: 'Produtos sob medida para necessidades específicas que ferramentas prontas não resolvem bem.' },
        { id: 's7', numero: '07', titulo: 'DevOps', descricao: 'Configuração de deploy, ambientes, monitoramento e processos para publicar com mais segurança.' },
        { id: 's8', numero: '08', titulo: 'Produtos digitais sob medida', descricao: 'Da ideia ao MVP, desenvolvemos soluções digitais alinhadas ao modelo de negócio.' }
    ],
    portfolio: {
        label: 'Trabalhos recentes',
        titulo: 'Portfolio'
    },
    portfolioItems: [
        {
            id: 'p5',
            categoria: 'Site comercial',
            titulo: 'Fort Alimentos',
            descricao: 'Sistema/site comercial com carrinho de produtos, login por CNPJ e pedido via WhatsApp para agilizar a jornada de compra.',
            cor: '#22c55e',
            link: 'https://fort-alimentos.vercel.app/',
            imagem: '/portfolio/fort-alimentos-cover.jpg'
        },
        {
            id: 'p6',
            categoria: 'Site institucional',
            titulo: 'Toninho Corredor',
            descricao: 'Site institucional com sistema de agendamento para atendimento no gabinete, aproximando público e atendimento político.',
            cor: '#ef4444',
            link: 'https://toninhocorredor.vercel.app/',
            imagem: '/portfolio/toninho-corredor-cover.jpg'
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
        subtitulo: 'Vamos discutir seu próximo projeto digital?',
        telefone: '(15) 99798-4583',
        email: 'contato@pachbann.com.br',
        localizacao: 'Sorocaba, São Paulo, Brasil'
    },
    footer: {
        tagline: 'Soluções digitais em Sorocaba para empresas que querem crescer com tecnologia.'
    }
};

const requiredPortfolioProjects = [
    {
        id: 'p5',
        categoria: 'Site comercial',
        titulo: 'Fort Alimentos',
        descricao: 'Sistema/site comercial com carrinho de produtos, login por CNPJ e pedido via WhatsApp para agilizar a jornada de compra.',
        cor: '#22c55e',
        link: 'https://fort-alimentos.vercel.app/',
        imagem: '/portfolio/fort-alimentos-cover.jpg'
    },
    {
        id: 'p6',
        categoria: 'Site institucional',
        titulo: 'Toninho Corredor',
        descricao: 'Site institucional com sistema de agendamento para atendimento no gabinete, aproximando público e atendimento político.',
        cor: '#ef4444',
        link: 'https://toninhocorredor.vercel.app/',
        imagem: '/portfolio/toninho-corredor-cover.jpg'
    }
];

const lockedPortfolioImages = {
    p5: '/portfolio/fort-alimentos-cover.jpg',
    p6: '/portfolio/toninho-corredor-cover.jpg'
};

function withRequiredPortfolioItems(items) {
    const list = Array.isArray(items) ? items : [];
    const required = requiredPortfolioProjects.map((project) => {
        const existing = list.find(
            (item) => item?.id === project.id || item?.link === project.link || item?.titulo === project.titulo
        );
        const merged = existing ? { ...project, ...existing } : { ...project };
        return lockedPortfolioImages[project.id]
            ? { ...merged, imagem: lockedPortfolioImages[project.id] }
            : merged;
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

function applySeoContentDefaults(data) {
    const nextData = data && typeof data === 'object'
        ? { ...data }
        : JSON.parse(JSON.stringify(defaultData));

    const oldHeroTitles = [
        'Transformamos sua visão em presença digital',
        'Transformamos sua visÃ£o em presenÃ§a digital'
    ];
    const hero = { ...(nextData.hero || {}) };
    if (!hero.badge || hero.badge === 'Web Design & Desenvolvimento') hero.badge = defaultData.hero.badge;
    if (!hero.titulo || oldHeroTitles.includes(hero.titulo)) hero.titulo = defaultData.hero.titulo;
    if (!hero.subtitulo || hero.subtitulo.includes('sites modernos')) hero.subtitulo = defaultData.hero.subtitulo;
    nextData.hero = hero;

    const sobre = { ...(nextData.sobre || {}) };
    if (!sobre.texto1 || sobre.texto1.includes('PachBann Web Design nasceu')) sobre.texto1 = defaultData.sobre.texto1;
    if (!sobre.texto2 || sobre.texto2.includes('presença digital que converte')) sobre.texto2 = defaultData.sobre.texto2;
    nextData.sobre = { ...defaultData.sobre, ...sobre };

    const existingServices = Array.isArray(nextData.servicosItems) ? nextData.servicosItems : [];
    const hasExpandedServices = defaultData.servicosItems.every((service) =>
        existingServices.some((item) => item?.titulo?.toLowerCase() === service.titulo.toLowerCase())
    );
    if (!hasExpandedServices || existingServices.length < defaultData.servicosItems.length) {
        nextData.servicosItems = defaultData.servicosItems.map((service) => ({ ...service }));
    }

    const contato = { ...(nextData.contato || {}) };
    if (!contato.subtitulo || contato.subtitulo === 'Vamos discutir seu próximo projeto?') contato.subtitulo = defaultData.contato.subtitulo;
    if (!contato.localizacao || contato.localizacao === 'Sorocaba, São Paulo') contato.localizacao = defaultData.contato.localizacao;
    nextData.contato = { ...defaultData.contato, ...contato };

    const footer = { ...(nextData.footer || {}) };
    if (!footer.tagline || footer.tagline.includes('presença digital')) footer.tagline = defaultData.footer.tagline;
    nextData.footer = footer;

    nextData.features = defaultData.features.map((feature) => ({ ...feature }));
    nextData.portfolioItems = withRequiredPortfolioItems(nextData.portfolioItems || defaultData.portfolioItems);

    return nextData;
}

// ───────────────────────────────────────
// CARREGAMENTO DE DADOS
// ───────────────────────────────────────
function loadLocalData() {
    const saved = localStorage.getItem('pachbann_site_data');
    if (saved) {
        try {
            siteData = applySeoContentDefaults(sanitizeSiteData(JSON.parse(saved)));
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

        const contentType = response.headers.get('content-type') || '';
        if (!contentType.includes('application/json')) {
            loadLocalData();
            return;
        }

        const result = await response.json();
        if (result?.data) {
            siteData = applySeoContentDefaults(sanitizeSiteData(result.data));
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
    requestAnimationFrame(initScrollDrivenExperience);
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
                <p>${p.descricao || portfolioDescriptionFor(p)}</p>
                <span class="portfolio-action">Ver projeto</span>
            </div>
        </a>
    `).join('');
}

function portfolioDescriptionFor(project) {
    const title = (project?.titulo || '').toLowerCase();
    if (title.includes('fort')) {
        return 'Sistema/site comercial com carrinho de produtos, login por CNPJ e pedido via WhatsApp para agilizar a jornada de compra.';
    }
    if (title.includes('toninho')) {
        return 'Site institucional com sistema de agendamento para atendimento no gabinete, aproximando público e atendimento político.';
    }
    return 'Projeto desenvolvido para resolver uma necessidade específica com experiência clara, tecnologia e foco em resultado.';
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

    const emailLink = document.querySelector('[data-editable="contato"][data-field="email"]');
    if (emailLink && contato.email) {
        emailLink.setAttribute('href', `mailto:${contato.email}`);
    }
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
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            const el = entry.target;
            const target = parseInt(el.dataset.target || el.textContent, 10);
            if (!Number.isFinite(target)) return;

            el.dataset.target = String(target);

            if (reduceMotion) {
                el.textContent = target;
                observer.unobserve(el);
                return;
            }

            const startedAt = performance.now();
            const duration = 850;

            const tick = (now) => {
                const progress = Math.min((now - startedAt) / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                el.textContent = Math.round(target * eased);

                if (progress < 1) {
                    requestAnimationFrame(tick);
                } else {
                    el.textContent = target;
                }
            };

            requestAnimationFrame(tick);
            observer.unobserve(el);
        });
    }, { threshold: 0.55 });

    counters.forEach(counter => observer.observe(counter));
}

function initScrollDrivenExperience() {
    if (cinematicScrollState?.cleanup) {
        cinematicScrollState.cleanup();
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasNativeScrollTimeline = CSS.supports?.('animation-timeline: scroll()') || CSS.supports?.('animation-timeline: --page');
    const progressBar = ensureScrollProgressBar();
    const revealTargets = getCinematicTargets();
    const sectionScenes = Array.from(document.querySelectorAll('.hero, .scroll-story, #sobre, #servicos, #processo, #portfolio, #equipe, #contato'));
    let ticking = false;
    let animationFrame = null;
    let targetScrollTop = window.scrollY || document.documentElement.scrollTop;
    let smoothScrollTop = targetScrollTop;

    document.body.classList.add('cinematic-ready');
    document.body.style.setProperty('--scene-bg', '#050505');

    revealTargets.forEach((target, index) => {
        target.classList.add('cinematic-reveal');
        target.style.setProperty('--reveal-delay', `${Math.min(index % 5, 4) * 48}ms`);
    });

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            entry.target.classList.toggle('is-visible', entry.isIntersecting);
        });
    }, {
        rootMargin: '0px 0px -12% 0px',
        threshold: 0.16
    });

    const sceneObserver = new IntersectionObserver((entries) => {
        const visibleScenes = entries
            .filter(entry => entry.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (!visibleScenes.length) return;

        const nextColor = visibleScenes[0].target.dataset.sceneColor || '#050505';
        document.body.style.setProperty('--scene-bg', nextColor);
    }, {
        threshold: [0.25, 0.45, 0.65]
    });

    revealTargets.forEach(target => revealObserver.observe(target));
    sectionScenes.forEach((section, index) => {
        section.dataset.sceneColor = [
            '#050505',
            '#060706',
            '#070807',
            '#060708',
            '#070707',
            '#060606',
            '#060806'
        ][index] || '#050505';
        section.classList.add('cinematic-scene');
        sceneObserver.observe(section);
    });

    const updateScrollEffects = () => {
        targetScrollTop = window.scrollY || document.documentElement.scrollTop;
        smoothScrollTop += (targetScrollTop - smoothScrollTop) * 0.085;

        const scrollable = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
        const progress = Math.min(smoothScrollTop / scrollable, 1);

        if (!hasNativeScrollTimeline) {
            progressBar.style.transform = `scaleX(${progress})`;
        }
        updateHeroParallax(smoothScrollTop, reduceMotion);
        updateSlideScenes(reduceMotion, smoothScrollTop);

        if (Math.abs(targetScrollTop - smoothScrollTop) > 0.45) {
            animationFrame = requestAnimationFrame(updateScrollEffects);
        } else {
            smoothScrollTop = targetScrollTop;
            ticking = false;
            animationFrame = null;
        }
    };

    const requestTick = () => {
        if (ticking) return;
        ticking = true;
        animationFrame = requestAnimationFrame(updateScrollEffects);
    };

    window.addEventListener('scroll', requestTick, { passive: true });
    window.addEventListener('resize', requestTick);

    animateNumbers();
    updateScrollEffects();

    cinematicScrollState = {
        cleanup() {
            window.removeEventListener('scroll', requestTick);
            window.removeEventListener('resize', requestTick);
            if (animationFrame) cancelAnimationFrame(animationFrame);
            revealObserver.disconnect();
            sceneObserver.disconnect();
        }
    };
}

function ensureScrollProgressBar() {
    let progress = document.querySelector('.scroll-progress-bar');
    if (!progress) {
        progress = document.createElement('div');
        progress.className = 'scroll-progress-bar';
        progress.setAttribute('aria-hidden', 'true');
        document.body.prepend(progress);
    }
    return progress;
}

function getCinematicTargets() {
    return Array.from(document.querySelectorAll([
        '.section-header',
        '.about-content p',
        '.stat-item',
        '.feature-item',
        '.service-card',
        '.process-card',
        '.portfolio-item',
        '.team-card',
        '.contact-info',
        '.contact-form',
        '.contact-cta',
        '.story-slide h3',
        '.story-slide .slide-kicker',
        '.story-slide b',
        '.story-slide i',
        '.story-slide strong'
    ].join(','))).filter(target => !target.closest('.admin-panel'));
}

function updateHeroParallax(scrollTop, reduceMotion) {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    const heroRect = hero.getBoundingClientRect();
    const heroProgress = Math.min(Math.max(scrollTop / Math.max(hero.offsetHeight, 1), 0), 1);
    const frame = scrollProgressToFrame(heroProgress);
    const active = heroRect.bottom > 0 && heroRect.top < window.innerHeight;

    if (!active) return;

    const motionAmount = reduceMotion ? 0.22 : 0.52;
    const contentY = interpolateFrame(frame, [0, 7 * REMOTION_TIMELINE.fps], [0, -58 * motionAmount]);
    const titleY = interpolateFrame(frame, [0, 5 * REMOTION_TIMELINE.fps], [0, -18 * motionAmount]);
    const subtitleY = interpolateFrame(frame, [0, 6 * REMOTION_TIMELINE.fps], [0, -10 * motionAmount]);
    const actionsY = interpolateFrame(frame, [0, 4 * REMOTION_TIMELINE.fps], [0, -4 * motionAmount]);
    const visualY = interpolateFrame(frame, [0, 8 * REMOTION_TIMELINE.fps], [0, 44 * motionAmount]);
    const visualRotate = interpolateFrame(frame, [0, 8 * REMOTION_TIMELINE.fps], [0, -3.5 * motionAmount]);
    const heroScale = interpolateFrame(frame, [0, 7 * REMOTION_TIMELINE.fps], [1.022, 1.022 - 0.022 * motionAmount]);

    document.documentElement.style.setProperty('--hero-parallax-bg', `${interpolateFrame(frame, [0, 8 * REMOTION_TIMELINE.fps], [0, 48])}px`);
    document.documentElement.style.setProperty('--hero-content-y', `${contentY}px`);
    document.documentElement.style.setProperty('--hero-title-y', `${titleY}px`);
    document.documentElement.style.setProperty('--hero-subtitle-y', `${subtitleY}px`);
    document.documentElement.style.setProperty('--hero-actions-y', `${actionsY}px`);
    document.documentElement.style.setProperty('--hero-visual-y', `${visualY}px`);
    document.documentElement.style.setProperty('--hero-visual-rotate', `${visualRotate}deg`);
    document.documentElement.style.setProperty('--hero-scale', heroScale.toFixed(3));
}

function updateSlideScenes(reduceMotion, smoothScrollTop) {
    const story = document.querySelector('.scroll-story');
    const track = document.querySelector('.slide-track');
    const slides = Array.from(document.querySelectorAll('.story-slide'));
    const progressFill = document.querySelector('.slide-progress i');
    const step = document.querySelector('.orbit-step');
    const stage = document.querySelector('.slide-stage');

    if (!story || !track || !slides.length) {
        return;
    }

    const scrollSpan = Math.max(story.offsetHeight - window.innerHeight, 1);
    const progress = Math.min(Math.max((smoothScrollTop - story.offsetTop) / scrollSpan, 0), 1);
    const frame = scrollProgressToFrame(progress);
    const viewportHeight = Math.max(stage.clientHeight - 42, 1);
    const scrollDistance = Math.max(track.scrollHeight - viewportHeight, 0);
    const trackY = -interpolateFrame(frame, [0, REMOTION_TIMELINE.durationSeconds * REMOTION_TIMELINE.fps], [0, scrollDistance], { easing: false });
    const viewportCenter = -trackY + viewportHeight * 0.48;
    let activeIndex = 0;
    let closestDistance = Infinity;

    track.style.transform = `translate3d(0, ${trackY}px, 0)`;

    slides.forEach((slide, index) => {
        const slideCenter = slide.offsetTop + slide.offsetHeight * 0.5;
        const normalizedDistance = Math.abs(slideCenter - viewportCenter) / viewportHeight;
        const localProgress = Math.min(normalizedDistance, 1);
        const opacity = Math.max(0.46, 1 - normalizedDistance * 0.72);
        const scale = interpolateFrame(localProgress, [0, 1], [1, 0.982], { asProgress: true });
        const blur = interpolateFrame(localProgress, [0, 1], [0, 2.2], { asProgress: true });
        const lift = interpolateFrame(localProgress, [0, 1], [0, 10], { asProgress: true });

        if (normalizedDistance < closestDistance) {
            closestDistance = normalizedDistance;
            activeIndex = index;
        }

        slide.style.opacity = opacity.toFixed(3);
        slide.style.transform = `translate3d(0, ${lift}px, 0) scale(${scale.toFixed(3)})`;
        slide.style.filter = `blur(${blur.toFixed(2)}px)`;
    });

    slides.forEach((slide, index) => {
        slide.classList.toggle('is-active', index === activeIndex);
    });

    if (stage) {
        const stageMotion = reduceMotion ? 0.18 : 0.34;
        const rotateX = interpolateFrame(frame, [0, 12 * REMOTION_TIMELINE.fps], [5, -3]) * stageMotion;
        const rotateY = interpolateFrame(frame, [0, 12 * REMOTION_TIMELINE.fps], [-6, 6]) * stageMotion;
        const scale = interpolateFrame(frame, [0, 12 * REMOTION_TIMELINE.fps], [0.985, 1.003]);
        const z = interpolateFrame(frame, [0, 12 * REMOTION_TIMELINE.fps], [-16, 18]) * stageMotion;
        stage.style.transform = `translateZ(${z}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`;
    }

    if (progressFill) {
        progressFill.style.transform = `scaleX(${Math.max(progress, 1 / slides.length)})`;
    }

    if (step) {
        step.textContent = String(activeIndex + 1).padStart(2, '0');
    }
}

function scrollProgressToFrame(progress) {
    const clamped = Math.min(Math.max(progress, 0), 1);
    return clamped * REMOTION_TIMELINE.durationSeconds * REMOTION_TIMELINE.fps;
}

function interpolateFrame(value, inputRange, outputRange, options = {}) {
    const [inputMin, inputMax] = inputRange;
    const [outputMin, outputMax] = outputRange;
    const rawProgress = options.asProgress
        ? value
        : (value - inputMin) / Math.max(inputMax - inputMin, 0.0001);
    const clamped = Math.min(Math.max(rawProgress, 0), 1);
    const eased = options.easing === false ? clamped : REMOTION_TIMELINE.ease(clamped);
    return outputMin + (outputMax - outputMin) * eased;
}

function cubicBezier(x1, y1, x2, y2) {
    const cx = 3 * x1;
    const bx = 3 * (x2 - x1) - cx;
    const ax = 1 - cx - bx;
    const cy = 3 * y1;
    const by = 3 * (y2 - y1) - cy;
    const ay = 1 - cy - by;

    const sampleCurveX = (t) => ((ax * t + bx) * t + cx) * t;
    const sampleCurveY = (t) => ((ay * t + by) * t + cy) * t;
    const sampleDerivativeX = (t) => (3 * ax * t + 2 * bx) * t + cx;

    return (x) => {
        let t = x;
        for (let i = 0; i < 5; i += 1) {
            const derivative = sampleDerivativeX(t);
            if (Math.abs(derivative) < 0.001) break;
            t -= (sampleCurveX(t) - x) / derivative;
        }
        return sampleCurveY(Math.min(Math.max(t, 0), 1));
    };
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

function initMouseInteractions() {
    const supportsPointer = window.matchMedia('(pointer: fine)').matches;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!supportsPointer || reduceMotion) return;

    const root = document.documentElement;
    const hero = document.querySelector('.hero');
    let ticking = false;
    let pointerX = window.innerWidth / 2;
    let pointerY = window.innerHeight / 2;

    document.body.classList.add('has-pointer');

    const updatePointerEffects = () => {
        ticking = false;
        root.style.setProperty('--mouse-x', `${pointerX}px`);
        root.style.setProperty('--mouse-y', `${pointerY}px`);

        if (!hero) return;
        const rect = hero.getBoundingClientRect();
        const insideHero = pointerY >= rect.top && pointerY <= rect.bottom;
        if (!insideHero) {
            root.style.setProperty('--hero-mouse-x', '0deg');
            root.style.setProperty('--hero-mouse-y', '0deg');
            root.style.setProperty('--hero-mouse-shift-x', '0px');
            root.style.setProperty('--hero-mouse-shift-y', '0px');
            return;
        }

        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const normalizedX = (pointerX - centerX) / Math.max(rect.width / 2, 1);
        const normalizedY = (pointerY - centerY) / Math.max(rect.height / 2, 1);

        root.style.setProperty('--hero-mouse-x', `${(normalizedX * 4).toFixed(2)}deg`);
        root.style.setProperty('--hero-mouse-y', `${(-normalizedY * 3).toFixed(2)}deg`);
        root.style.setProperty('--hero-mouse-shift-x', `${(normalizedX * 8).toFixed(1)}px`);
        root.style.setProperty('--hero-mouse-shift-y', `${(normalizedY * 8).toFixed(1)}px`);
    };

    window.addEventListener('pointermove', (event) => {
        pointerX = event.clientX;
        pointerY = event.clientY;
        if (!ticking) {
            ticking = true;
            requestAnimationFrame(updatePointerEffects);
        }
    }, { passive: true });

    document.addEventListener('pointermove', (event) => {
        const card = event.target.closest?.('.service-card');
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / Math.max(rect.width, 1)) * 100;
        const y = ((event.clientY - rect.top) / Math.max(rect.height, 1)) * 100;
        card.style.setProperty('--card-glow-x', `${x.toFixed(1)}%`);
        card.style.setProperty('--card-glow-y', `${y.toFixed(1)}%`);
    }, { passive: true });
}

function initNetworkBackground() {
    const canvas = document.getElementById('network-background');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const supportsPointer = window.matchMedia('(pointer: fine)').matches;
    const points = [];
    const pointer = {
        x: -1000,
        y: -1000,
        active: false
    };
    let width = 0;
    let height = 0;
    let dpr = 1;
    let rafId = null;

    const config = {
        spacing: 112,
        linkDistance: 178,
        influenceRadius: supportsPointer ? 260 : 0,
        pushStrength: 82,
        returnEase: 0.12,
        lineColor: 'rgba(215, 255, 122, 0.28)',
        lineActiveColor: 'rgba(215, 255, 122, 0.66)',
        dotColor: 'rgba(245, 245, 247, 0.44)'
    };

    const resize = () => {
        dpr = Math.min(window.devicePixelRatio || 1, 1.6);
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = Math.floor(width * dpr);
        canvas.height = Math.floor(height * dpr);
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        buildPoints();
        drawNetwork();
    };

    const buildPoints = () => {
        points.length = 0;
        const columns = Math.ceil(width / config.spacing) + 2;
        const rows = Math.ceil(height / config.spacing) + 2;

        for (let y = -1; y < rows; y += 1) {
            for (let x = -1; x < columns; x += 1) {
                const offsetX = ((y % 2) * config.spacing) / 2;
                const baseX = x * config.spacing + offsetX;
                const baseY = y * config.spacing;
                const jitter = Math.sin((x + 1) * 12.989 + (y + 1) * 78.233) * 43758.5453;
                const normalized = jitter - Math.floor(jitter);
                points.push({
                    baseX: baseX + (normalized - 0.5) * 18,
                    baseY: baseY + (0.5 - normalized) * 18,
                    x: baseX,
                    y: baseY
                });
            }
        }
    };

    const drawNetwork = () => {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < points.length; i += 1) {
            const point = points[i];
            for (let j = i + 1; j < points.length; j += 1) {
                const other = points[j];
                const dx = point.x - other.x;
                const dy = point.y - other.y;
                const distance = Math.hypot(dx, dy);
                if (distance > config.linkDistance) continue;

                const midX = (point.x + other.x) / 2;
                const midY = (point.y + other.y) / 2;
                const pointerDistance = pointer.active ? Math.hypot(pointer.x - midX, pointer.y - midY) : Infinity;
                const active = pointerDistance < config.influenceRadius;
                const alpha = Math.max(0.16, (1 - distance / config.linkDistance) * (active ? 1 : 0.82));

                ctx.strokeStyle = active ? config.lineActiveColor : config.lineColor;
                ctx.globalAlpha = alpha;
                ctx.lineWidth = active ? 1.55 : 1.02;
                ctx.beginPath();
                ctx.moveTo(point.x, point.y);
                ctx.lineTo(other.x, other.y);
                ctx.stroke();
            }
        }

        ctx.globalAlpha = 1;
        points.forEach((point) => {
            ctx.fillStyle = config.dotColor;
            ctx.beginPath();
            ctx.arc(point.x, point.y, 1.25, 0, Math.PI * 2);
            ctx.fill();
        });
    };

    const updateNetwork = () => {
        let shouldContinue = pointer.active;

        points.forEach((point) => {
            let targetX = point.baseX;
            let targetY = point.baseY;

            if (pointer.active) {
                const dx = point.baseX - pointer.x;
                const dy = point.baseY - pointer.y;
                const distance = Math.hypot(dx, dy);
                if (distance < config.influenceRadius) {
                    const force = (1 - distance / config.influenceRadius) ** 2;
                    const angle = Math.atan2(dy, dx);
                    targetX += Math.cos(angle) * config.pushStrength * force;
                    targetY += Math.sin(angle) * config.pushStrength * force;
                }
            }

            point.x += (targetX - point.x) * config.returnEase;
            point.y += (targetY - point.y) * config.returnEase;

            if (Math.abs(targetX - point.x) > 0.1 || Math.abs(targetY - point.y) > 0.1) {
                shouldContinue = true;
            }
        });

        drawNetwork();

        if (shouldContinue) {
            rafId = requestAnimationFrame(updateNetwork);
        } else {
            rafId = null;
        }
    };

    const requestNetworkFrame = () => {
        if (rafId) return;
        rafId = requestAnimationFrame(updateNetwork);
    };

    window.addEventListener('resize', resize);

    if (supportsPointer) {
        window.addEventListener('pointermove', (event) => {
            pointer.x = event.clientX;
            pointer.y = event.clientY;
            pointer.active = true;
            requestNetworkFrame();
        }, { passive: true });

        window.addEventListener('pointerleave', () => {
            pointer.active = false;
            requestNetworkFrame();
        });
    }

    resize();
}

// ───────────────────────────────────────
// INICIALIZAÇÃO
// ───────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    loadSiteData();
    initAdminAuth();
    initAdminPanel();
    initPhoneMask();
    initContactForm();
    initMouseInteractions();
    initNetworkBackground();
});
