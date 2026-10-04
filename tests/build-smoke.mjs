// Checks actual prerendered HTML, not React source or a browser simulation.
// Run after npm run build. Does not replace visual/WebGL/device tests.
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { access } from "node:fs/promises";
import test from "node:test";

const readPage = async name => (await readFile(new URL(`../.next/server/app/${name}.html`, import.meta.url), "utf8"))
  .replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "");
const home = await readPage("index");
const about = await readPage("hakkimizda");
const services = await readPage("hizmetlerimiz");
const gallery = await readPage("vitrin");
const credits = await readPage("model-kaynaklari");
const contact = await readPage("iletisim");
const photoCount = html => (html.match(/<img\b[^>]*>/g) ?? []).filter(tag => tag.includes("%2Fimages%2Fproducts%2F")).length;

test("every public page has one main heading and the shared skip-link destination", () => {
  for (const html of [home, about, services, gallery, credits, contact]) {
    assert.equal((html.match(/<h1\b/g) ?? []).length, 1);
    assert.match(html, /<main\b[^>]*id="ana-icerik"/);
    assert.match(html, /href="#ana-icerik"/);
  }
});

test("final home sequence and five explanatory steps are in HTML without JavaScript", () => {
  const labels = ["Fikri modele", "Teknik Çözümler", "Yaratıcı Üretim", 'id="taramadan-uretime"', "Fiziksel numune", "Tarama verisi", "Dijital model", "3D baskı", "Üretim sonucu", "Üretim vitrini", "Talebinizi paylaşın", "Birlikte değerlendirelim", "Üretim ve teslim", "Bir fikrin mi var?"];
  let cursor = -1;
  for (const label of labels) {
    const next = home.indexOf(label, cursor + 1);
    assert.ok(next > cursor, `missing/out-of-order: ${label}`);
    cursor = next;
  }
  for (const stage of ["sample", "scan", "model", "printing", "result"]) assert.ok(home.includes(`process-${stage}.webp`));
  assert.match(home, /Elinizdeki parçadan 3D baskıya uzanan 5 adımlı şeffaf süreç/);
  assert.match(home, /<noscript>/);
  assert.match(home, /href="\/iletisim"/);
  assert.match(home, /href="https:\/\/orbitart.com.tr\/?"/);
});

test("home five, about four and gallery thirty real photos remain", () => {
  assert.equal(photoCount(home), 5);
  assert.equal(photoCount(about), 4);
  assert.equal(photoCount(gallery), 30);
});

test("service anchors and source credits resolve to real HTML targets", () => {
  for (const id of ["teknik-cozumler", "yaratici-uretim"]) {
    assert.ok(home.includes(`href="/hizmetlerimiz#${id}"`));
    assert.ok(services.includes(`id="${id}"`));
  }
  assert.ok(home.includes('href="/model-kaynaklari"'));
  assert.ok(about.includes('href="/model-kaynaklari"'));
  assert.ok(!about.includes('id="model-kaynaklari"'));
  assert.ok(!home.includes('href="/hakkimizda#model-kaynaklari"'));
  for (const credit of ["DeLeon", "CC BY 4.0", "nebulousflynn", "CC0 1.0", "üçgen sayısı ve doku boyutu optimize edildi"]) assert.ok(credits.includes(credit));
  for (const tag of credits.match(/<a\b[^>]*>/g) ?? []) {
    if (!tag.includes('target="_blank"')) continue;
    assert.match(tag, /rel="noopener noreferrer"/);
    assert.match(tag, /href="https:/);
  }
});

test("production includes model poster and semantic controls before any 3D load", () => {
  assert.ok(home.includes("a1-orbit-gear.webp"));
  assert.match(home, /aria-label="Önceki model"/);
  assert.match(home, /aria-label="Sonraki model"/);
  assert.doesNotMatch(home, /Altı temsili 3D model|Temsili model görseli|aria-label="Model seçimi"/);
  assert.doesNotMatch(home, /01\s*\/\s*06/);
  assert.match(home, /aria-live="polite"/);
  assert.equal((home.match(/<canvas\b/g) ?? []).length, 0);
  assert.ok(!home.includes("Dijital tasarım, 3D tarama ve üretimi tek yaratıcı süreçte buluşturuyoruz."));
  assert.ok(!home.includes("Yatay sürükleyin, modele dokunun veya odağı sahneye alıp yön tuşlarını kullanın."));
});

test("five process cards have keyboard controls, accessible names and a shared scene target", () => {
  const controls = (home.match(/<button\b[^>]*>/g) ?? []).filter(tag => tag.includes('aria-controls="process-model"'));
  assert.equal(controls.length, 5);
  assert.ok(home.includes('id="process-model"'));
  for (const [index, control] of controls.entries()) {
    assert.match(control, /type="button"/);
    assert.ok(control.includes(`aria-pressed="${index === 0}"`));
    for (const attribute of ['aria-labelledby', 'aria-describedby']) {
      const id = control.match(new RegExp(attribute + '="([^"]+)"'))?.[1];
      assert.ok(id && home.includes(`id="${id}"`));
    }
  }
});


test("inspection contains only two service cards and one copy of each service link", () => {
  assert.ok(home.includes('id="neler-yapiyoruz"'));
  assert.match(home, /class="[^"]*hero-story/);
  assert.ok(!home.includes("inspection-stage"));
  assert.equal((home.match(/data-story-card=/g) ?? []).length, 2);
  assert.ok(home.includes('data-story-card="0"'));
  assert.ok(home.includes('data-story-card="1"'));
  assert.ok(!home.includes('data-story-card="2"'));
  assert.ok(!home.includes('Temsili hizmet görselleştirmesi.'));
  for (const id of ["teknik-cozumler", "yaratici-uretim"]) assert.equal((home.match(new RegExp('href="/hizmetlerimiz#' + id + '"', 'g')) ?? []).length, 1);
  assert.ok(home.indexOf('id="neler-yapiyoruz"') < home.indexOf('id="taramadan-uretime"'));
  const heading = home.match(/<h1\b[^>]*>[\s\S]*?<\/h1>/g) ?? [];
  assert.equal(heading.length, 1);
  assert.match(heading[0], /Fikri modele, modeli gerçeğe dönüştürüyoruz/);
  assert.ok(home.indexOf(heading[0]) > home.indexOf('id="neler-yapiyoruz"'));
  const controls = home.match(/<button\b[^>]*aria-label="Önceki model"[\s\S]*?<button\b[^>]*aria-label="Sonraki model"/)?.[0];
  assert.ok(controls);
  assert.ok(!controls.includes('Orbit Gear'));
});

