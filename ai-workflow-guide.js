// Version selector → changelog
const versionSelect = document.getElementById('version-select');
if (versionSelect) {
  versionSelect.addEventListener('change', () => {
    window.location.href = 'changelog.html';
  });
}

// Mobile sidebar toggle
const hamburger = document.getElementById('hamburger');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('sidebar-overlay');

function openSidebar() {
  sidebar.classList.add('open');
  overlay.classList.add('visible');
  hamburger.classList.add('open');
  hamburger.setAttribute('aria-label', '메뉴 닫기');
}

function closeSidebar() {
  sidebar.classList.remove('open');
  overlay.classList.remove('visible');
  hamburger.classList.remove('open');
  hamburger.setAttribute('aria-label', '메뉴 열기');
}

hamburger.addEventListener('click', () => {
  sidebar.classList.contains('open') ? closeSidebar() : openSidebar();
});

overlay.addEventListener('click', closeSidebar);

// Close sidebar on nav link click (mobile)
document.querySelectorAll('.nav-item').forEach(item => {
  item.addEventListener('click', () => {
    if (window.innerWidth <= 900) closeSidebar();
  });
});

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

// Scroll-spy: highlight active nav item
const sections = document.querySelectorAll('section[id], div.hero');
const navItems = document.querySelectorAll('.nav-item');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navItems.forEach(item => {
        item.classList.remove('active');
        item.removeAttribute('aria-current');
      });
      const active = document.querySelector(`.nav-item[href="#${entry.target.id}"]`);
      if (active) {
        active.classList.add('active');
        active.setAttribute('aria-current', 'true');
      }
    }
  });
}, { rootMargin: '-20% 0px -70% 0px' });

sections.forEach(section => observer.observe(section));
