/* ============================================================
   Artifact Gallery — artifact-view.js
   Detail page: load artifact by id, render based on type
   ============================================================ */

// ── Dark Mode (same as app.js) ────────────────────────────────
const html   = document.documentElement;
const toggle = document.getElementById('theme-toggle');
const sunIcon  = document.getElementById('icon-sun');
const moonIcon = document.getElementById('icon-moon');

const hljsLightTheme = document.getElementById('hljs-theme-light');
const hljsDarkTheme  = document.getElementById('hljs-theme-dark');

function applyTheme(dark) {
  html.setAttribute('data-theme', dark ? 'dark' : 'light');
  sunIcon.style.display  = dark ? 'block' : 'none';
  moonIcon.style.display = dark ? 'none'  : 'block';
  if (hljsLightTheme) hljsLightTheme.disabled = dark;
  if (hljsDarkTheme)  hljsDarkTheme.disabled  = !dark;
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

// ── Helpers ──────────────────────────────────────────────────
function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function formatDate(iso) {
  if (!iso) return '';
  try {
    return new Date(iso + 'T00:00:00').toLocaleDateString('en-US', {
      weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'
    });
  } catch { return iso; }
}

const TYPE_LABELS = { claude: 'Claude Artifact', doc: 'Document', image: 'Image', code: 'Code' };

// ── Load & Render ─────────────────────────────────────────────
async function loadArtifact() {
  const params = new URLSearchParams(window.location.search);
  const id     = params.get('id');

  if (!id) {
    showError('No artifact specified.', 'Go back to the <a href="index.html">gallery</a>.');
    return;
  }

  let artifacts;
  try {
    const res = await fetch('content/artifacts.json');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    artifacts = await res.json();
  } catch (err) {
    showError(
      'Could not load artifact data.',
      'Make sure you\'re running a local server: <code>python3 -m http.server 8000</code>'
    );
    return;
  }

  const artifact = artifacts.find(a => a.id === id);
  if (!artifact) {
    showError('Artifact not found.', `No artifact with id <code>${escHtml(id)}</code>.`);
    return;
  }

  document.title = `${artifact.title} — Artifact Gallery`;
  renderHeader(artifact);
  await renderContent(artifact);
}

// ── Header ────────────────────────────────────────────────────
function renderHeader(artifact) {
  const { type, title, description, tags = [], date, language } = artifact;
  const label = TYPE_LABELS[type] || type;

  const headerEl = document.getElementById('detail-header');
  headerEl.innerHTML = `
    <a class="back-btn" href="index.html">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
      </svg>
      Back to Gallery
    </a>
    <div class="detail-meta">
      <span class="type-badge" data-type="${escHtml(type)}">${label}</span>
      ${language ? `<span class="type-badge" data-type="code" style="text-transform:none;font-weight:500">${escHtml(language)}</span>` : ''}
    </div>
    <h1 class="detail-title">${escHtml(title)}</h1>
    ${description ? `<p class="detail-desc">${escHtml(description)}</p>` : ''}
    <div class="detail-info">
      <span>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
        ${formatDate(date)}
      </span>
    </div>
    ${tags.length ? `
    <div class="detail-tags">
      ${tags.map(t => `<span class="tag">${escHtml(t)}</span>`).join('')}
    </div>` : ''}
  `;
}

// ── Content Renderers ─────────────────────────────────────────
async function renderContent(artifact) {
  const viewer = document.getElementById('content-viewer');
  viewer.style.display = '';

  switch (artifact.type) {
    case 'claude': renderClaude(artifact, viewer);   break;
    case 'doc':    await renderDoc(artifact, viewer);  break;
    case 'code':   await renderCode(artifact, viewer); break;
    case 'image':  renderImage(artifact, viewer);  break;
    default:
      viewer.innerHTML = `<div class="error-state"><p>Unknown artifact type: ${escHtml(artifact.type)}</p></div>`;
  }
}

// Claude artifact → sandboxed iframe
function renderClaude(artifact, viewer) {
  viewer.innerHTML = `
    <iframe
      src="${escHtml(artifact.file)}"
      title="${escHtml(artifact.title)}"
      sandbox="allow-scripts allow-forms"
      loading="lazy"
    ></iframe>`;
}

// Document → fetch markdown → render with marked
async function renderDoc(artifact, viewer) {
  viewer.innerHTML = '<div class="loading"><div class="spinner"></div>Loading document...</div>';

  try {
    const res  = await fetch(artifact.file);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const text = await res.text();

    // Configure marked
    marked.setOptions({ breaks: true, gfm: true });
    const html = marked.parse(text);

    viewer.innerHTML = `<div class="markdown-body">${html}</div>`;
  } catch (err) {
    viewer.innerHTML = `<div class="error-state"><h2>Could not load document</h2><p>${escHtml(err.message)}</p></div>`;
  }
}

// Code → fetch source → highlight
async function renderCode(artifact, viewer) {
  viewer.innerHTML = '<div class="loading"><div class="spinner"></div>Loading code...</div>';

  try {
    const res  = await fetch(artifact.file);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const src  = await res.text();

    const lang = artifact.language || 'plaintext';
    let highlighted;
    try {
      highlighted = hljs.highlight(src, { language: lang }).value;
    } catch {
      highlighted = hljs.highlightAuto(src).value;
    }

    viewer.innerHTML = `
      <div class="code-viewer-wrap">
        <div class="code-viewer-header">
          <span class="code-lang">${escHtml(lang)}</span>
          <button class="copy-btn" id="copy-btn">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
            </svg>
            Copy
          </button>
        </div>
        <pre class="hljs-pre"><code>${highlighted}</code></pre>
      </div>`;

    // Copy button
    document.getElementById('copy-btn').addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(src);
        const btn = document.getElementById('copy-btn');
        btn.classList.add('copied');
        btn.innerHTML = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Copied!`;
        setTimeout(() => {
          btn.classList.remove('copied');
          btn.innerHTML = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> Copy`;
        }, 2000);
      } catch { /* clipboard denied */ }
    });
  } catch (err) {
    viewer.innerHTML = `<div class="error-state"><h2>Could not load code</h2><p>${escHtml(err.message)}</p></div>`;
  }
}

// Image → display full-size
function renderImage(artifact, viewer) {
  viewer.innerHTML = `
    <div class="image-viewer">
      <img src="${escHtml(artifact.file)}" alt="${escHtml(artifact.title)}" />
    </div>`;
}

// ── Error ─────────────────────────────────────────────────────
function showError(heading, detail) {
  document.getElementById('detail-header').innerHTML = `
    <a class="back-btn" href="index.html">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
      </svg>
      Back to Gallery
    </a>
    <div class="error-state">
      <h2>${escHtml(heading)}</h2>
      <p>${detail}</p>
    </div>`;
}

// ── Boot ──────────────────────────────────────────────────────
loadArtifact();
