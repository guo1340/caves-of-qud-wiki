(function () {
  const D = window.WikiData;
  const main = document.getElementById('main');
  const leftNav = document.getElementById('leftNav');
  const rightNav = document.getElementById('rightNav');
  const searchInput = document.getElementById('searchInput');
  const searchResults = document.getElementById('searchResults');
  const menuToggle = document.getElementById('menuToggle');

  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const category = (id) => D.categories.find((c) => c.id === id);
  const pagesIn = (id) => D.pages.filter((p) => p.category === id);
  const page = (cat, id) => D.pages.find((p) => p.category === cat && p.id === id);
  const route = () => (location.pathname.replace(/\/$/, '') || '/').replace('/index.html', '/');
  const cleanHref = (href) => {
    if (!href || href === '/' || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('#')) return href;
    if (!href.startsWith('/') || /\/$/.test(href) || /\.[a-z0-9]+$/i.test(href)) return href;
    return href + '/';
  };

  const icons = {
    compass: 'M50 12 62 38 88 50 62 62 50 88 38 62 12 50 38 38zM50 34v32M34 50h32',
    dna: 'M30 16c40 20 40 48 0 68M70 16C30 36 30 64 70 84M36 30h28M31 48h38M36 66h28',
    profile: 'M50 18a18 18 0 110 36 18 18 0 010-36zM22 84c8-20 48-20 56 0',
    nodes: 'M24 28h22v22H24zM54 50h22v22H54zM25 74h18M44 39h12M40 50l18 10',
    chip: 'M30 30h40v40H30zM40 40h20v20H40zM18 38h12M18 52h12M18 66h12M70 38h12M70 52h12M70 66h12',
    sigil: 'M50 12l30 18v24c0 19-12 31-30 40-18-9-30-21-30-40V30zM36 48h28M50 34v28',
    map: 'M18 24l20-8 24 8 20-8v60l-20 8-24-8-20 8zM38 16v60M62 24v60',
    cube: 'M50 16l30 17v34L50 84 20 67V33zM20 33l30 17 30-17M50 50v34',
    eye: 'M12 50s16-24 38-24 38 24 38 24-16 24-38 24-38-24-38-24zM50 38a12 12 0 100 24 12 12 0 000-24z',
    scroll: 'M30 18h40c7 0 10 5 10 11s-4 10-10 10H36v43c-8 0-14-5-14-13V27c0-5 3-9 8-9z',
    gear: 'M50 20l7 9 12-2 4 11-9 8 3 12-10 7-8-8-10 8-10-7 3-12-9-8 4-11 12 2z',
    signal: 'M20 70a42 42 0 0160 0M32 58a25 25 0 0136 0M46 72h8'
  };
  const icon = (name) => `<svg viewBox="0 0 100 100" aria-hidden="true"><path d="${icons[name] || icons.scroll}" fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

  function adSlot(kind) {
    const banner = kind === 'banner';
    return `<div class="ad-slot ad-${esc(kind)}" role="complementary" aria-label="Advertisement"><span class="ad-label">Archive Notice</span><ins class="adsbygoogle" style="display:block;${banner ? 'width:100%;height:90px;' : ''}" data-ad-client="ca-pub-1319817671788428" data-ad-slot="6141169453" ${banner ? '' : 'data-ad-format="auto"'} data-full-width-responsive="true"></ins></div>`;
  }
  function loadAds() {
    if (!window.adsbygoogle) return;
    document.querySelectorAll('.adsbygoogle:not([data-adsbygoogle-status])').forEach(() => {
      try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch (e) {}
    });
  }
  function sourceNotes(entity) {
    const list = (entity && entity.sources || ['officialWiki', 'officialSite']).map((k) => D.sourceRegistry[k]).filter(Boolean);
    return `<aside class="source-notes"><div class="src-head">Source Packet</div><div class="src-meta"><span><strong>Last updated:</strong> ${esc(D.site.lastUpdated)}</span><span><strong>Version note:</strong> ${esc(D.site.buildStatus)}</span></div><ul>${list.map((s) => `<li><a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${esc(s.label)}</a> - ${esc(s.note)}</li>`).join('')}</ul><p>Qud is dense and version-sensitive. Treat exact numbers, spawn behavior and mod compatibility as things to verify when a run depends on them.</p></aside>`;
  }
  function relatedBlock(p) {
    const related = relatedPages(p);
    if (!related.length) return '';
    return `<nav class="related" aria-label="Related pages"><h3>Related Archive Records</h3><div class="related-grid">${related.map((r) => `<a href="${esc(cleanHref(r.href))}">${esc(r.label)}</a>`).join('')}</div></nav>`;
  }
  function relatedPages(p, count = 5) {
    const sameCategory = D.pages
      .filter((candidate) => candidate.category === p.category && candidate.id !== p.id)
      .slice(0, count)
      .map((candidate) => ({ label: candidate.title, href: `/${candidate.category}/${candidate.id}` }));
    const explicit = (p.related || [])
      .filter((r) => r && r.href && r.href !== `/${p.category}`)
      .map((r) => ({ label: r.label, href: r.href }));
    const seen = new Set();
    return [...explicit, ...sameCategory].filter((item) => {
      if (seen.has(item.href)) return false;
      seen.add(item.href);
      return true;
    }).slice(0, count);
  }
  function sectionsHTML(sections) {
    return sections.map((s) => `<section class="article-section"><h3>${esc(s.h)}</h3>${s.body || ''}${s.list ? `<ul>${s.list.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>` : ''}</section>`).join('');
  }
  function setMeta(attr, key, value) {
    let el = document.head.querySelector(`meta[${attr}="${key}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attr, key);
      document.head.appendChild(el);
    }
    el.content = value || '';
  }
  function applySeo(r) {
    if (!window.WikiMeta || !document.head) return;
    const seo = window.WikiMeta.seoFor(r);
    document.title = seo.title;
    setMeta('name', 'description', seo.description);
    setMeta('name', 'keywords', seo.keywords.join(', '));
    setMeta('property', 'og:title', seo.ogTitle);
    setMeta('property', 'og:description', seo.ogDescription);
    setMeta('property', 'og:type', seo.ogType);
    setMeta('property', 'og:url', seo.canonical);
    setMeta('property', 'og:image', seo.ogImage);
    setMeta('name', 'twitter:title', seo.ogTitle);
    setMeta('name', 'twitter:description', seo.ogDescription);
    setMeta('name', 'twitter:image', seo.ogImage);
    let link = document.head.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.rel = 'canonical';
      document.head.appendChild(link);
    }
    link.href = seo.canonical;
    let ld = document.getElementById('coq-jsonld');
    if (!ld) {
      ld = document.createElement('script');
      ld.type = 'application/ld+json';
      ld.id = 'coq-jsonld';
      document.head.appendChild(ld);
    }
    ld.textContent = JSON.stringify(window.WikiMeta.jsonLdFor(r));
  }

  function renderLeftNav(active) {
    leftNav.innerHTML = `<h3>Zone Index</h3><ul>${D.categories.map((c) => `<li><a href="/${esc(c.id)}/" data-r="/${esc(c.id)}"><span>${esc(c.title.slice(0, 2).toUpperCase())}</span>${esc(c.title)}</a></li>`).join('')}</ul><h3>Site Info</h3><ul><li><a href="/about/" data-r="/about"><span>AB</span>About</a></li><li><a href="/privacy-policy/" data-r="/privacy-policy"><span>PP</span>Privacy Policy</a></li><li><a href="/contact/" data-r="/contact"><span>CT</span>Contact</a></li></ul>`;
    leftNav.querySelectorAll('a').forEach((a) => {
      const r = a.getAttribute('data-r');
      if (active === r || (r !== '/' && active.startsWith(r + '/'))) a.classList.add('active');
    });
  }
  function renderRightNav() {
    const fact = D.facts[Math.floor(Math.random() * D.facts.length)];
    rightNav.innerHTML = `<h3>Popular Queries</h3><ul><li><a href="/mutations/best-mutations/"><span>MU</span>Best Mutations</a></li><li><a href="/builds/best-builds/"><span>BU</span>Best Builds</a></li><li><a href="/comparisons/true-kin-vs-mutant/"><span>CO</span>True Kin vs Mutant</a></li><li><a href="/builds/true-kin-guide/"><span>TK</span>True Kin Guide</a></li><li><a href="/builds/esper-build/"><span>ES</span>Esper Build</a></li><li><a href="/cybernetics/best-cybernetics/"><span>CY</span>Best Cybernetics</a></li><li><a href="/factions/reputation-guide/"><span>FA</span>Reputation Guide</a></li><li><a href="/maps/golgotha/"><span>GO</span>Golgotha Guide</a></li></ul><h3>Daily Qud Fact</h3><p class="terminal-note">${esc(fact)}</p>`;
  }

  function renderHome() {
    const featured = ['beginner-guide', 'best-mutations', 'best-builds', 'true-kin-guide', 'esper-build', 'golgotha'].map((id) => D.pages.find((p) => p.id === id)).filter(Boolean);
    main.innerHTML = `<section class="hero"><img src="/assets/images/hero/homepage-hero.svg" alt="Tile-map Caves of Qud archive scene with ruins, desert, plants and chrome machinery" /><div class="hero-content"><span class="hero-kicker">Live and drink // terminal awake</span><h1>Caves of Qud Wiki</h1><p>A chromed archive for salt dunes, sentient plants, mutations, cybernetics, factions, relics and the thousand-year civilizations under Qud.</p><div class="hero-buttons"><a class="btn" href="/beginner-guide/beginner-guide/">Beginner Guide</a><a class="btn" href="/mutations/">Mutations</a><a class="btn" href="/comparisons/">Comparisons</a><a class="btn" href="/builds/">Character Builds</a><a class="btn" href="/factions/">Factions</a><a class="btn" href="/maps/">Maps</a><a class="btn" href="/lore/">Lore</a></div></div></section>${adSlot('banner')}<h2 class="section-head">Archive Categories</h2><div class="cards cat-cards">${D.categories.map((c) => `<a class="card cat-card" href="/${esc(c.id)}/"><span class="ico">${icon(c.icon)}</span><h4>${esc(c.title)}</h4><p>${esc(c.summary)}</p></a>`).join('')}</div><div class="home-grid"><section class="page"><h2>Core Traffic Records</h2><div class="breadcrumb">Pages travelers search for first.</div><ul class="link-list">${featured.map((p) => `<li><a href="/${esc(p.category)}/${esc(p.id)}/">${esc(p.title)}<span>${esc(p.summary)}</span></a></li>`).join('')}</ul></section><section class="page terminal-panel"><h2>Build Survival Loop</h2><div class="breadcrumb">A compact machine-prayer for not dying.</div><ol><li>Start with one damage plan and one escape plan.</li><li>Use villages and merchants as anchors.</li><li>Respect disease, reputation and terrain as real threats.</li><li>Upgrade through skills, artifacts, cybernetics or mutations deliberately.</li><li>Leave before curiosity becomes a tomb inscription.</li></ol></section></div>${adSlot('in-article')}`;
  }
  function renderCategory(id) {
    const c = category(id);
    if (!c) return render404(id);
    const pages = pagesIn(id);
    main.innerHTML = `${adSlot('banner')}<section class="page"><h1>${esc(c.title)}</h1><div class="breadcrumb">Home / ${esc(c.title)}</div><p class="lead">${esc(c.summary)}</p><div class="cards">${pages.map((p) => `<a class="card" href="/${esc(p.category)}/${esc(p.id)}/"><h4>${esc(p.title)}</h4><p>${esc(p.summary)}</p></a>`).join('')}</div></section>${adSlot('in-article')}`;
  }
  function renderDetail(cat, id) {
    const c = category(cat);
    const p = page(cat, id);
    if (!c || !p) return render404(cat + '/' + id);
    main.innerHTML = `${adSlot('banner')}<article class="page article"><div class="breadcrumb"><a href="/${esc(c.id)}/">${esc(c.title)}</a> / ${esc(p.title)}</div><h1>${esc(p.title)}</h1><p class="lead">${esc(p.summary)}</p><div class="info-grid"><div>${sectionsHTML(p.sections)}${relatedBlock(p)}${sourceNotes(p)}</div><aside class="infobox"><div class="infobox-head">Quick Stats</div><dl>${p.stats.map((x, i) => `<dt>${String(i + 1).padStart(2, '0')}</dt><dd>${esc(x)}</dd>`).join('')}</dl></aside></div></article>${adSlot('in-article')}`;
  }
  function renderInfo(slug) {
    const p = D.infoPages[slug];
    if (!p) return render404(slug);
    main.innerHTML = `${adSlot('banner')}<section class="page legal-page"><h1>${esc(p.title)}</h1><div class="breadcrumb">Home / ${esc(p.title)}</div>${p.body}${sourceNotes(null)}</section>`;
  }
  function render404(slug) {
    main.innerHTML = `<section class="page"><h1>Archive Record Missing</h1><p>No terminal record found for <code>${esc(slug)}</code>.</p><p><a href="/">Return to the archive root</a></p></section>`;
  }
  function navigate() {
    const r = route();
    renderLeftNav(r);
    renderRightNav();
    const seg = r.split('/').filter(Boolean);
    if (r === '/') renderHome();
    else if (seg.length === 1 && category(seg[0])) renderCategory(seg[0]);
    else if (seg.length === 1 && D.infoPages[seg[0]]) renderInfo(seg[0]);
    else if (seg.length === 2) renderDetail(seg[0], seg[1]);
    else render404(r);
    applySeo(r);
    setTimeout(loadAds, 100);
  }
  function go(path) {
    const clean = path.replace(/\/$/, '') || '/';
    if (clean === route()) return;
    history.pushState({}, '', clean);
    leftNav.classList.remove('open');
    navigate();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  const searchIndex = Array.isArray(D.searchIndex) ? D.searchIndex : [
    ...D.categories.map((c) => ({ title: c.title, sub: 'Category', href: '/' + c.id + '/' })),
    ...D.pages.map((p) => ({ title: p.title, sub: category(p.category).title, href: '/' + p.category + '/' + p.id + '/', tags: p.stats.join(' ') })),
    ...Object.entries(D.infoPages).map(([k, p]) => ({ title: p.title, sub: 'Site Info', href: '/' + k + '/' }))
  ];
  function runSearch(q) {
    if (!q) {
      searchResults.classList.remove('open');
      return;
    }
    const low = q.toLowerCase();
    const matches = searchIndex.filter((x) => (x.title + ' ' + x.sub + ' ' + (x.tags || '')).toLowerCase().includes(low)).slice(0, 12);
    searchResults.innerHTML = matches.length ? matches.map((m) => `<a href="${esc(cleanHref(m.href))}">${esc(m.title)}<span>${esc(m.sub)}</span></a>`).join('') : '<div class="empty">No archive records match.</div>';
    searchResults.classList.add('open');
  }
  searchInput.addEventListener('input', () => runSearch(searchInput.value.trim()));
  searchInput.addEventListener('focus', () => runSearch(searchInput.value.trim()));
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href]');
    if (!a) {
      if (!e.target.closest('.search')) searchResults.classList.remove('open');
      return;
    }
    const href = a.getAttribute('href');
    if (!href || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('#')) return;
    const url = new URL(href, location.origin);
    if (url.origin !== location.origin) return;
    if (!window.__GW_PRERENDER__) {
      searchInput.value = '';
      searchResults.classList.remove('open');
      return;
    }
    e.preventDefault();
    searchInput.value = '';
    searchResults.classList.remove('open');
    go(url.pathname);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === '/' && document.activeElement !== searchInput) {
      e.preventDefault();
      searchInput.focus();
    }
    if (e.key === 'Escape') searchResults.classList.remove('open');
  });
  window.addEventListener('popstate', () => { if (window.__GW_PRERENDER__) navigate(); });
  if (menuToggle) menuToggle.onclick = () => leftNav.classList.toggle('open');
  if (window.__GW_PRERENDER__) {
    navigate();
  } else {
    setTimeout(loadAds, 100);
  }
})();
