"use strict";
const fs = require("fs");
const path = require("path");
const ROOT = __dirname;

function mkEl() {
  return {
    _html: "",
    _text: "",
    attributes: {},
    classList: {
      add() {},
      remove() {},
      toggle() {},
      contains() {
        return false;
      },
    },
    set innerHTML(v) {
      this._html = String(v);
    },
    get innerHTML() {
      return this._html;
    },
    set textContent(v) {
      this._text = String(v);
    },
    get textContent() {
      return this._text;
    },
    setAttribute(k, v) {
      this.attributes[k] = v;
    },
    getAttribute(k) {
      return this.attributes[k] || null;
    },
    addEventListener() {},
    querySelector() {
      return mkEl();
    },
    querySelectorAll() {
      return [];
    },
    appendChild() {},
    remove() {},
    closest() {
      return null;
    },
    focus() {},
    blur() {},
  };
}

const els = {};
[
  "main",
  "leftNav",
  "rightNav",
  "searchInput",
  "searchResults",
  "menuToggle",
].forEach((id) => {
  els[id] = mkEl();
});
const headEl = mkEl();
global.document = {
  getElementById: (id) => els[id] || null,
  querySelector: () => mkEl(),
  querySelectorAll: () => [],
  createElement: () => mkEl(),
  addEventListener() {},
  get activeElement() {
    return mkEl();
  },
  head: headEl,
};
global.localStorage = { getItem: () => null, setItem() {}, removeItem() {} };
global.history = { pushState() {} };
let CURRENT = "/";
global.location = {
  get pathname() {
    return CURRENT;
  },
  origin: "https://caves-of-qud.gamewikihub.com",
};
global.window = { addEventListener() {}, scrollTo() {}, adsbygoogle: [] };
global.URL = URL;
global.setTimeout = () => {};

require("./js/data.js");
global.window.WikiData = window.WikiData;
require("./js/meta.js");
global.window.WikiMeta = window.WikiMeta;
const D = window.WikiData;
const M = window.WikiMeta;
const APP = require.resolve("./js/app.js");
const PARTIAL_DIR = path.join(ROOT, "partials");

function escAttr(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
function escText(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
function cleanInternalLinks(html) {
  return html.replace(/href="(\/[^"?#]*)"/g, (full, href) => {
    if (
      href === "/" ||
      href.endsWith("/") ||
      /\.[a-z0-9]+$/i.test(href) ||
      href.startsWith("/assets/") ||
      href.startsWith("/css/") ||
      href.startsWith("/js/")
    ) {
      return full;
    }
    return `href="${href}/"`;
  });
}
function renderMain(route) {
  CURRENT = route;
  delete require.cache[APP];
  els.main._html = "";
  els.leftNav._html = "";
  els.rightNav._html = "";
  require("./js/app.js");
  return els.main._html;
}
function partial(name) {
  return fs.readFileSync(path.join(PARTIAL_DIR, name + ".html"), "utf8").trim();
}
function loadTemplate() {
  return fs
    .readFileSync(path.join(PARTIAL_DIR, "page-shell.html"), "utf8")
    .replace("<!-- coq:header -->", partial("header"))
    .replace("<!-- coq:left-sidebar -->", partial("left-sidebar"))
    .replace("<!-- coq:right-sidebar -->", partial("right-sidebar"))
    .replace("<!-- coq:footer -->", partial("footer"));
}
function headBlock(route) {
  const seo = M.seoFor(route);
  return (
    "    " +
    [
      `<title>${escText(seo.title)}</title>`,
      `<meta name="description" content="${escAttr(seo.description)}" />`,
      `<meta name="keywords" content="${escAttr((seo.keywords || []).join(", "))}" />`,
      `<link rel="canonical" href="${escAttr(seo.canonical)}" />`,
      `<meta property="og:site_name" content="Caves of Qud Wiki" />`,
      `<meta property="og:title" content="${escAttr(seo.ogTitle)}" />`,
      `<meta property="og:description" content="${escAttr(seo.ogDescription)}" />`,
      `<meta property="og:type" content="${escAttr(seo.ogType)}" />`,
      `<meta property="og:url" content="${escAttr(seo.canonical)}" />`,
      `<meta property="og:image" content="${escAttr(seo.ogImage)}" />`,
      `<meta name="twitter:card" content="summary_large_image" />`,
      `<meta name="twitter:title" content="${escAttr(seo.ogTitle)}" />`,
      `<meta name="twitter:description" content="${escAttr(seo.ogDescription)}" />`,
      `<meta name="twitter:image" content="${escAttr(seo.ogImage)}" />`,
    ].join("\n    ")
  );
}
function buildPage(template, route) {
  let html = template;
  html = html.replace(
    /<!-- coq:head -->[\s\S]*?<!-- \/coq:head -->/,
    "<!-- coq:head -->\n" + headBlock(route) + "\n    <!-- /coq:head -->",
  );
  html = html.replace(
    /<script type="application\/ld\+json" id="coq-jsonld">[\s\S]*?<\/script>/,
    '<script type="application/ld+json" id="coq-jsonld">' +
      JSON.stringify(M.jsonLdFor(route)) +
      "</script>",
  );
  const mainHtml = renderMain(route);
  html = html.replace(
    /<!-- coq:left-sidebar -->/,
    els.leftNav._html,
  );
  html = html.replace(
    /<!-- coq:right-sidebar -->/,
    els.rightNav._html,
  );
  html = html.replace(
    /<!-- coq:main -->/,
    mainHtml,
  );
  return cleanInternalLinks(html);
}
function routes() {
  return ["/", "/about", "/privacy-policy", "/contact"]
    .concat(D.categories.map((c) => "/" + c.id))
    .concat(D.pages.map((p) => "/" + p.category + "/" + p.id));
}
function outPath(route) {
  return route === "/"
    ? path.join(ROOT, "index.html")
    : path.join(ROOT, route.replace(/^\//, ""), "index.html");
}
function writeSitemap(allRoutes) {
  const urls = allRoutes
    .map((r) => {
      const loc = D.site.baseUrl + (r === "/" ? "/" : r + "/");
      const depth = r.split("/").filter(Boolean).length;
      return `  <url><loc>${loc}</loc><lastmod>${D.site.lastUpdated}</lastmod><changefreq>${r === "/" ? "daily" : "weekly"}</changefreq><priority>${r === "/" ? "1.0" : depth === 1 ? "0.8" : "0.7"}</priority></url>`;
    })
    .join("\n");
  fs.writeFileSync(
    path.join(ROOT, "sitemap.xml"),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    "utf8",
  );
}
function verifySitemapCoverage(allRoutes) {
  const sitemap = fs.readFileSync(path.join(ROOT, "sitemap.xml"), "utf8");
  const missing = allRoutes.filter((r) => {
    const loc = D.site.baseUrl + (r === "/" ? "/" : r + "/");
    return !sitemap.includes("<loc>" + loc + "</loc>");
  });
  if (missing.length) {
    throw new Error("Sitemap missing routes: " + missing.join(", "));
  }
}
function run() {
  const template = loadTemplate();
  const allRoutes = routes();
  allRoutes.forEach((route) => {
    const file = outPath(route);
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, buildPage(template, route), "utf8");
  });
  writeSitemap(allRoutes);
  verifySitemapCoverage(allRoutes);
  console.log(
    "Static prerender complete: " + allRoutes.length + " HTML files generated.",
  );
}
run();
