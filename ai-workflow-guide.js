// ─── Theme ───────────────────────────────────────────────
const MOON = `<svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M13.5 9.5A6 6 0 016.5 2.5a6.5 6.5 0 100 11 6 6 0 007-4z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const SUN  = `<svg width="15" height="15" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="3" stroke="currentColor" stroke-width="1.5"/><path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.05 3.05l1.41 1.41M11.54 11.54l1.41 1.41M3.05 12.95l1.41-1.41M11.54 4.46l1.41-1.41" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`;

function getTheme() {
  return document.documentElement.getAttribute('data-theme') || 'light';
}

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  document.querySelectorAll('.theme-toggle').forEach(btn => {
    btn.innerHTML = theme === 'dark' ? SUN : MOON;
    btn.setAttribute('aria-label', theme === 'dark' ? '라이트 모드로 전환' : '다크 모드로 전환');
  });
}

function makeToggleBtn() {
  const btn = document.createElement('button');
  btn.className = 'theme-toggle';
  const theme = getTheme();
  btn.innerHTML = theme === 'dark' ? SUN : MOON;
  btn.setAttribute('aria-label', theme === 'dark' ? '라이트 모드로 전환' : '다크 모드로 전환');
  btn.addEventListener('click', () => setTheme(getTheme() === 'dark' ? 'light' : 'dark'));
  return btn;
}

// Inject toggle into mobile topbar
const topbar = document.querySelector('.mobile-topbar');
if (topbar) topbar.appendChild(makeToggleBtn());

// ─── Mobile sidebar toggle ────────────────────────────────
const hamburger = document.getElementById('hamburger');
const sidebarEl  = document.getElementById('sidebar');
const overlay    = document.getElementById('sidebar-overlay');

function openSidebar() {
  sidebarEl.classList.add('open');
  overlay.classList.add('visible');
  hamburger.classList.add('open');
  hamburger.setAttribute('aria-label', '메뉴 닫기');
}

function closeSidebar() {
  sidebarEl.classList.remove('open');
  overlay.classList.remove('visible');
  hamburger.classList.remove('open');
  hamburger.setAttribute('aria-label', '메뉴 열기');
}

hamburger.addEventListener('click', () => {
  sidebarEl.classList.contains('open') ? closeSidebar() : openSidebar();
});

overlay.addEventListener('click', closeSidebar);

// ─── Copy buttons ─────────────────────────────────────────
document.querySelectorAll('.code-label').forEach(label => {
  const pre = label.nextElementSibling;
  if (!pre || pre.tagName !== 'PRE') return;
  const btn = document.createElement('button');
  btn.className = 'copy-btn';
  btn.textContent = '복사';
  btn.setAttribute('aria-label', '코드 복사');
  label.appendChild(btn);
  btn.addEventListener('click', () => {
    const text = pre.querySelector('code')?.innerText || pre.innerText;
    navigator.clipboard.writeText(text).then(() => {
      btn.textContent = '✓ 복사됨';
      btn.classList.add('copied');
      setTimeout(() => { btn.textContent = '복사'; btn.classList.remove('copied'); }, 1800);
    });
  });
});

// ─── Sidebar (shared, fetched) ────────────────────────────
fetch('sidebar.html?v=0.11')
  .then(res => res.text())
  .then(html => {
    sidebarEl.innerHTML = html;
    initSidebarInteractions();
    initSiteSearch();
  });

const SEARCH_PAGES = [
  { path: 'index.html', label: '홈' },
  { path: 'ai-workflow-guide.html', label: '가이드' },
  { path: 'figma-mcp-traps.html', label: 'MCP 함정' },
  { path: 'changelog.html', label: 'Changelog' }
];

let searchIndexPromise;

function normalizeText(text) {
  return (text || '').replace(/\s+/g, ' ').trim();
}

