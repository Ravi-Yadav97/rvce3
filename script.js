// ---------- DATA ----------
const QUOTAS = [
  { name: 'MANAGEMENT', value: 25, color: '#8c1d40', dark: '#6b1530' },
  { name: 'COMEDK',     value: 30, color: '#1d4172', dark: '#13315c' },
  { name: 'KCET',       value: 45, color: '#0b2545', dark: '#06182d' },
];

const CSE_BRANCHES = [
  { title: 'Computer Science',     sub: 'Core CSE',                y1: 36, yRest: 13, icon: '💻' },
  { title: 'CSE (AI & ML)',        sub: 'Artificial Intelligence', y1: 31, yRest: 12, icon: '🤖' },
  { title: 'CSE (Data Science)',   sub: 'Data Engineering',        y1: 24, yRest: 12, icon: '📊' },
  { title: 'CSE (Cyber Security)', sub: 'InfoSec & Networks',      y1: 22, yRest: 11, icon: '🔒' },
];

const CIRCUIT_BRANCHES = [
  { title: 'Electronics & Telecommunication', sub: 'Signal & RF Systems', y1: 8,  yRest: 8, icon: '📡' },
  { title: 'Electronics & Communication',     sub: 'VLSI & Embedded',     y1: 19, yRest: 8, icon: '🔌' },
  { title: 'Electrical & Electronics',        sub: 'Power Systems',       y1: 7,  yRest: 7, icon: '⚡' },
];

const CORE_BRANCHES = [
  { title: 'Civil Engineering',      sub: 'Structures & Infrastructure', y1: 7,  yRest: 7, icon: '🏗️' },
  { title: 'Mechanical Engineering', sub: 'Design & Manufacturing',      y1: 7,  yRest: 7, icon: '⚙️' },
  { title: 'Industrial Management',  sub: 'Operations & Management',     y1: 6,  yRest: 6, icon: '📈' },
  { title: 'Aerospace Engineering',  sub: 'Avionics & Propulsion',       y1: 11, yRest: 8, icon: '🚀' },
];

const OTHER_BRANCHES = [
  { title: 'Biotechnology',       sub: 'Life Sciences & Biotech', y1: 10,  yRest: 6,   icon: '🧬' },
  { title: 'Chemical Engineering', sub: 'Process & Materials',    y1: 4.5, yRest: 4.5, icon: '⚗️' },
  { title: 'B.Arch',              sub: 'Architecture',             y1: 6,   yRest: 6,   fiveYear: true, icon: '📐' },
];

const FAQS = [
  { q: 'How can I take admission at RVCE?',
    a: 'Admission to RVCE is through three routes: Management Quota (25% seats — direct admission), COMEDK UGET (30% seats — All-India entrance exam), and KCET/KEA (45% seats — Karnataka government quota). Contact us for end-to-end guidance on any route.' },
  { q: 'Are JEE Mains scores considered for admission?',
    a: 'No, JEE Mains scores are not considered for RVCE admissions. Selection is based on COMEDK UGET rank for COMEDK quota, KCET rank for the government quota, or eligibility for the Management quota.' },
  { q: 'Does RVCE conduct its own entrance exam?',
    a: 'No, RVCE does not run a separate entrance exam. Seats are filled through the COMEDK UGET and KCET centralized counselling processes, plus the Management Quota based on eligibility criteria.' },
  { q: 'What is the eligibility criteria for Management Quota?',
    a: 'Candidates must have passed Class 12 / 2nd PUC with at least 60% in Physics and Mathematics separately, along with one of: Chemistry, Biotechnology, Biology, Computer Science, or Electronics.' },
  { q: 'Is hostel facility available at RVCE?',
    a: 'Yes, RVCE provides separate on-campus hostels for boys and girls with modern amenities. Allocation depends on availability, so applying early is recommended.' },
  { q: 'What documents are required for admission?',
    a: 'Typical documents: 10th and 12th mark sheets and certificates, Transfer Certificate, Migration Certificate, Caste/Category certificate (if applicable), Domicile certificate, passport-size photographs, and ID proof. Our team helps with the full document checklist.' },
];

