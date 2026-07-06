/**
 * nav.js — sidebar colapsável global do OPUS
 * Usa position:fixed para não quebrar o layout de nenhuma página.
 */

const NAV_LINKS = [
  { href: '/index.html',              label: 'Início',          svg: '<path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>' },
  { href: '/calendario.html',         label: 'Calendário',      svg: '<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>' },
  { href: '/apontamento.html',        label: 'Produtividade',   svg: '<path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>' },
  { href: '/simulador.html',          label: 'Frete',           svg: '<path d="M1 3h15v13H1zM16 8h4l3 3v5h-7z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>' },
  { href: '/farol.html',              label: 'Farol',           svg: '<line x1="12" y1="2" x2="12" y2="4"/><path d="M9 4h6l1 4H8L9 4z"/><path d="M8 8l-1 8h10l-1-8"/><line x1="7" y1="16" x2="5" y2="20"/><line x1="17" y1="16" x2="19" y2="20"/><line x1="5" y1="20" x2="19" y2="20"/>' },
  { href: '/estoque.html',            label: 'Estoque',         svg: '<line x1="2" y1="17" x2="18" y2="17"/><path d="M4 17V7h8v10"/><path d="M12 10h4l2 4v3h-6V10z"/><circle cx="6" cy="19.5" r="1.5"/><circle cx="15" cy="19.5" r="1.5"/>' },
  { href: '/movimentacao-estoque.html', label: 'Mov. Depósitos', svg: '<path d="M8 3H5a2 2 0 00-2 2v3"/><path d="M21 8V5a2 2 0 00-2-2h-3"/><path d="M3 16v3a2 2 0 002 2h3"/><path d="M16 21h3a2 2 0 002-2v-3"/><line x1="7" y1="12" x2="17" y2="12"/><polyline points="13 8 17 12 13 16"/>' },
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

const W_OPEN = 220;
const W_CLOSED = 54;
const LS_KEY = 'opus_sb_open';

const CSS = `<style id="opus-nav-style">
/* ── sidebar fixa ── */
#opus-sb {
  position: fixed;
  top: 0; left: 0; bottom: 0;
  width: ${W_OPEN}px;
  z-index: 9500;
  display: flex;
  flex-direction: column;
  background: linear-gradient(180deg,#091525 0%,#0d1f3c 100%);
  border-right: 1px solid rgba(184,144,42,.22);
  box-shadow: 3px 0 18px rgba(0,0,0,.45);
  transition: width .22s cubic-bezier(.4,0,.2,1);
  overflow: hidden;
}
#opus-sb.collapsed { width: ${W_CLOSED}px }

/* ── desloca o conteúdo da página ── */
#opus-body-shift {
  margin-left: ${W_OPEN}px;
  transition: margin-left .22s cubic-bezier(.4,0,.2,1);
  min-height: 100vh;
}
#opus-body-shift.collapsed { margin-left: ${W_CLOSED}px }

/* ── cabeçalho da sidebar ── */
.opus-sb-hdr {
  flex-shrink: 0;
  height: 54px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 12px;
  border-bottom: 1px solid rgba(184,144,42,.18);
  overflow: hidden;
}
.opus-sb-brand {
  flex: 1;
  overflow: hidden;
  white-space: nowrap;
  font-family: 'Playfair Display', Georgia, serif;
  font-style: italic;
  font-size: 13px;
  font-weight: 700;
  color: #e8c96a;
  opacity: 1;
  transition: opacity .15s;
}
.opus-sb-brand small {
  font-family: 'Inter', system-ui, sans-serif;
  font-style: normal;
  font-size: 8px;
  font-weight: 800;
  letter-spacing: .22em;
  text-transform: uppercase;
  color: rgba(255,255,255,.5);
  margin-left: 5px;
  vertical-align: middle;
}
#opus-sb.collapsed .opus-sb-brand { opacity: 0; pointer-events: none }

/* ── botão toggle ── */
.opus-toggle {
  flex-shrink: 0;
  width: 30px; height: 30px;
  border-radius: 8px;
  border: 1px solid rgba(255,255,255,.1);
  background: rgba(255,255,255,.06);
  color: rgba(255,255,255,.65);
  cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  font-size: 14px; line-height: 1;
  transition: background .15s, color .15s, transform .22s cubic-bezier(.4,0,.2,1);
}
.opus-toggle:hover { background: rgba(255,255,255,.14); color: #e8c96a }
#opus-sb.collapsed .opus-toggle { transform: rotate(180deg) }

/* ── lista de links ── */
.opus-sb-scroll {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 6px 0;
  scrollbar-width: none;
}
.opus-sb-scroll::-webkit-scrollbar { display: none }

.opus-sb-link {
  display: flex;
  align-items: center;
  gap: 11px;
  padding: 0 14px;
  height: 40px;
  color: rgba(255,255,255,.6);
  text-decoration: none;
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
  border-left: 3px solid transparent;
  transition: background .12s, color .12s, border-color .12s;
  position: relative;
}
.opus-sb-link:hover { color: #fff; background: rgba(255,255,255,.07) }
.opus-sb-link.active { color: #e8c96a; background: rgba(184,144,42,.11); border-left-color: #b8902a }
.opus-sb-link svg { width: 16px; height: 16px; flex-shrink: 0; opacity: .6; transition: opacity .12s }
.opus-sb-link:hover svg, .opus-sb-link.active svg { opacity: 1 }
.opus-sb-lbl { flex: 1; overflow: hidden; transition: opacity .15s, max-width .22s; max-width: 160px }
#opus-sb.collapsed .opus-sb-lbl { opacity: 0; max-width: 0 }

/* tooltip ao recolher */
#opus-sb.collapsed .opus-sb-link:hover::after {
  content: attr(data-tip);
  position: fixed;
  left: calc(${W_CLOSED}px + 10px);
  background: #0d1f3c;
  color: #e8c96a;
  font-size: 11.5px;
  font-weight: 700;
  padding: 5px 12px;
  border-radius: 8px;
  border: 1px solid rgba(184,144,42,.35);
  white-space: nowrap;
  pointer-events: none;
  z-index: 9999;
  box-shadow: 0 4px 16px rgba(0,0,0,.5);
  transform: translateY(-50%);
  margin-top: 20px;
}

/* ── rodapé ── */
.opus-sb-foot {
  flex-shrink: 0;
  padding: 10px 14px;
  border-top: 1px solid rgba(255,255,255,.05);
  font-size: 9px;
  font-weight: 600;
  color: rgba(255,255,255,.2);
  letter-spacing: .1em;
  text-transform: uppercase;
  white-space: nowrap;
  overflow: hidden;
  transition: opacity .15s;
}
#opus-sb.collapsed .opus-sb-foot { opacity: 0 }

/* ── overlay mobile ── */
#opus-overlay {
  display: none;
  position: fixed; inset: 0;
  background: rgba(0,0,0,.55);
  z-index: 9400;
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
}
#opus-overlay.on { display: block }

/* ── mobile: drawer ── */
@media (max-width: 700px) {
  #opus-sb {
    width: ${W_OPEN}px !important;
    transform: translateX(-100%);
    transition: transform .25s cubic-bezier(.4,0,.2,1);
    box-shadow: none;
  }
  #opus-sb.mob-open {
    transform: translateX(0);
    box-shadow: 6px 0 32px rgba(0,0,0,.55);
  }
  #opus-body-shift, #opus-body-shift.collapsed {
    margin-left: 0 !important;
  }
  #opus-mob-btn { display: flex !important }
}

/* ── botão flutuante mobile ── */
#opus-mob-btn {
  display: none;
  position: fixed;
  top: 10px; left: 10px;
  z-index: 9300;
  width: 40px; height: 40px;
  border-radius: 10px;
  background: #0d1f3c;
  border: 1px solid rgba(184,144,42,.45);
  color: #e8c96a;
  align-items: center; justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(0,0,0,.5);
  font-size: 18px;
  line-height: 1;
}

/* ── esconde navbars antigas ── */
.tabs-bar { display: none !important }

/* ── wrapper de conteúdo ── */
#opus-body-shift {
  display: flex;
  flex-direction: column;
}
/* páginas que usam body como flex-col + overflow:hidden (mobile-first) */
#opus-body-shift.fullscreen {
  height: 100vh;
  overflow: hidden;
}
/* páginas desktop com scroll livre */
#opus-body-shift.scrollable {
  min-height: 100vh;
  overflow: auto;
}

/* ── reset global mínimo ── */
*, *::before, *::after { box-sizing: border-box }
img, video, iframe { max-width: 100% }
</style>`;

function buildSidebar(cur, open) {
  const cls = open ? '' : ' collapsed';
  const links = NAV_LINKS.map(({ href, label, svg }) => {
    const page   = href.split('/').pop();
    const active = page === cur ? ' active' : '';
    return `<a class="opus-sb-link${active}" href="${href}" data-tip="${label}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${svg}</svg><span class="opus-sb-lbl">${label}</span></a>`;
  }).join('');

  return `
<div id="opus-overlay" onclick="opusSbClose()"></div>
<button id="opus-mob-btn" onclick="opusSbOpen()" title="Abrir menu">&#9776;</button>
<aside id="opus-sb" class="${cls.trim()}">
  <div class="opus-sb-hdr">
    <span class="opus-sb-brand">Grupo MF Paris<small>OPUS</small></span>
    <button class="opus-toggle" onclick="opusSbToggle()" title="Recolher/expandir">&#10094;</button>
  </div>
  <div class="opus-sb-scroll">${links}</div>
  <div class="opus-sb-foot">OPUS &copy; MF Paris</div>
</aside>`;
}

// ── API global de controle ──────────────────────────────────────────────────
window.opusSbToggle = function() {
  const sb   = document.getElementById('opus-sb');
  const body = document.getElementById('opus-body-shift');
  if (!sb) return;
  const isOpen = !sb.classList.contains('collapsed');
  sb.classList.toggle('collapsed', isOpen);
  if (body) body.classList.toggle('collapsed', isOpen);
  localStorage.setItem(LS_KEY, isOpen ? '0' : '1');
};

window.opusSbOpen = function() {
  document.getElementById('opus-sb')?.classList.add('mob-open');
  document.getElementById('opus-overlay')?.classList.add('on');
};

window.opusSbClose = function() {
  document.getElementById('opus-sb')?.classList.remove('mob-open');
  document.getElementById('opus-overlay')?.classList.remove('on');
};

// ── Injeção ─────────────────────────────────────────────────────────────────
(function inject() {
  const skip = ['login.html','motorista.html','diagnostico.html','teste-proxy.html','trocar-senha.html'];
  const cur  = window.location.pathname.split('/').pop() || 'index.html';
  if (skip.includes(cur)) return;

  // Injeta CSS
  if (!document.getElementById('opus-nav-style')) {
    document.head.insertAdjacentHTML('beforeend', CSS);
  }

  // Remove injeção anterior (navegação SPA segura)
  document.getElementById('opus-sb')?.remove();
  document.getElementById('opus-overlay')?.remove();
  document.getElementById('opus-mob-btn')?.remove();

  // Detecta se a página usa layout fullscreen (mobile-first com overflow:hidden)
  const bodyStyle   = window.getComputedStyle(document.body);
  const htmlStyle   = window.getComputedStyle(document.documentElement);
  const isFullscreen = bodyStyle.overflow === 'hidden' || htmlStyle.overflow === 'hidden'
                    || bodyStyle.overflowY === 'hidden';

  // Estado salvo
  const open = localStorage.getItem(LS_KEY) !== '0';

  // Injeta sidebar no início do body
  document.body.insertAdjacentHTML('afterbegin', buildSidebar(cur, open));

  // Cria/atualiza o wrapper de deslocamento do conteúdo
  let shift = document.getElementById('opus-body-shift');
  if (!shift) {
    const navIds   = new Set(['opus-sb','opus-overlay','opus-mob-btn']);
    const children = Array.from(document.body.children).filter(el => !navIds.has(el.id));

    shift = document.createElement('div');
    shift.id = 'opus-body-shift';
    shift.classList.add(isFullscreen ? 'fullscreen' : 'scrollable');
    if (!open) shift.classList.add('collapsed');

    children.forEach(c => shift.appendChild(c));
    document.body.appendChild(shift);
  } else {
    shift.classList.toggle('collapsed', !open);
  }

  // Garante que o body não gere scroll próprio (o shift cuida disso)
  document.body.style.overflow = 'hidden';
  document.body.style.margin   = '0';
  document.body.style.padding  = '0';
})();
