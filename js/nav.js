/**
 * nav.js — barra de navegação global do OPUS
 * Injeta (ou atualiza) a tabs-bar em todas as páginas automaticamente.
 * Basta importar: <script type="module" src="/js/nav.js"></script>
 */

const NAV_LINKS = [
  { href: '/index.html',            label: 'Início',            svg: '<path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>' },
  { href: '/calendario.html',       label: 'Calendário',        svg: '<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>' },
  { href: '/apontamento.html',      label: 'Produtividade',     svg: '<path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>' },
  { href: '/simulador.html',        label: 'Frete',             svg: '<path d="M1 3h15v13H1zM16 8h4l3 3v5h-7z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>' },
  { href: '/farol.html',            label: 'Farol',             svg: '<line x1="12" y1="2" x2="12" y2="4"/><path d="M9 4h6l1 4H8L9 4z"/><path d="M8 8l-1 8h10l-1-8"/><line x1="7" y1="16" x2="5" y2="20"/><line x1="17" y1="16" x2="19" y2="20"/><line x1="5" y1="20" x2="19" y2="20"/>' },
  { href: '/estoque.html',          label: 'Estoque',           svg: '<line x1="2" y1="17" x2="18" y2="17"/><path d="M4 17V7h8v10"/><path d="M12 10h4l2 4v3h-6V10z"/><circle cx="6" cy="19.5" r="1.5"/><circle cx="15" cy="19.5" r="1.5"/>' },
  { href: '/programacao.html',      label: 'Programação',       svg: '<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>' },
  { href: '/simulador-producao.html', label: 'Sim. Produção',   svg: '<line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/>' },
  { href: '/fechamento-op.html',    label: 'Fechamento OP',     svg: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 9h6M9 12h6M9 15h4"/>' },
  { href: '/carteira.html',         label: 'Carteira',          svg: '<path d="M20 7H4a2 2 0 00-2 2v9a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/><line x1="8" y1="12" x2="16" y2="12"/>' },
  { href: '/roteirizador.html',     label: 'Roteirização',      svg: '<path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/>' },
  { href: '/separacao.html',        label: 'Separação',         svg: '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 3H8L6 7h12l-2-4z"/><line x1="12" y1="11" x2="12" y2="17"/><line x1="9" y1="14" x2="15" y2="14"/>' },
  { href: '/faturamento.html',      label: 'Faturamento',       svg: '<path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="13" x2="15" y2="13"/><line x1="9" y1="17" x2="15" y2="17"/>' },
  { href: '/torre.html',            label: 'Torre',             svg: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>' },
  { href: '/comercial.html',        label: 'Comercial',         svg: '<line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 100 7h5a3.5 3.5 0 110 7H6"/>' },
  { href: '/usuarios.html',         label: 'Usuários',          svg: '<path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>' },
];

const CSS = `
<style id="opus-nav-style">
.opus-nav{position:sticky;top:0;z-index:9000;display:flex;align-items:center;background:#0d1f3c;padding:0 12px;height:50px;border-bottom:2px solid #b8902a;box-shadow:0 2px 16px rgba(13,31,60,.35);overflow-x:auto;flex-shrink:0;scrollbar-width:none}
.opus-nav::-webkit-scrollbar{display:none}
.opus-nav-brand{font-family:'Playfair Display',serif;font-style:italic;font-size:12px;font-weight:700;color:#e8c96a;margin-right:10px;white-space:nowrap;flex-shrink:0}
.opus-nav-brand small{font-family:'Inter',sans-serif;font-style:normal;font-size:9px;font-weight:800;letter-spacing:.22em;text-transform:uppercase;color:#fff;margin-left:6px;vertical-align:middle}
.opus-nav a{height:50px;padding:0 7px;display:flex;align-items:center;gap:4px;font-size:10px;font-weight:800;color:rgba(255,255,255,.75);text-decoration:none;border:none;background:transparent;border-bottom:3px solid transparent;font-family:'Inter',system-ui,sans-serif;cursor:pointer;letter-spacing:.04em;text-transform:uppercase;transition:all .15s;white-space:nowrap;flex-shrink:0}
.opus-nav a:hover{color:#fff;background:rgba(255,255,255,.07)}
.opus-nav a.active{color:#e8c96a;border-bottom-color:#b8902a;background:rgba(184,144,42,.1)}
.opus-nav a svg{width:11px;height:11px;opacity:.7;flex-shrink:0}
.opus-nav a:hover svg,.opus-nav a.active svg{opacity:1}
</style>`;

function buildNav() {
  const cur = window.location.pathname.split('/').pop() || 'index.html';
  const links = NAV_LINKS.map(({ href, label, svg }) => {
    const page = href.split('/').pop();
    const active = page === cur ? ' class="active"' : '';
    return `<a href="${href}"${active}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${svg}</svg>${label}</a>`;
  }).join('');
  return `<nav class="opus-nav"><span class="opus-nav-brand">Grupo MF Paris<small>OPUS</small></span>${links}</nav>`;
}

// Injeta ou atualiza a nav
(function inject() {
  // Não injetar em páginas públicas/auth
  const skip = ['login.html','motorista.html','diagnostico.html','teste-proxy.html','trocar-senha.html'];
  const cur = window.location.pathname.split('/').pop() || 'index.html';
  if (skip.includes(cur)) return;

  // Injeta CSS uma vez
  if (!document.getElementById('opus-nav-style')) {
    document.head.insertAdjacentHTML('beforeend', CSS);
  }

  // Se já existe .tabs-bar legada, esconde (nav.js assume o controle)
  const legada = document.querySelector('.tabs-bar');
  if (legada) legada.style.display = 'none';

  // Remove nav anterior do opus se já existir (re-injeção segura)
  const existente = document.querySelector('.opus-nav');
  if (existente) existente.remove();

  // Injeta antes do primeiro elemento filho do body
  document.body.insertAdjacentHTML('afterbegin', buildNav());
})();