// ---------- NAVBAR / SCROLL ----------
function smoothTo(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

document.querySelectorAll('[data-target]').forEach(el => {
  el.addEventListener('click', () => {
    const t = el.getAttribute('data-target');
    if (!t) return;
    if (t === 'admission-section') smoothTo('admission-section');
    else smoothTo(t);
    // close mobile menu
    document.getElementById('mobileMenu').classList.remove('visible');
    document.getElementById('hamburgerBtn').classList.remove('open');
  });
});

document.querySelectorAll('.nav-links li').forEach(li => {
  li.addEventListener('click', () => {
    document.querySelectorAll('.nav-links li').forEach(x => x.classList.remove('active'));
    li.classList.add('active');
  });
});

const hamb = document.getElementById('hamburgerBtn');
const mobMenu = document.getElementById('mobileMenu');
hamb.addEventListener('click', () => {
  hamb.classList.toggle('open');
  mobMenu.classList.toggle('visible');
});

// ---------- PIE CHART ----------
function buildPie() {
  const svg = document.getElementById('seatPie');
  if (!svg) return;
  const cx = 100, cy = 100, r = 80, ir = 38;
  let start = -Math.PI / 2;
  const total = QUOTAS.reduce((s, q) => s + q.value, 0);

  const arc = (a0, a1, ro, ri) => {
    const x0 = cx + ro * Math.cos(a0), y0 = cy + ro * Math.sin(a0);
    const x1 = cx + ro * Math.cos(a1), y1 = cy + ro * Math.sin(a1);
    const x2 = cx + ri * Math.cos(a1), y2 = cy + ri * Math.sin(a1);
    const x3 = cx + ri * Math.cos(a0), y3 = cy + ri * Math.sin(a0);
    const large = (a1 - a0) > Math.PI ? 1 : 0;
    return `M${x0} ${y0} A${ro} ${ro} 0 ${large} 1 ${x1} ${y1} L${x2} ${y2} A${ri} ${ri} 0 ${large} 0 ${x3} ${y3} Z`;
  };

  QUOTAS.forEach(q => {
    const angle = (q.value / total) * Math.PI * 2;
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', arc(start, start + angle, r, ir));
    path.setAttribute('fill', q.color);
    path.setAttribute('stroke', '#fff');
    path.setAttribute('stroke-width', '2');
    path.style.transition = 'transform .25s, filter .25s';
    path.style.transformOrigin = `${cx}px ${cy}px`;
    path.style.cursor = 'pointer';
    path.dataset.key = q.name;
    path.addEventListener('mouseenter', () => {
      path.setAttribute('fill', q.dark);
      path.style.transform = 'scale(1.06)';
      path.style.filter = 'drop-shadow(0 4px 10px rgba(0,0,0,.25))';
      document.getElementById('centerCircle').classList.add('active');
      const cc = document.getElementById('centerCircle');
      cc.querySelector('span').textContent = q.name;
      cc.querySelector('strong').textContent = q.value + '%';
      document.querySelectorAll('.legend-item').forEach(li => {
        li.classList.toggle('active', li.dataset.key === q.name);
      });
      document.querySelectorAll('.quota-card').forEach(c => {
        c.classList.toggle('active', c.dataset.key === q.name);
      });
    });
    path.addEventListener('mouseleave', () => {
      path.setAttribute('fill', q.color);
      path.style.transform = '';
      path.style.filter = '';
      const cc = document.getElementById('centerCircle');
      cc.classList.remove('active');
      cc.querySelector('span').textContent = 'SEATS';
      cc.querySelector('strong').textContent = '100%';
      document.querySelectorAll('.legend-item').forEach(li => li.classList.remove('active'));
      document.querySelectorAll('.quota-card').forEach(c => c.classList.remove('active'));
    });
    svg.appendChild(path);
    start += angle;
  });
}
buildPie();

// hover sync from cards/legend → highlight slice
document.querySelectorAll('.quota-card, .legend-item').forEach(el => {
  el.addEventListener('mouseenter', () => {
    const key = el.dataset.key;
    const q = QUOTAS.find(x => x.name === key);
    if (!q) return;
    const cc = document.getElementById('centerCircle');
    cc.classList.add('active');
    cc.querySelector('span').textContent = q.name;
    cc.querySelector('strong').textContent = q.value + '%';
    document.querySelectorAll('#seatPie path').forEach(p => {
      if (p.dataset.key === key) {
        p.setAttribute('fill', q.dark);
        p.style.transform = 'scale(1.06)';
      }
    });
  });
  el.addEventListener('mouseleave', () => {
    const cc = document.getElementById('centerCircle');
    cc.classList.remove('active');
    cc.querySelector('span').textContent = 'SEATS';
    cc.querySelector('strong').textContent = '100%';
    document.querySelectorAll('#seatPie path').forEach(p => {
      const q = QUOTAS.find(x => x.name === p.dataset.key);
      if (q) {
        p.setAttribute('fill', q.color);
        p.style.transform = '';
      }
    });
  });
});

// ---------- BRANCH CARDS ----------
function renderBranchCard(b) {
  const total = b.fiveYear ? (b.y1 + b.yRest * 4) : (b.y1 + b.yRest * 3);
  const rowCols = b.fiveYear
    ? `<div class="bc-col"><span>Y2</span><strong>${b.yRest}</strong></div>
       <div class="bc-col"><span>Y3</span><strong>${b.yRest}</strong></div>
       <div class="bc-col"><span>Y4</span><strong>${b.yRest}</strong></div>
       <div class="bc-col"><span>Y5</span><strong>${b.yRest}</strong></div>`
    : `<div class="bc-col"><span>Y2</span><strong>${b.yRest}</strong></div>
       <div class="bc-col"><span>Y3</span><strong>${b.yRest}</strong></div>
       <div class="bc-col"><span>Y4</span><strong>${b.yRest}</strong></div>`;
  const rowClass = b.fiveYear ? 'bc-table-row bc-table-row--5yr' : 'bc-table-row';
  return `
    <div class="branch-card">
      <div class="bc-accent-bar" style="background:linear-gradient(135deg,#2563eb,#ec4899);width:100%"></div>
      <div class="bc-top">
        <div class="bc-icon" style="background:#eff6ff;color:#1e3a8a">${b.icon}</div>
        <div class="bc-title-wrap">
          <p class="bc-name">${b.title}</p>
          <span class="bc-sub">${b.sub}</span>
        </div>
      </div>
      <div class="${rowClass}">
        <div class="bc-col"><span>Y1</span><strong>${b.y1}</strong></div>
        ${rowCols}
        <div class="bc-col total" style="background:linear-gradient(135deg,#2563eb,#ec4899)"><span>Total</span><strong>${total}</strong></div>
      </div>
    </div>`;
}

function fillGrid(id, data) {
  const grid = document.getElementById(id);
  if (grid) grid.innerHTML = data.map(renderBranchCard).join('');
}
fillGrid('cseGrid', CSE_BRANCHES);
fillGrid('circuitGrid', CIRCUIT_BRANCHES);
fillGrid('coreGrid', CORE_BRANCHES);
fillGrid('otherGrid', OTHER_BRANCHES);

// ---------- FAQ ACCORDION ----------
const faqList = document.getElementById('faqList');
if (faqList) {
  faqList.innerHTML = FAQS.map((f, i) => `
    <div class="faq-item${i === 0 ? ' open' : ''}">
      <button class="faq-question" type="button">
        <span class="faq-q-text">${f.q}</span>
        <span class="faq-icon">${i === 0 ? '−' : '+'}</span>
      </button>
      <div class="faq-answer" style="${i === 0 ? '' : 'display:none'}">${f.a}</div>
    </div>
  `).join('');

  faqList.querySelectorAll('.faq-question').forEach((btn, idx) => {
    btn.addEventListener('click', () => {
      const items = faqList.querySelectorAll('.faq-item');
      items.forEach((it, i) => {
        const ans = it.querySelector('.faq-answer');
        const icon = it.querySelector('.faq-icon');
        if (i === idx) {
          const isOpen = it.classList.toggle('open');
          ans.style.display = isOpen ? '' : 'none';
          icon.textContent = isOpen ? '−' : '+';
        } else {
          it.classList.remove('open');
          ans.style.display = 'none';
          icon.textContent = '+';
        }
      });
    });
  });
}

// ---------- FORM HANDLERS ----------
document.querySelectorAll('form').forEach(form => {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const card = form.closest('.form-card, .consult-form, .faq-form-card');
    if (card) {
      const html = `
        <div class="success">
          <h3>✅ Submitted Successfully</h3>
          <p>We will contact you shortly.</p>
        </div>`;
      card.innerHTML = html;
    }
  });
});

