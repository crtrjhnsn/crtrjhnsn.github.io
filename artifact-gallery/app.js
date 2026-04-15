/* ============================================================
   Artifact Gallery — app.js
   Gallery page: dark mode, search, filter, render cards
   ============================================================ */

// ── State ────────────────────────────────────────────────────
let allArtifacts = [];
let currentType  = 'all';
let searchQuery  = '';
let searchTimer  = null;

// ── Dark Mode ────────────────────────────────────────────────
const html   = document.documentElement;
const toggle = document.getElementById('theme-toggle');
const sunIcon  = document.getElementById('icon-sun');
const moonIcon = document.getElementById('icon-moon');

function applyTheme(dark) {
  html.setAttribute('data-theme', dark ? 'dark' : 'light');
  sunIcon.style.display  = dark ? 'block' : 'none';
  moonIcon.style.display = dark ? 'none'  : 'block';
}

function initTheme() {
  const saved = localStorage.getItem('ag-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(saved ? saved === 'dark' : prefersDark);
}

toggle.addEventListener('click', () => {
  const isDark = html.getAttribute('data-theme') === 'dark';
  const next = !isDark;
  applyTheme(next);
  localStorage.setItem('ag-theme', next ? 'dark' : 'light');
});

initTheme();

// ── Load Artifacts ───────────────────────────────────────────
async function loadArtifacts() {
  try {
    const res = await fetch('content/artifacts.json');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    allArtifacts = await res.json();
    // Sort newest first
    allArtifacts.sort((a, b) => new Date(b.date) - new Date(a.date));
    updateCounts();
    renderGrid();
  } catch (err) {
    console.error('Failed to load artifacts:', err);
    document.getElementById('artifact-grid').innerHTML = `
      <div class="error-state">
        <h2>Could not load artifacts</h2>
        <p>Make sure you're running a local server.<br>
           Run: <code>python3 -m http.server 8000</code></p>
      </div>`;
  }
}

// ── Counts ───────────────────────────────────────────────────
function updateCounts() {
  const types = ['claude', 'doc', 'image', 'code'];
  document.getElementById('count-all').textContent = allArtifacts.length;
  types.forEach(t => {
    const el = document.getElementById(`count-${t}`);
    if (el) el.textContent = allArtifacts.filter(a => a.type === t).length;
  });
}

// ── Filter & Search ──────────────────────────────────────────
function getFiltered() {
  const q = searchQuery.toLowerCase().trim();
  return allArtifacts.filter(a => {
    const typeMatch = currentType === 'all' || a.type === currentType;
    if (!typeMatch) return false;
    if (!q) return true;
    return (
      a.title.toLowerCase().includes(q) ||
      (a.description || '').toLowerCase().includes(q) ||
      (a.tags || []).some(t => t.toLowerCase().includes(q))
    );
  });
}

// ── Render Grid ──────────────────────────────────────────────
function renderGrid() {
  const grid = document.getElementById('artifact-grid');
  const items = getFiltered();

  if (items.length === 0) {
    grid.innerHTML = `
      <div class="empty-state" role="status">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <h2>No artifacts found</h2>
        <p>${searchQuery ? `No results for "<strong>${escHtml(searchQuery)}</strong>"` : 'Add your first artifact to get started.'}</p>
      </div>`;
    return;
  }

  grid.innerHTML = items.map(renderCard).join('');
}

// ── Card Template ────────────────────────────────────────────
const TYPE_LABELS = { claude: 'Claude', doc: 'Doc', image: 'Image', code: 'Code' };
const TYPE_ICONS  = {
  claude: `<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.8)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
  doc:    `<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.8)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>`,
  image:  `<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.8)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>`,
  code:   `<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.8)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
};

function renderCard(artifact) {
  const { id, type, title, description, tags = [], date, thumbnail } = artifact;
  const label    = TYPE_LABELS[type] || type;
  const thumbHtml = thumbnail
    ? `<img class="card-thumb-img" src="${escAttr(thumbnail)}" alt="${escAttr(title)}" loading="lazy" />`
    : (TYPE_ICONS[type] || '');

  return `
    <a class="artifact-card" href="artifact.html?id=${encodeURIComponent(id)}" role="listitem" aria-label="${escAttr(title)}">
      <div class="card-thumb" data-type="${escAttr(type)}">
        ${thumbHtml}
      </div>
      <div class="card-body">
        <div class="card-meta">
          <span class="type-badge" data-type="${escAttr(type)}">${label}</span>
          <span class="card-date">${formatDate(date)}</span>
        </div>
        <h2 class="card-title">${escHtml(title)}</h2>
        ${description ? `<p class="card-desc">${escHtml(description)}</p>` : '<div class="card-desc"></div>'}
        ${tags.length ? `<div class="card-tags">${tags.map(t => `<span class="tag">${escHtml(t)}</span>`).join('')}</div>` : ''}
      </div>
    </a>`;
}

// ── Filter Tabs ──────────────────────────────────────────────
document.getElementById('filter-bar').addEventListener('click', e => {
  const tab = e.target.closest('.filter-tab');
  if (!tab) return;
  currentType = tab.dataset.type;
  document.querySelectorAll('.filter-tab').forEach(t => {
    const active = t.dataset.type === currentType;
    t.classList.toggle('active', active);
    t.setAttribute('aria-selected', active);
  });
  renderGrid();
});

// ── Search ───────────────────────────────────────────────────
document.getElementById('search-input').addEventListener('input', e => {
  clearTimeout(searchTimer);
  searchTimer = setTimeout(() => {
    searchQuery = e.target.value;
    renderGrid();
  }, 180);
});

// ── Helpers ──────────────────────────────────────────────────
function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
function escAttr(str) { return escHtml(str); }

function formatDate(iso) {
  if (!iso) return '';
  try {
    return new Date(iso + 'T00:00:00').toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric'
    });
  } catch { return iso; }
}

// ── Boot ─────────────────────────────────────────────────────
loadArtifacts();
