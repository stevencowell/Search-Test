(function() {
  // Pages to search, relative to the site root
  const pages = [
    "Task 1 Modules/Observation Checklist Task 1 - PPE.html",
    "Task 1 Modules/Task1 tutorial - WHS.html",
    "Task 1 Modules/Task1_Tutorial.html",
    "Task 1 Modules/module1.html",
    "Task 1 Modules/module2.html",
    "Task 1 Modules/module3.html",
    "Task 1 Modules/module4.html",
    "Task 1 Modules/task1_index.html",
    "Task 2 Modules/Observation Checklist Task 2 - Handle Construction Material.html",
    "Task 2 Modules/Task2_Tutorial.html",
    "Task 2 Modules/module1.html",
    "Task 2 Modules/module2.html",
    "Task 2 Modules/module3.html",
    "Task 2 Modules/module4.html",
    "Task 2 Modules/module5.html",
    "Task 2 Modules/module6.html",
    "Task 2 Modules/module7.html",
    "Task 2 Modules/task2_index.html",
    "Task 3 Modules/Observation scenario Task 3 - Safe Work.html",
    "Task 3 Modules/Task3_JSA_Tutorial.html",
    "Task 3 Modules/Task3_Tutorial.html",
    "Task 3 Modules/module1.html",
    "Task 3 Modules/module2.html",
    "Task 3 Modules/module3.html",
    "Task 3 Modules/module4.html",
    "Task 3 Modules/module5.html",
    "Task 3 Modules/task3_index.html",
    "Task 4 Modules/Observation scenario Task 4 - Measurments 2.html",
    "Task 4 Modules/Observation scenario Task 4 - Measurments.html",
    "Task 4 Modules/Task4_Measurement_Method_Tutorial.html",
    "Task 4 Modules/module1.html",
    "Task 4 Modules/module2.html",
    "Task 4 Modules/module3.html",
    "Task 4 Modules/module4.html",
    "Task 4 Modules/task4_index.html",
    "Task 5.3 Modules/Observation Checklist Task 5.3 - Joinery.html",
    "Task 5.3 Modules/Task5.3_Tutorial 2.html",
    "Task 5.3 Modules/joinery_observation_tutor (1).html",
    "Task 5.3 Modules/module1.html",
    "Task 5.3 Modules/module2.html",
    "Task 5.3 Modules/module3.html",
    "Task 5.3 Modules/module4.html",
    "Task 5.3 Modules/task5_index.html",
    "Task 6 Modules/Observation Checklist Task 6 - Planning.html",
    "Task 6 Modules/Task6_Tutorial.html",
    "Task 6 Modules/module1.html",
    "Task 6 Modules/module2.html",
    "Task 6 Modules/module3.html",
    "Task 6 Modules/module4.html",
    "Task 6 Modules/task6_index.html",
    "Task 7 Modules/Observation Checklist Task 7 - Group Work.htm",
    "Task 7 Modules/Observation Checklist Task 7 - Group Work.html",
    "Task 7 Modules/Task7_Tutorial.html",
    "Task 7 Modules/Task7_Tutorial2.html",
    "Task 7 Modules/module1.html",
    "Task 7 Modules/module2.html",
    "Task 7 Modules/module3.html",
    "Task 7 Modules/module4.html",
    "Task 7 Modules/task7_index.html"
  ];

  // Determine if we are on the Home page (root index.html)
  function isHomePage() {
    const path = window.location.pathname || '';
    // Treat explicit index.html as home
    if (/(?:^|\/)index\.html$/i.test(path)) return true;
    // If there's no file extension and the path ends with a slash, it's a directory index (home when served from a subpath)
    if (!/\.[a-zA-Z0-9]+$/.test(path) && path.endsWith('/')) return true;
    // Fallbacks for very short/empty paths
    return path === '/' || path === '';
  }

  // Add a class to <html> for page-context-specific styling
  function applyPageContextClass() {
    const root = document.documentElement;
    if (isHomePage()) {
      root.classList.add('is-home');
      root.classList.remove('is-non-home');
    } else {
      root.classList.add('is-non-home');
      root.classList.remove('is-home');
    }
  }

  function injectStyles() {
    if (document.getElementById('search-style')) return;
    const style = document.createElement('style');
    style.id = 'search-style';
    style.textContent = `
      /* Base search UI */
      #search-container { text-align: center; margin: 2rem 0; }
      #search-input { padding: 0.5rem 1rem; border: 1px solid #ccc; border-radius: 4px; width: 60%; max-width: 320px; }
      #search-btn { padding: 0.5rem 1rem; margin-left: 0.5rem; background: #28a745; color: #fff; border: none; border-radius: 4px; cursor: pointer; }
      #search-btn:hover { background: #218838; }
      #search-results { max-width: 800px; margin: 0 auto; padding: 0 1rem; text-align: left; }
      .search-result { margin: 0.75rem 0; padding: 0.75rem 1rem; background: #fff; border: 1px solid #e5e7eb; border-radius: 6px; }
      .search-result a { color: #1f2937; font-weight: 600; display: inline-block; margin-bottom: 0.25rem; }
      .search-snippet { color: #4b5563; font-size: 0.95rem; }
      .muted { color: #6b7280; font-size: 0.9rem; }
      mark { background: #fff3cd; padding: 0 2px; border-radius: 2px; }

      /* Non-home overrides: place search at top-right within header */
      .is-non-home header { position: relative; }
      .is-non-home #search-container {
        position: absolute; top: 0.75rem; right: 0.75rem; margin: 0; text-align: right;
      }
      .is-non-home #search-input { width: 220px; max-width: 60vw; }
      .is-non-home #search-results { margin-top: 1rem; }

      @media (max-width: 640px) {
        .is-non-home #search-input { width: 55vw; }
      }
    `;
    document.head.appendChild(style);
  }

  function ensureSearchUI() {
    const home = isHomePage();
    // Decide where to place the search input and results
    const header = document.querySelector('header');
    const main = document.querySelector('main');
    const containerMountTarget = home ? (main || document.body) : (header || main || document.body);
    const resultsMountTarget = home ? (main || document.body) : (main || document.body);

    let container = document.getElementById('search-container');
    let input = document.getElementById('search-input');
    let btn = document.getElementById('search-btn');
    let results = document.getElementById('search-results');

    if (!container) {
      container = document.createElement('div');
      container.id = 'search-container';
      // Place the container in the appropriate target (header for non-home)
      if (containerMountTarget.firstChild) {
        containerMountTarget.insertBefore(container, containerMountTarget.firstChild);
      } else {
        containerMountTarget.appendChild(container);
      }
    } else if (container.parentElement !== containerMountTarget) {
      // If an existing container is mounted elsewhere, move it
      container.parentElement.removeChild(container);
      if (containerMountTarget.firstChild) {
        containerMountTarget.insertBefore(container, containerMountTarget.firstChild);
      } else {
        containerMountTarget.appendChild(container);
      }
    }

    if (!input) {
      input = document.createElement('input');
      input.id = 'search-input';
      input.type = 'text';
      input.placeholder = 'Enter keyword…';
      container.appendChild(input);
    }

    if (!btn) {
      btn = document.createElement('button');
      btn.id = 'search-btn';
      btn.textContent = 'Search';
      container.appendChild(btn);
    }

    if (!results) {
      results = document.createElement('div');
      results.id = 'search-results';
      results.setAttribute('aria-live', 'polite');
      // Results always live in main/body, not inside header on non-home pages
      if (resultsMountTarget.firstChild) {
        resultsMountTarget.insertBefore(results, resultsMountTarget.firstChild);
      } else {
        resultsMountTarget.appendChild(results);
      }
    } else if (results.parentElement !== resultsMountTarget) {
      results.parentElement.removeChild(results);
      if (resultsMountTarget.firstChild) {
        resultsMountTarget.insertBefore(results, resultsMountTarget.firstChild);
      } else {
        resultsMountTarget.appendChild(results);
      }
    }

    return { input, btn, results };
  }

  function getBasePrefix() {
    const p = window.location.pathname;
    // If we are in a task sub-folder (spaces in folder name show up as %20), go up one level
    return /\/Task%20/.test(p) ? '../' : '';
  }

  async function performSearch() {
    const inputEl = document.getElementById('search-input');
    const resultsEl = document.getElementById('search-results');
    if (!inputEl || !resultsEl) return;

    const rawQuery = inputEl.value.trim();
    const query = rawQuery.toLowerCase();
    resultsEl.innerHTML = '';
    if (!query) return;

    resultsEl.innerHTML = '<div class="muted">Searching…</div>';

    const base = getBasePrefix();
    const matches = [];

    for (const page of pages) {
      try {
        const url = base + page.replace(/\s/g, '%20');
        const response = await fetch(url);
        if (!response.ok) continue;
        const html = await response.text();
        const doc = new DOMParser().parseFromString(html, 'text/html');
        const title = (doc.querySelector('title') && doc.querySelector('title').textContent) || page.split('/').pop();
        const bodyText = doc.body ? (doc.body.textContent || '') : html;
        const textLower = bodyText.toLowerCase();
        const firstIdx = textLower.indexOf(query);
        if (firstIdx !== -1) {
          matches.push({ page, title, bodyText, firstIdx });
        }
      } catch (err) {
        // ignore fetch errors
      }
    }

    if (matches.length === 0) {
      resultsEl.innerHTML = '<div class="muted">No matching content found.</div>';
      return;
    }

    matches.sort((a, b) => a.firstIdx - b.firstIdx);

    const maxResults = 20;
    const container = document.createDocumentFragment();
    matches.slice(0, maxResults).forEach(({ page, title, bodyText, firstIdx }) => {
      const resultItem = document.createElement('div');
      resultItem.className = 'search-result';

      const linkEl = document.createElement('a');
      linkEl.href = (getBasePrefix() || '') + page.replace(/\s/g, '%20');
      linkEl.textContent = title;
      resultItem.appendChild(linkEl);

      const snippetEl = document.createElement('div');
      snippetEl.className = 'search-snippet';
      snippetEl.innerHTML = buildSnippet(bodyText, query, firstIdx);
      resultItem.appendChild(snippetEl);

      container.appendChild(resultItem);
    });

    resultsEl.innerHTML = '';
    resultsEl.appendChild(container);
  }

  function buildSnippet(text, query, matchIndex) {
    const start = Math.max(0, matchIndex - 80);
    const end = Math.min(text.length, matchIndex + query.length + 80);
    const prefix = start > 0 ? '…' : '';
    const suffix = end < text.length ? '…' : '';
    const slice = text.slice(start, end).replace(/\s+/g, ' ');
    const lowerSlice = slice.toLowerCase();
    const idx = lowerSlice.indexOf(query);
    if (idx === -1) {
      return prefix + escapeHtml(slice) + suffix;
    }
    const before = escapeHtml(slice.slice(0, idx));
    const match = escapeHtml(slice.slice(idx, idx + query.length));
    const after = escapeHtml(slice.slice(idx + query.length));
    return `${prefix}${before}<mark>${match}</mark>${after}${suffix}`;
  }

  function escapeHtml(s) {
    return s.replace(/[&<>"']/g, function(c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] || c;
    });
  }

  function attachHandlers() {
    const btn = document.getElementById('search-btn');
    const input = document.getElementById('search-input');
    if (btn) btn.addEventListener('click', performSearch);
    if (input) input.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        performSearch();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      applyPageContextClass();
      injectStyles();
      ensureSearchUI();
      attachHandlers();
    });
  } else {
    applyPageContextClass();
    injectStyles();
    ensureSearchUI();
    attachHandlers();
  }
})();