function escapeHtml(text) {
  return String(text).replace(/[&<>"']/g, char => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[char]));
}

function getPageBasePath() {
  const parts = location.pathname.split('/');
  parts.pop();
  return parts.join('/') + '/';
}

function buildEntriesFromDocument(doc, page) {
  const entries = [];
  const pageTitle = normalizeText(doc.querySelector('h1')?.textContent) || page.label;
  const targets = [
    ...doc.querySelectorAll('section[id]'),
    ...doc.querySelectorAll('h3[id]'),
    ...doc.querySelectorAll('[id^="trap-"]')
  ];
  const seen = new Set();

  targets.forEach(target => {
    const id = target.id;
    if (!id || seen.has(id)) return;
    seen.add(id);

    const title = normalizeText(
      target.querySelector?.('h2, h3, strong, .home-group-title, .card-title')?.textContent ||
      target.textContent.split('\n')[0]
    );
    const text = normalizeText(target.textContent);
    if (!title || text.length < 12) return;

    entries.push({
      title,
      page: page.label,
      href: `${page.path}#${id}`,
      text: `${pageTitle} ${title} ${text}`.toLowerCase(),
      snippet: text.length > 110 ? `${text.slice(0, 110)}...` : text
    });
  });

  return entries;
}

function getSearchIndex() {
  if (searchIndexPromise) return searchIndexPromise;
  const parser = new DOMParser();
  searchIndexPromise = Promise.all(SEARCH_PAGES.map(page =>
    fetch(page.path)
      .then(res => res.text())
      .then(html => buildEntriesFromDocument(parser.parseFromString(html, 'text/html'), page))
      .catch(() => [])
  )).then(groups => groups.flat());
  return searchIndexPromise;
}

function renderSearchResults(resultsEl, results, query) {
  if (!query) {
    resultsEl.hidden = true;
    resultsEl.innerHTML = '';
    return;
  }

  resultsEl.hidden = false;
  if (results.length === 0) {
    resultsEl.innerHTML = `<div class="sidebar-search-empty">검색 결과가 없습니다.</div>`;
    return;
  }

  resultsEl.innerHTML = results.slice(0, 7).map(result => {
    const [path, hash = ''] = result.href.split('#');
    const href = `${path}?q=${encodeURIComponent(query)}${hash ? `#${hash}` : ''}`;
    return `
    <a class="sidebar-search-result" href="${href}">
      <div class="sidebar-search-result-title">${escapeHtml(result.title)}</div>
      <div class="sidebar-search-result-meta">${escapeHtml(result.page)}</div>
      <div class="sidebar-search-result-snippet">${escapeHtml(result.snippet)}</div>
    </a>
  `;
  }).join('');

  resultsEl.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 900) closeSidebar();
      const targetUrl = new URL(link.href);
      if (targetUrl.pathname === location.pathname && targetUrl.hash) {
        setTimeout(() => highlightTargetFromHash(targetUrl.hash), 80);
      }
    });
  });
}

function highlightTargetFromHash(hash = location.hash) {
  const id = decodeURIComponent((hash || '').replace('#', ''));
  if (!id) return;
  const target = document.getElementById(id);
  if (!target) return;
  target.classList.remove('search-hit');
  void target.offsetWidth;
  target.classList.add('search-hit');
  setTimeout(() => target.classList.remove('search-hit'), 2600);
}

function initSiteSearch() {
  const input = sidebarEl.querySelector('#site-search-input');
  const resultsEl = sidebarEl.querySelector('#site-search-results');
  if (!input || !resultsEl) return;

  input.addEventListener('input', () => {
    const query = normalizeText(input.value).toLowerCase();
    if (query.length < 2) {
      renderSearchResults(resultsEl, [], '');
      return;
    }

    getSearchIndex().then(index => {
      const terms = query.split(' ').filter(Boolean);
      const results = index
        .map(entry => {
          const title = entry.title.toLowerCase();
          const score = terms.reduce((total, term) => {
            if (title.includes(term)) return total + 4;
            if (entry.text.includes(term)) return total + 1;
            return total;
          }, 0);
          return { ...entry, score };
        })
        .filter(entry => entry.score > 0)
        .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title, 'ko'));
      renderSearchResults(resultsEl, results, query);
    });
  });

  input.addEventListener('keydown', event => {
    if (event.key !== 'Enter') return;
    const first = resultsEl.querySelector('a');
    if (first) first.click();
  });
}

window.addEventListener('hashchange', () => {
  if (new URLSearchParams(location.search).has('q')) highlightTargetFromHash();
});

window.addEventListener('DOMContentLoaded', () => {
  if (new URLSearchParams(location.search).has('q')) {
    setTimeout(() => highlightTargetFromHash(), 350);
  }
});

function initSidebarInteractions() {
  // Sidebar theme toggle
  const sidebarToggle = sidebarEl.querySelector('.theme-toggle');
  if (sidebarToggle) {
    const t = getTheme();
    sidebarToggle.innerHTML = t === 'dark' ? SUN : MOON;
    sidebarToggle.setAttribute('aria-label', t === 'dark' ? '라이트 모드로 전환' : '다크 모드로 전환');
    sidebarToggle.addEventListener('click', () => setTheme(getTheme() === 'dark' ? 'light' : 'dark'));
  }

  // Page-level active item
  const page = location.pathname.split('/').pop() || 'index.html';
  if (page === 'index.html' || page === '') {
    sidebarEl.querySelector('[data-nav="home"]')?.classList.add('active');
  } else if (page === 'changelog.html') {
    sidebarEl.querySelector('[data-nav="changelog"]')?.classList.add('active');
  }

  // Close on nav click (mobile)
  sidebarEl.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => { if (window.innerWidth <= 900) closeSidebar(); });
  });

  // Scroll-spy (guide page only)
  const sections = document.querySelectorAll('section[id], div.hero');
  if (sections.length === 0) return;

  const navItems = sidebarEl.querySelectorAll('.nav-item');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navItems.forEach(item => { item.classList.remove('active'); item.removeAttribute('aria-current'); });
      const id = entry.target.id;
      const active = sidebarEl.querySelector(`.nav-item[href="ai-workflow-guide.html#${id}"]`)
                  || sidebarEl.querySelector(`.nav-item[href="#${id}"]`);
      if (active) { active.classList.add('active'); active.setAttribute('aria-current', 'true'); }
    });
  }, { rootMargin: '-20% 0px -70% 0px' });

  sections.forEach(s => observer.observe(s));
}