const routePages = new Map([['/',home],['/hakkimizda',about],['/hizmetlerimiz',services],['/vitrin',gallery],['/iletisim',contact],['/model-kaynaklari',credits]]);
const siteOrigin = new URL(process.env.SITE_URL || 'https://orbitartt.com').origin;
const isPreview = ['preview','development'].includes(process.env.VERCEL_ENV);

test('every page has its own canonical, social title, image, Twitter card and robots policy', () => {
  for (const [route,html] of routePages) {
    const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
    assert.ok(canonical);
    assert.equal(new URL(canonical).href,new URL(route,siteOrigin).href);
    assert.match(html,/<meta property="og:title" content="[^"]+"/);
    assert.ok(html.includes('/images/brand/orbitart-social.png'));
    assert.match(html,/<meta name="twitter:card" content="summary_large_image"/);
    assert.ok(html.includes(`name="robots" content="${isPreview ? 'noindex, nofollow' : 'index, follow'}"`));
    assert.ok(html.includes('rel="apple-touch-icon"'));
  }
});

test('all internal CTA and fragment targets exist and external links use safe HTTPS attributes', () => {
  for (const [route,html] of routePages) {
    for (const tag of html.match(/<a\b[^>]*>/g) ?? []) {
      const href = tag.match(/href="([^"]+)"/)?.[1]?.replaceAll('&amp;','&');
      if (!href) continue;
      if (href.startsWith('https:')) {
        if (tag.includes('target="_blank"')) assert.match(tag,/rel="noopener noreferrer"/);
      } else {
        assert.ok(href.startsWith('/') || href.startsWith('#'),`unexpected protocol: ${href}`);
        const url = new URL(href,new URL(route,siteOrigin));
        const target = routePages.get(url.pathname);
        assert.ok(target,`missing route: ${url.pathname}`);
        if (url.hash) assert.ok(target.includes(`id="${decodeURIComponent(url.hash.slice(1))}"`),`missing anchor: ${url.hash}`);
      }
    }
  }
});

test('all WhatsApp links share one valid number and an intact prepared message', () => {
  for (const html of routePages.values()) {
    const links = [...html.matchAll(/href="(https:\/\/wa\.me\/[^\"]+)"/g)];
    assert.ok(links.length >= 2);
    for (const [,href] of links) {
      const url = new URL(href.replaceAll('&amp;','&'));
      assert.match(url.pathname,/^\/[1-9]\d{7,14}$/);
      assert.equal(url.searchParams.get('text'),'Merhaba Orbitart, 3D baskı, tarama veya özel tasarım projem hakkında bilgi almak istiyorum.');
    }
  }
});

test('sitemap and robots contain only approved site URLs; Preview has no sitemap entries', async () => {
  const robots = await readFile(new URL('../.next/server/app/robots.txt.body',import.meta.url),'utf8');
  const sitemap = await readFile(new URL('../.next/server/app/sitemap.xml.body',import.meta.url),'utf8');
  if (isPreview) {
    assert.match(robots,/Disallow: \//);
    assert.doesNotMatch(sitemap,/<loc>/);
  } else {
    assert.match(robots,/Allow: \//);
    assert.ok(robots.includes(`${siteOrigin}/sitemap.xml`));
    const entries = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match=>match[1]);
    assert.deepEqual(entries.sort(),[...routePages.keys()].map(route=>new URL(route,siteOrigin).href).sort());
  }
});

test('prerendered photos and metadata assets resolve to repository files, and 404 offers recovery links', async () => {
  for (const html of routePages.values()) {
    for (const [,src] of html.matchAll(/<img\b[^>]*src="([^"]+)"/g)) {
      const url = new URL(src.replaceAll('&amp;','&'),siteOrigin);
      const path = url.pathname === '/_next/image' ? url.searchParams.get('url') : url.pathname;
      assert.ok(path?.startsWith('/images/'));
      await access(new URL(`../public${path}`,import.meta.url));
    }
  }
  for (const asset of ['orbitart-social.png','orbitart-icon.svg','orbitart-icon.png','orbitart-apple-icon.png']) await access(new URL(`../public/images/brand/${asset}`,import.meta.url));
  const missing = await readPage('_not-found');
  assert.ok(missing.includes('Bu sayfa bulunamadı.'));
  assert.match(missing,/href="\/"/);
  assert.match(missing,/href="\/iletisim"/);
  assert.match(missing,/noindex/);
});