// ---------- SCROLL SPY (active nav link) ----------
const sections = ['admission', 'placement', 'review', 'contact']
  .map(id => document.getElementById(id))
  .filter(Boolean);
window.addEventListener('scroll', () => {
  const y = window.scrollY + 120;
  let current = sections[0]?.id;
  sections.forEach(s => { if (s.offsetTop <= y) current = s.id; });
  document.querySelectorAll('.nav-links li, .mobile-links li').forEach(li => {
    li.classList.toggle('active', li.dataset.target === current);
  });
});

// ---------- HERO WORD-BY-WORD REVEAL (disabled — lightweight mode) ----------
// Words now show statically. To re-enable, restore the previous block.

// ---------- HERO STAT COUNT-UP (disabled — lightweight mode) ----------
// Stats render their final values directly from HTML (20+, 100%, 5,000+).

// ---------- HERO PARALLAX (disabled — lightweight mode) ----------
// Removed scroll listener that updated background-position — saves cost on phones.

// =========================================================
// SECTION-IMAGE TITLE LETTER SPLIT
// =========================================================
(function () {
  const titles = document.querySelectorAll('.section-image__title h2[data-letters]');
  titles.forEach((h2) => {
    if (h2.dataset.lettersBuilt) return;
    // Walk through child nodes so we preserve <span> wrappers (e.g. consult title)
    const out = [];
    let i = 0;

    const wrapText = (text) => {
      let html = '';
      for (const ch of text) {
        if (/\s/.test(ch)) {
          html += ' ';
        } else {
          html += `<span class="letter" style="--i:${i}">${ch}</span>`;
          i++;
        }
      }
      return html;
    };

    Array.from(h2.childNodes).forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        out.push(wrapText(node.textContent));
      } else if (node.nodeType === Node.ELEMENT_NODE && node.tagName.toLowerCase() === 'span') {
        out.push(`<span class="title-accent">${wrapText(node.textContent)}</span>`);
      } else {
        out.push(node.outerHTML || '');
      }
    });

    h2.innerHTML = out.join('');
    h2.dataset.lettersBuilt = '1';
  });

  // Trigger animation each time a banner enters/exits the viewport
  const banners = document.querySelectorAll('.section-image');
  if (!banners.length) return;

  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !('IntersectionObserver' in window)) {
    banners.forEach(el => el.classList.add('is-visible'));
    return;
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      e.target.classList.toggle('is-visible', e.isIntersecting);
    });
  }, { threshold: [0, 0.2, 0.5], rootMargin: '0px 0px -5% 0px' });

  banners.forEach(el => io.observe(el));
})();

