// Mobile sidebar toggle (page HTML elements — always present)
const hamburger = document.getElementById('hamburger');
const sidebarEl = document.getElementById('sidebar');
const overlay = document.getElementById('sidebar-overlay');

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

// Copy buttons for code blocks
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
      setTimeout(() => {
        btn.textContent = '복사';
        btn.classList.remove('copied');
      }, 1800);
    });
  });
});

// Load shared sidebar and wire up its interactions
fetch('sidebar.html')
  .then(res => res.text())
  .then(html => {
    sidebarEl.innerHTML = html;
    initSidebarInteractions();
  });

function initSidebarInteractions() {
  // Version select → changelog
  const versionSelect = document.getElementById('version-select');
  if (versionSelect) {
    versionSelect.addEventListener('change', () => {
      window.location.href = 'changelog.html';
    });
  }

  // Set page-level active item (index / changelog)
  const page = location.pathname.split('/').pop() || 'index.html';
  if (page === 'index.html' || page === '') {
    sidebarEl.querySelector('[data-nav="home"]')?.classList.add('active');
  } else if (page === 'changelog.html') {
    sidebarEl.querySelector('[data-nav="changelog"]')?.classList.add('active');
  }

  // Close sidebar on nav link click (mobile)
  sidebarEl.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
      if (window.innerWidth <= 900) closeSidebar();
    });
  });

  // Scroll-spy: highlight active nav item (guide page only)
  const sections = document.querySelectorAll('section[id], div.hero');
  if (sections.length === 0) return;

  const navItems = sidebarEl.querySelectorAll('.nav-item');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navItems.forEach(item => {
        item.classList.remove('active');
        item.removeAttribute('aria-current');
      });
      const id = entry.target.id;
      const active = sidebarEl.querySelector(`.nav-item[href="ai-workflow-guide.html#${id}"]`)
                  || sidebarEl.querySelector(`.nav-item[href="#${id}"]`);
      if (active) {
        active.classList.add('active');
        active.setAttribute('aria-current', 'true');
      }
    });
  }, { rootMargin: '-20% 0px -70% 0px' });

  sections.forEach(section => observer.observe(section));
}
