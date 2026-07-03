/**
 * nav.js — sidebar colapsável global do OPUS
 * Injeta sidebar + overlay + toggle em todas as páginas.
 * Basta importar: <script type="module" src="/js/nav.js"></script>
 */

const NAV_LINKS = [
  { href: '/index.html',              label: 'Início',          svg: '<path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>' },
  { href: '/calendario.html',         label: 'Calendário',      svg: '<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>' },
  { href: '/apontamento.html',        label: 'Produtividade',   svg: '<path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>' },
  { href: '/simulador.html',          label: 'Frete',           svg: '<path d="M1 3h15v13H1zM16 8h4l3 3v5h-7z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>' },
  { href: '/farol.html',              label: 'Farol',           svg: '<line x1="12" y1="2" x2="12" y2="4"/><path d="M9 4h6l1 4H8L9 4z"/><path d="M8 8l-1 8h10l-1-8"/><line x1="7" y1="16" x2="5" y2="20"/><line x1="17" y1="16" x2="19" y2="20"/><line x1="5" y1="20" x2="19" y2="20"/>' },
  { href: '/estoque.html',            label: 'Estoque',         svg: '<line x1="2" y1="17" x2="18" y2="17"/><path d="M4 17V7h8v10"/><path d="M12 10h4l2 4v3h-6V10z"/><circle cx="6" cy="19.5" r="1.5"/><circle cx="15" cy="19.5" r="1.5"/>' },
  { href: '/programacao.html',        label: 'Programação',     svg: '<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>' },
  { href: '/simulador-producao.html', label: 'Sim. Produção',   svg: '<line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/>' },
  { href: '/fechamento-op.html',      label: 'Fechamento OP',   svg: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 9h6M9 12h6M9 15h4"/>' },
  { href: '/carteira.html',           label: 'Carteira',        svg: '<path d="M20 7H4a2 2 0 00-2 2v9a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/><line x1="8" y1="12" x2="16" y2="12"/>' },
  { href: '/roteirizador.html',       label: 'Roteirização',    svg: '<path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/>' },
  { href: '/separacao.html',          label: 'Separação',       svg: '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 3H8L6 7h12l-2-4z"/><line x1="12" y1="11" x2="12" y2="17"/><line x1="9" y1="14" x2="15" y2="14"/>' },
  { href: '/faturamento.html',        label: 'Faturamento',     svg: '<path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="13" x2="15" y2="13"/><line x1="9" y1="17" x2="15" y2="17"/>' },
  { href: '/torre.html',              label: 'Torre',           svg: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>' },
  { href: '/comercial.html',          label: 'Comercial',       svg: '<line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 100 7h5a3.5 3.5 0 110 7H6"/>' },
  { href: '/usuarios.html',           label: 'Usuários',        svg: '<path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>' },
];

const SIDEBAR_W  = 220; // largura expandida (px)
const SIDEBAR_WC = 56;  // largura recolhida (px)
const LS_KEY = 'opus_sidebar_open';

const CSS = `
<style id="opus-nav-style">
/* ── reset global ── */
*{box-sizing:border-box}
img,video,iframe{max-width:100%}
html,body{margin:0;padding:0}
body{overflow:hidden!important}

/* ── layout root ── */
.opus-root{display:flex;height:100vh;overflow:hidden}
/* opus-main herda o papel do <body> nas páginas que usam body como flex-col */
.opus-main{flex:1;overflow:auto;min-width:0;display:flex;flex-direction:column}

/* ── sidebar ── */
.opus-sb{
  width:${SIDEBAR_W}px;
  flex-shrink:0;
  display:flex;
  flex-direction:column;
  background:linear-gradient(180deg,#0a1728 0%,#0d1f3c 100%);
  border-right:1px solid rgba(184,144,42,.25);
  box-shadow:4px 0 20px rgba(0,0,0,.35);
  transition:width .22s cubic-bezier(.4,0,.2,1);
  overflow:hidden;
  z-index:9000;
  position:relative;
  flex-shrink:0;
}
.opus-sb.collapsed{width:${SIDEBAR_WC}px}

/* ── header da sidebar ── */
.opus-sb-hdr{
  height:56px;
  flex-shrink:0;
  display:flex;
  align-items:center;
  gap:10px;
  padding:0 14px;
  border-bottom:1px solid rgba(184,144,42,.2);
  overflow:hidden;
}
.opus-sb-brand{
  font-family:'Playfair Display',Georgia,serif;
  font-style:italic;
  font-size:14px;
  font-weight:700;
  color:#e8c96a;
  white-space:nowrap;
  flex:1;
  overflow:hidden;
  transition:opacity .15s;
}
.opus-sb-brand small{
  font-family:'Inter',system-ui,sans-serif;
  font-style:normal;
  font-size:8px;
  font-weight:800;
  letter-spacing:.22em;
  text-transform:uppercase;
  color:rgba(255,255,255,.6);
  margin-left:6px;
  vertical-align:middle;
}
.opus-sb.collapsed .opus-sb-brand{opacity:0;width:0;flex:0}

/* ── botão toggle ── */
.opus-toggle{
  width:28px;height:28px;
  border-radius:8px;
  border:1px solid rgba(255,255,255,.12);
  background:rgba(255,255,255,.06);
  color:rgba(255,255,255,.7);
  cursor:pointer;
  display:flex;align-items:center;justify-content:center;
  flex-shrink:0;
  transition:background .15s,color .15s,transform .22s cubic-bezier(.4,0,.2,1);
  font-size:13px;
  line-height:1;
}
.opus-toggle:hover{background:rgba(255,255,255,.14);color:#e8c96a}
.opus-sb.collapsed .opus-toggle{transform:rotate(180deg)}

/* ── links ── */
.opus-sb-scroll{flex:1;overflow-y:auto;overflow-x:hidden;padding:8px 0;scrollbar-width:none}
.opus-sb-scroll::-webkit-scrollbar{display:none}

.opus-sb a{
  display:flex;
  align-items:center;
  gap:12px;
  padding:0 14px;
  height:42px;
  color:rgba(255,255,255,.65);
  text-decoration:none;
  font-family:'Inter',system-ui,sans-serif;
  font-size:11.5px;
  font-weight:600;
  letter-spacing:.02em;
  white-space:nowrap;
  transition:background .13s,color .13s;
  border-left:3px solid transparent;
  position:relative;
}
.opus-sb a:hover{color:#fff;background:rgba(255,255,255,.07)}
.opus-sb a.active{color:#e8c96a;background:rgba(184,144,42,.12);border-left-color:#b8902a}
.opus-sb a svg{
  width:16px;height:16px;
  flex-shrink:0;
  opacity:.65;
  transition:opacity .13s;
}
.opus-sb a:hover svg,.opus-sb a.active svg{opacity:1}
.opus-sb-lbl{flex:1;overflow:hidden;transition:opacity .15s,width .15s}
.opus-sb.collapsed .opus-sb-lbl{opacity:0;width:0;flex:0}

/* tooltip ao recolher */
.opus-sb.collapsed a[data-tip]:hover::after{
  content:attr(data-tip);
  position:absolute;
  left:calc(${SIDEBAR_WC}px + 6px);
  top:50%;transform:translateY(-50%);
  background:#0d1f3c;
  color:#e8c96a;
  font-size:11px;
  font-weight:700;
  padding:5px 10px;
  border-radius:7px;
  border:1px solid rgba(184,144,42,.35);
  white-space:nowrap;
  pointer-events:none;
  z-index:9999;
  box-shadow:0 4px 16px rgba(0,0,0,.4);
}

/* ── footer da sidebar ── */
.opus-sb-foot{
  flex-shrink:0;
  padding:10px 14px;
  border-top:1px solid rgba(255,255,255,.06);
  font-size:9px;
  color:rgba(255,255,255,.25);
  letter-spacing:.08em;
  text-transform:uppercase;
  white-space:nowrap;
  overflow:hidden;
  transition:opacity .15s;
}
.opus-sb.collapsed .opus-sb-foot{opacity:0}

/* ── overlay mobile ── */
.opus-overlay{
  display:none;
  position:fixed;inset:0;
  background:rgba(0,0,0,.5);
  z-index:8999;
  backdrop-filter:blur(2px);
}
.opus-overlay.on{display:block}

/* ── mobile: sidebar vira drawer por cima ── */
@media(max-width:700px){
  .opus-root{display:block;position:relative}
  .opus-main{height:100vh;overflow:auto}
  .opus-sb{
    position:fixed;
    left:0;top:0;bottom:0;
    width:${SIDEBAR_W}px !important;
    transform:translateX(-100%);
    transition:transform .25s cubic-bezier(.4,0,.2,1);
    z-index:9000;
  }
  .opus-sb.mobile-open{transform:translateX(0)}
  /* botão flutuante no mobile */
  .opus-mob-btn{
    display:flex;
    position:fixed;
    top:12px;left:12px;
    z-index:8998;
    width:38px;height:38px;
    border-radius:10px;
    background:#0d1f3c;
    border:1px solid rgba(184,144,42,.4);
    color:#e8c96a;
    align-items:center;justify-content:center;
    cursor:pointer;
    box-shadow:0 4px 12px rgba(0,0,0,.4);
    font-size:16px;
  }
}
@media(min-width:701px){
  .opus-mob-btn{display:none}
}
</style>`;

function buildSidebar(cur, open) {
  const cls = open ? 'opus-sb' : 'opus-sb collapsed';
  const links = NAV_LINKS.map(({ href, label, svg }) => {
    const page = href.split('/').pop();
    const active = page === cur ? ' class="active"' : '';
    return `<a href="${href}"${active} data-tip="${label}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${svg}</svg><span class="opus-sb-lbl">${label}</span></a>`;
  }).join('');

  return `
<div class="opus-overlay" id="opus-overlay" onclick="opusSbClose()"></div>
<aside class="${cls}" id="opus-sb">
  <div class="opus-sb-hdr">
    <span class="opus-sb-brand">Grupo MF Paris<small>OPUS</small></span>
    <button class="opus-toggle" id="opus-toggle" onclick="opusSbToggle()" title="Recolher menu">&#x276E;</button>
  </div>
  <div class="opus-sb-scroll">${links}</div>
  <div class="opus-sb-foot">OPUS v2 &copy; MF Paris</div>
</aside>
<button class="opus-mob-btn" id="opus-mob-btn" onclick="opusSbOpen()" title="Abrir menu">&#9776;</button>`;
}

function wrapBody(sidebarHtml) {
  // Envolve todo o conteúdo do body (exceto o que injetamos) num .opus-main
  const existing = Array.from(document.body.childNodes);
  const main = document.createElement('div');
  main.className = 'opus-main';
  existing.forEach(n => main.appendChild(n));

  const root = document.createElement('div');
  root.className = 'opus-root';
  root.innerHTML = sidebarHtml;
  root.appendChild(main);
  document.body.appendChild(root);
}

// ── API global ──
window.opusSbToggle = function() {
  const sb = document.getElementById('opus-sb');
  if (!sb) return;
  const open = sb.classList.toggle('collapsed');
  // open=true quando collapsed foi ADICIONADO (recolheu)
  localStorage.setItem(LS_KEY, open ? '0' : '1');
};
window.opusSbOpen = function() {
  const sb = document.getElementById('opus-sb');
  const ov = document.getElementById('opus-overlay');
  if (sb) sb.classList.add('mobile-open');
  if (ov) ov.classList.add('on');
};
window.opusSbClose = function() {
  const sb = document.getElementById('opus-sb');
  const ov = document.getElementById('opus-overlay');
  if (sb) sb.classList.remove('mobile-open');
  if (ov) ov.classList.remove('on');
};

(function inject() {
  const skip = ['login.html','motorista.html','diagnostico.html','teste-proxy.html','trocar-senha.html'];
  const cur = window.location.pathname.split('/').pop() || 'index.html';
  if (skip.includes(cur)) return;

  // CSS
  if (!document.getElementById('opus-nav-style')) {
    document.head.insertAdjacentHTML('beforeend', CSS);
  }

  // Esconde nav legada (.tabs-bar) se existir
  document.querySelectorAll('.tabs-bar').forEach(el => el.style.display = 'none');

  // Remove injeção anterior se já existir
  document.getElementById('opus-sb')?.closest('.opus-root')?.replaceWith(...document.querySelector('.opus-main')?.childNodes || []);

  const open = localStorage.getItem(LS_KEY) !== '0'; // default: aberto
  const sidebarHtml = buildSidebar(cur, open);

  // body precisa ser flex column para o root funcionar
  document.body.style.margin = '0';
  document.body.style.padding = '0';

  wrapBody(sidebarHtml);
})();