// =========================================================
// SECTION HEADING ACCENT LINE
// (lightweight mode — keeps the small gold/crimson rule under each
// section heading; no scroll reveals, no observers, no word-splits)
// =========================================================
(function () {
  const ACCENT_HOSTS = [
    '.admission-header',
    '.eligibility-header',
    '.institute-header',
    '.fee-header',
    '.faq-header',
  ];
  ACCENT_HOSTS.forEach(sel => {
    document.querySelectorAll(sel).forEach(host => {
      if (host.querySelector('.section-accent')) return;
      const h = host.querySelector('h2');
      if (!h) return;
      const accent = document.createElement('span');
      accent.className = 'section-accent';
      h.insertAdjacentElement('afterend', accent);
    });
  });
})();

// =========================================================
// SECTION HEADING SUBTLE COLOR LIFT ON SCROLL
// =========================================================
// (handled in CSS via .title span gradient + hover; nothing here)


// ---------- NAV SEARCH ----------
(function () {
  const form = document.getElementById('navSearch');
  if (!form) return;
  const input = form.querySelector('input');
  const clear = form.querySelector('.nav-search-clear');

  const sync = () => form.classList.toggle('has-value', input.value.trim().length > 0);
  input.addEventListener('input', sync);
  sync();

  clear.addEventListener('click', () => {
    input.value = '';
    sync();
    input.focus();
  });

  // Simple in-page search: scrolls to the first match and briefly highlights it
  const SECTIONS = [
    { id: 'admission', keys: ['admission','apply','enroll'] },
    { id: 'placement', keys: ['placement','fee','fees','branch','course'] },
    { id: 'review',    keys: ['review','consultation','consult','book'] },
    { id: 'contact',   keys: ['contact','faq','question','help','enquiry','inquiry'] },
  ];

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const q = input.value.trim().toLowerCase();
    if (!q) return;

    let target = null;
    for (const s of SECTIONS) {
      if (s.keys.some(k => k.includes(q) || q.includes(k))) {
        target = document.getElementById(s.id);
        break;
      }
    }
    if (!target) {
      const all = document.querySelectorAll('h1,h2,h3,h4,p,li,strong,span');
      for (const el of all) {
        const text = (el.textContent || '').toLowerCase();
        if (text.includes(q)) {
          target = el.closest('section') || el;
          break;
        }
      }
    }
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      target.style.transition = 'box-shadow .4s';
      const prevShadow = target.style.boxShadow;
      target.style.boxShadow = 'inset 0 0 0 3px rgba(11,37,69,.25)';
      setTimeout(() => { target.style.boxShadow = prevShadow; }, 1400);
    }
    input.blur();
  });
})();
